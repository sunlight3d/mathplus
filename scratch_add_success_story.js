const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const story = await prisma.successStory.upsert({
    where: { slug: 'nguyen-ba-tuan-diem-10-toan-vao-10' },
    update: {},
    create: {
      studentName: 'Nguyễn Bá Tuấn',
      achievement: 'Điểm 10 môn Toán thi vào 10',
      slug: 'nguyen-ba-tuan-diem-10-toan-vao-10',
      excerpt: 'Hành trình bứt phá điểm số ấn tượng từ một học sinh trung bình khá vươn lên đạt điểm 10 tuyệt đối môn Toán trong kỳ thi vào 10.',
      content: '### **Hành trình bứt phá của Nguyễn Bá Tuấn**\n\nNguyễn Bá Tuấn (áo xanh trong ảnh) là một học sinh từng có học lực môn Toán ở mức trung bình khá. Khi mới đến với Trung tâm giáo dục MathPlus Academy, em khá tự ti với khả năng Toán học của mình. Việc giải quyết các bài toán hình học, hay các phương trình đại số luôn là một trở ngại lớn.\n\nTuy nhiên, nhờ phương pháp học tập chủ động tại MathPlus Academy cùng sự tận tâm hướng dẫn của các thầy cô, Tuấn đã dần thay đổi. Phương pháp chia nhỏ kiến thức, liên tục thực hành với các dạng bài tập từ cơ bản đến nâng cao, kết hợp cùng những buổi trao đổi bài sôi nổi đã giúp em lấy lại căn bản và phát triển tư duy logic.\n\nSự quyết tâm, nỗ lực không ngừng nghỉ của em đã gặt hái được trái ngọt. Trong kỳ thi tuyển sinh vào lớp 10, Tuấn đã xuất sắc đạt **điểm 10 tuyệt đối môn Toán**! Tổng điểm xét tuyển của em đạt 46.50 điểm (Ngữ văn: 8.25; Ngoại ngữ: 10.0; Toán: 10.00).\n\nThành quả này hoàn toàn xứng đáng với những giọt mồ hôi và sự kiên trì của Tuấn. Trung tâm giáo dục MathPlus Academy vô cùng tự hào khi được đồng hành cùng em trên chặng đường chinh phục tri thức và mở ra một tương lai tươi sáng.\n\n![Bảng điểm của Tuấn](/images/score_tuan.png)\n',
      imageUrl: '/images/student_tuan.jpg'
    }
  });
  console.log('Added success story:', story.studentName);
}

main().catch(console.error).finally(() => prisma.$disconnect());
