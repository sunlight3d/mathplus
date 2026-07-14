import { prisma } from "@/lib/prisma";
import CourseList from "./CourseList";

export default async function CoursesPage() {
  // If Prisma is not yet connected or DB is empty, this will gracefully fallback to empty array
  // but if the DB connection fails, we should handle it to not break the page.
  let courses: any[] = [];
  try {
    courses = await prisma.course.findMany({
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error("Failed to fetch courses from DB:", error);
    // Silent fail so we can still render the page
  }

  return (
    <div className="w-full bg-gray-50 min-h-screen pb-20">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-500 py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute w-96 h-96 bg-green-400 rounded-full blur-3xl -top-20 -left-20"></div>
          <div className="absolute w-96 h-96 bg-orange-400 rounded-full blur-3xl bottom-0 right-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 drop-shadow-md">Khóa Học Toán Chất Lượng Cao</h1>
          <p className="text-green-50 max-w-2xl mx-auto text-lg drop-shadow-sm">Hệ thống khóa học được thiết kế chuyên biệt, bám sát năng lực của từng học sinh, giúp các em học hiểu, làm hay và bứt phá điểm số.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <CourseList courses={courses} />
      </div>
    </div>
  );
}
