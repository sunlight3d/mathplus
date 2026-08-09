const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const teachers = await prisma.teacher.findMany();
  console.log(teachers.map(t => ({ id: t.id, name: t.name, avatar: t.avatar })));
}

main().catch(console.error).finally(() => prisma.$disconnect());
