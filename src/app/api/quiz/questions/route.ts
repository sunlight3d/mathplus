import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getDefaultQuestionsForGrade } from "@/components/quiz/quizData";
import { sampleCurriculumBalanced } from "@/lib/quizSampling";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const grade = Math.min(Math.max(Number(searchParams.get("grade")) || 6, 6), 12);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 30);

    // Fetch full question bank for this grade to ensure 100% curriculum coverage
    let questions = await prisma.quizQuestion.findMany({
      where: { grade },
      take: 600
    });

    if (questions.length === 0) {
      // Auto seed from default question bank if DB is empty
      const defaultList = getDefaultQuestionsForGrade(grade);
      if (defaultList.length > 0) {
        try {
          await prisma.quizQuestion.createMany({
            data: defaultList.map(q => ({
              grade,
              topic: String(q.topic || `Toán Lớp ${grade}`).toUpperCase(),
              question: q.question,
              options: q.options as any,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              iconType: q.iconType || "📐"
            }))
          });
          questions = await prisma.quizQuestion.findMany({
            where: { grade },
            take: 600
          });
        } catch (seedErr) {
          console.warn("Could not auto-seed into DB, returning static defaults:", seedErr);
          const balancedStatic = sampleCurriculumBalanced(defaultList, limit);
          return NextResponse.json({
            success: true,
            grade,
            count: balancedStatic.length,
            questions: balancedStatic
          });
        }
      }
    }

    // Apply Stratified Curriculum-Balanced Sampling across all chapters & topics
    const balancedQuestions = sampleCurriculumBalanced(questions, limit);

    return NextResponse.json({
      success: true,
      grade,
      count: balancedQuestions.length,
      questions: balancedQuestions.map((q) => ({
        id: q.id,
        topic: q.topic,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        iconType: q.iconType || "📐"
      }))
    });
  } catch (error: any) {
    console.error("Fetch quiz questions error:", error);
    const grade = Math.min(Math.max(Number(req.nextUrl.searchParams.get("grade")) || 6, 6), 12);
    const defaultList = getDefaultQuestionsForGrade(grade);
    const fallbackBalanced = sampleCurriculumBalanced(defaultList, 10);
    return NextResponse.json({
      success: true,
      grade,
      count: fallbackBalanced.length,
      questions: fallbackBalanced
    });
  }
}
