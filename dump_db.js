const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const data = {
    settings: await prisma.siteSetting.findMany(),
    courses: await prisma.course.findMany(),
    teachers: await prisma.teacher.findMany(),
    posts: await prisma.post.findMany(),
    registrations: await prisma.registration.findMany(),
    successStories: await prisma.successStory.findMany(),
  };

  fs.writeFileSync('db_dump.json', JSON.stringify(data, null, 2));
  console.log('Database exported to db_dump.json');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
