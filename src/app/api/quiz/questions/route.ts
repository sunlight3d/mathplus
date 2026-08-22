import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getDefaultQuestionsForGrade } from "@/components/quiz/quizData";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const grade = Math.min(Math.max(Number(searchParams.get("grade")) || 6, 6), 12);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 10, 1), 20);

    let questions = await prisma.quizQuestion.findMany({
      where: { grade },
      take: 50 // take a pool to sample randomly
    });

    if (questions.length === 0) {
      // Auto seed from default question bank if DB is empty
      const defaultList = getDefaultQuestionsForGrade(grade);
      if (defaultList.length > 0) {
        try {
          await prisma.quizQuestion.createMany({
            data: defaultList.map(q => ({
              grade,
              topic: q.topic,
              question: q.question,
              options: q.options as any,
              correctAnswer: q.correctAnswer,
              explanation: q.explanation,
              iconType: q.iconType || "📐"
            }))
          });
          questions = await prisma.quizQuestion.findMany({
            where: { grade },
            take: 50
          });
        } catch (seedErr) {
          console.warn("Could not auto-seed into DB, returning static defaults:", seedErr);
          return NextResponse.json({
            success: true,
            grade,
            count: defaultList.length,
            questions: defaultList.slice(0, limit)
          });
        }
      }
    }

    // Shuffle and pick limit
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, limit);

    return NextResponse.json({
      success: true,
      grade,
      count: shuffled.length,
      questions: shuffled.map((q) => ({
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
    return NextResponse.json({
      success: true,
      grade,
      count: defaultList.length,
      questions: defaultList
    });
  }
}
