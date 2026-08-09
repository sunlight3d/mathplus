const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const documents = [
  {
    title: "Toán lớp 6",
    slug: "toan-lop-6",
    description: "Tài liệu học tập và bài tập Toán lớp 6",
    fileUrl: "/documents/toan-lop-6.pdf",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Toán lớp 7",
    slug: "toan-lop-7",
    description: "Tài liệu học tập và bài tập Toán lớp 7",
    fileUrl: "/documents/toan-lop-7.pdf",
    color: "from-emerald-500 to-teal-400"
  },
  {
    title: "Toán lớp 8",
    slug: "toan-lop-8",
    description: "Tài liệu học tập và bài tập Toán lớp 8",
    fileUrl: "/documents/toan-lop-8.pdf",
    color: "from-orange-500 to-amber-400"
  }
];

async function main() {
  for (const doc of documents) {
    await prisma.document.upsert({
      where: { slug: doc.slug },
      update: {},
      create: doc,
    });
  }
  console.log('Seeded successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
