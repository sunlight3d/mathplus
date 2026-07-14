const { PrismaClient } = require('@prisma/client');
const fs = require('fs');

const prisma = new PrismaClient();

async function main() {
  const data = JSON.parse(fs.readFileSync('db_dump.json', 'utf-8'));

  // Clear existing data
  await prisma.siteSetting.deleteMany();
  await prisma.registration.deleteMany();
  await prisma.course.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.post.deleteMany();
  await prisma.successStory.deleteMany();

  // Insert data (map date strings to Date objects if needed, Prisma usually handles ISO strings)
  if (data.settings && data.settings.length > 0) {
    await prisma.siteSetting.createMany({ data: data.settings });
  }
  if (data.courses && data.courses.length > 0) {
    await prisma.course.createMany({ data: data.courses });
  }
  if (data.teachers && data.teachers.length > 0) {
    await prisma.teacher.createMany({ data: data.teachers });
  }
  if (data.posts && data.posts.length > 0) {
    await prisma.post.createMany({ data: data.posts });
  }
  if (data.registrations && data.registrations.length > 0) {
    await prisma.registration.createMany({ data: data.registrations });
  }
  if (data.successStories && data.successStories.length > 0) {
    await prisma.successStory.createMany({ data: data.successStories });
  }

  console.log('Database restored from db_dump.json');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
