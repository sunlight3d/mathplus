const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.teacher.update({
    where: { id: 2 },
    data: {
      bio: "Thạc sĩ Toán học (ĐHSP Hà Nội) với hơn 40 năm kinh nghiệm giảng dạy. Thầy từng công tác tại CĐSP Tây Bắc, THPT Phúc Thọ và THCS Bế Văn Đàn. Thầy là Tổ trưởng tổ Toán nhiều năm liền, đạt danh hiệu Giáo viên dạy giỏi cấp quận/thành phố và có nhiều SKKN cấp thành phố. Phương châm: 'Tâm huyết với nghề - Trách nhiệm với học sinh - Đổi mới để phát triển'.",
      role: "Giáo viên Toán (Thạc sĩ)",
      exp: "40+ năm"
    }
  });
  console.log("Updated Thầy Hà successfully");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
