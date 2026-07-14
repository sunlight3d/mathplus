const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.post.findMany();
  const images = ['/images/math_algebra.jpg', '/images/math_geometry.jpg', '/images/math_statistics.jpg'];
  for (let i = 0; i < posts.length; i++) {
    await prisma.post.update({
      where: { id: posts[i].id },
      data: { image: images[i % images.length] }
    });
    console.log(`Updated post ${posts[i].id}`);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
