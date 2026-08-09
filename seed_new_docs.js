const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const slugify = require('slugify');

const prisma = new PrismaClient();

const sourceDir = path.join(__dirname, 'Tài liệu');
const destDir = path.join(__dirname, 'public', 'documents');

const colors = [
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-amber-400",
  "from-purple-500 to-pink-400",
  "from-rose-500 to-red-400",
  "from-indigo-500 to-blue-400"
];

async function main() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir);
  let colorIndex = 0;

  for (const file of files) {
    if (file.toLowerCase().endsWith('.pdf') && !file.toLowerCase().startsWith('toán lớp')) {
      const sourcePath = path.join(sourceDir, file);
      
      // Sanitize filename to avoid weird chars in URL
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const sanitizedName = file.replace(/[^a-zA-Z0-9.\-_]/g, '');
      const destName = `${uniqueSuffix}-${sanitizedName}`;
      const destPath = path.join(destDir, destName);
      
      console.log(`Copying ${file} to public/documents/${destName}...`);
      fs.copyFileSync(sourcePath, destPath);

      const title = file.replace('.pdf', '');
      const slug = slugify(title, { lower: true, locale: 'vi', strict: true });

      const existingDoc = await prisma.document.findUnique({
        where: { slug: slug }
      });

      if (!existingDoc) {
        console.log(`Inserting ${title} into DB with slug ${slug}...`);
        await prisma.document.create({
          data: {
            title: title,
            slug: slug,
            description: `Tài liệu ${title}`,
            fileUrl: `/documents/${destName}`,
            color: colors[colorIndex % colors.length]
          }
        });
        colorIndex++;
      } else {
        console.log(`Document ${title} already exists. Skipping DB insert.`);
      }
    }
  }

  console.log('All documents added!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
