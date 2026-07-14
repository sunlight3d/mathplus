import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Database...');

  // Clear existing data (optional, useful for development)
  await prisma.registration.deleteMany();
  await prisma.course.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.successStory.deleteMany();

  // Create Courses
  const courses = [
    {
      title: 'Toán Tiểu Học - Vững Bước Tương Lai',
      slug: 'toan-tieu-hoc',
      description: 'Lấy lại căn bản, bồi dưỡng học sinh giỏi Toán Tiểu học. Rèn luyện tư duy logic sớm cho các em.',
      category: 'Toán tiểu học',
      price: 'Liên hệ',
    },
    {
      title: 'Toán THCS - Hành Trang Vượt Bậc',
      slug: 'toan-thcs',
      description: 'Hệ thống kiến thức trọng tâm, luyện thi vào lớp 10 chuyên và các kỳ thi học sinh giỏi.',
      category: 'Toán THCS',
      price: 'Liên hệ',
    },
    {
      title: 'Toán PTTH - Chinh Phục Điểm 9, 10',
      slug: 'toan-ptth',
      description: 'Luyện thi Đại học, bám sát đề thi THPT Quốc Gia với các phương pháp giải siêu tốc.',
      category: 'Toán PTTH',
      price: 'Liên hệ',
    },
    {
      title: 'Luyện thi Đại học Cao tốc',
      slug: 'luyen-thi-dai-hoc',
      description: 'Khóa học thiết kế riêng cho các sĩ tử lớp 12 tăng tốc trong giai đoạn nước rút.',
      category: 'Luyện thi đại học',
      price: 'Liên hệ',
    }
  ];

  for (const course of courses) {
    await prisma.course.create({ data: course });
  }

  // Create Teachers
  const teachers = [
    {
      name: 'Thầy Dũng Toán',
      bio: 'Chuyên gia luyện thi Đại học với hơn 15 năm kinh nghiệm. Thầy nổi tiếng với phương pháp giải nhanh và tư duy đột phá.',
      role: 'Giáo viên Toán THPT',
      exp: '15+ năm',
      students: '10.000+',
    },
    {
      name: 'Thầy Trần Hồng Hà',
      bio: 'Giáo viên chuyên ôn luyện thi vào lớp 10 các trường Chuyên. Thầy có rất nhiều học sinh đạt thủ khoa, á khoa.',
      role: 'Giáo viên Toán THCS',
      exp: '10+ năm',
      students: '5.000+',
    },
    {
      name: 'Thầy Thanh & Cô Linh',
      bio: 'Bộ đôi giáo viên tận tâm với Toán Tiểu học, giúp hàng ngàn học sinh yêu thích và tự tin học Toán.',
      role: 'Giáo viên Toán Tiểu học',
      exp: '8+ năm',
      students: '3.000+',
    }
  ];

  for (const teacher of teachers) {
    await prisma.teacher.create({ data: teacher });
  }

  // Create Success Stories
  const names = [
    'Nguyễn Minh Nguyệt', 'Trần Nhật Hải', 'Lê Khánh Vân', 'Phạm Quỳnh Anh', 'Hoàng Minh Tuấn',
    'Vũ Hải Đăng', 'Ngô Bảo Trâm', 'Đặng Thùy Dương', 'Bùi Đức Anh', 'Đỗ Minh Khang',
    'Trịnh Thị Nhàn', 'Hồ Quang Hiếu', 'Lý Hải Băng', 'Tạ Minh Tú', 'Cao Quốc Vượng'
  ];

  for (let i = 0; i < 15; i++) {
    await prisma.successStory.create({
      data: {
        studentName: names[i] || `Học sinh ${i+1}`,
        achievement: `Thủ khoa Đại học Bách Khoa - Điểm 10 môn Toán (Học sinh ${i+1})`,
        excerpt: 'Hành trình nỗ lực không ngừng nghỉ và sự đồng hành tận tâm của các thầy cô MathPlus đã giúp em đạt được thành tích mơ ước.',
        content: 'Nội dung chi tiết câu chuyện thành công...',
        slug: `cau-chuyen-thanh-cong-${i+1}`
      }
    });
  }

  console.log('Seeding Completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
