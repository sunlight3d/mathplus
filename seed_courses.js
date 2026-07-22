const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const newCourses = [
  {
    title: "Toán cho học sinh lớp 6 đến 9",
    slug: "toan-cho-hoc-sinh-lop-6-den-9",
    description: "Chương trình đào tạo Toán chuyên sâu bám sát sách giáo khoa và chương trình nâng cao từ lớp 6 đến lớp 9, giúp học sinh nắm chắc kiến thức và bứt phá điểm số.",
    category: "Toán THCS",
    price: "Liên hệ tư vấn",
  },
  {
    title: "Toán cho người mất gốc",
    slug: "toan-cho-nguoi-mat-goc",
    description: "Khóa học thiết kế riêng biệt giúp học sinh hổng kiến thức lấy lại căn bản nhanh chóng, lấy lại sự tự tin và niềm yêu thích đối với môn Toán.",
    category: "Toán cơ bản",
    price: "Liên hệ tư vấn",
  },
  {
    title: "Lớp toán luyện thi học sinh khá giỏi",
    slug: "lop-toan-luyen-thi-hoc-sinh-kha-gioi",
    description: "Chương trình bồi dưỡng kiến thức nâng cao, phương pháp tư duy độc đáo dành cho học sinh khá giỏi hướng tới các kỳ thi HSG và các trường chuyên.",
    category: "Toán nâng cao",
    price: "Liên hệ tư vấn",
  },
  {
    title: "Toán cơ bản và nâng cao dần",
    slug: "toan-co-ban-va-nang-cao-dan",
    description: "Lộ trình học tập cá nhân hóa đi từ nền tảng căn bản đến các dạng bài vận dụng cao, giúp học sinh tiến bộ bền vững từng ngày.",
    category: "Toán tổng hợp",
    price: "Liên hệ tư vấn",
  },
  {
    title: "Luyện thi vào 10",
    slug: "luyen-thi-vao-10",
    description: "Chương trình luyện thi chuyên sâu vào lớp 10 THPT và các trường Chuyên, bám sát cấu trúc đề thi mới nhất với các phương pháp giải tối ưu.",
    category: "Luyện thi Chuyển cấp",
    price: "Liên hệ tư vấn",
  },
  {
    title: "Luyện thi đại học",
    slug: "luyen-thi-dai-hoc",
    description: "Khóa học bứt phá điểm số thi THPT Quốc gia & Đánh giá năng lực, trang bị đầy đủ chiến thuật và dạng bài vận dụng cao cho kỳ thi Đại học.",
    category: "Luyện thi Đại học",
    price: "Liên hệ tư vấn",
  }
];

async function main() {
  console.log("Cleaning old courses...");
  await prisma.course.deleteMany();
  
  console.log("Inserting 6 new courses...");
  for (const course of newCourses) {
    await prisma.course.create({ data: course });
  }

  console.log("Successfully updated 6 courses in Database!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
