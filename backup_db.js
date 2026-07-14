const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

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

  const backupDir = path.join(__dirname, 'backups');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
  }

  const date = new Date();
  const timestamp = date.toISOString().replace(/[:.]/g, '-');
  const filename = path.join(backupDir, `db_backup_${timestamp}.json`);

  fs.writeFileSync(filename, JSON.stringify(data, null, 2));
  console.log(`✅ Backup thành công tại: ${filename}`);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
