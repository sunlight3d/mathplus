const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const imageMapping = {
  "Toán cho học sinh lớp 6 đến 9": "/api/uploads/courses/course_math_6_9.jpg",
  "Toán cho người mất gốc": "/api/uploads/courses/course_math_basics.jpg",
  "Lớp toán luyện thi học sinh khá giỏi": "/api/uploads/courses/course_math_advanced.jpg",
  "Toán cơ bản và nâng cao dần": "/api/uploads/courses/course_math_progressive.jpg",
  "Luyện thi đại học": "/api/uploads/courses/course_university_prep.jpg",
  "Luyện thi vào 10": "/api/uploads/courses/course_high_school_prep.jpg"
};

async function main() {
  const courses = await prisma.course.findMany();
  for (const course of courses) {
    const imageUrl = imageMapping[course.title];
    if (imageUrl) {
      await prisma.course.update({
        where: { id: course.id },
        data: { image: imageUrl }
      });
      console.log(`Updated image for: ${course.title} to ${imageUrl}`);
    } else {
      console.log(`No image mapped for: ${course.title}`);
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
