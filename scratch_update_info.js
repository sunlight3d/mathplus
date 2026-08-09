const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateTeacher() {
  const bioText = `Thạc sĩ Toán học (ĐHSP Hà Nội) với hơn 40 năm kinh nghiệm giảng dạy. Thầy từng công tác tại CĐSP Tây Bắc, THPT Phúc Thọ và THCS Bế Văn Đàn.
Thầy là Tổ trưởng tổ Toán nhiều năm liền, đạt danh hiệu Giáo viên dạy giỏi cấp quận/thành phố và có nhiều SKKN cấp thành phố.
Phương châm: "Tâm huyết với nghề - Trách nhiệm với học sinh - Đổi mới để phát triển".`;

  await prisma.teacher.update({
    where: { id: 2 },
    data: {
      bio: bioText,
      exp: '40+ năm',
      role: 'Giáo viên Toán (Thạc sĩ)'
    }
  });
  console.log('Update successful');
}

updateTeacher().catch(console.error).finally(() => prisma.$disconnect());
