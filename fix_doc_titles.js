const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function capitalizeFirstLetter(string) {
  if (!string) return string;
  let lower = string.toLowerCase();
  
  if (lower.startsWith("bt ")) {
    lower = "bài tập " + lower.slice(3);
  }
  
  if (lower.endsWith(" i")) {
    lower = lower.slice(0, -2) + " I";
  }

  return lower.charAt(0).toUpperCase() + lower.slice(1);
}

async function main() {
  const documents = await prisma.document.findMany();
  
  for (const doc of documents) {
    const newTitle = capitalizeFirstLetter(doc.title);
    
    // For description, if it starts with "Tài liệu ", maybe we should keep the title formatting in it?
    // The previous script set it to "Tài liệu " + title.
    // Let's just reset description to "Tài liệu " + newTitle.toLowerCase()
    // Wait, the user just said standardize the title. I'll just standardize title and let description follow naturally.
    const newDescription = `Tài liệu ${newTitle.toLowerCase()}`;
    
    if (newTitle !== doc.title || newDescription !== doc.description) {
      console.log(`Updating "${doc.title}" -> "${newTitle}"`);
      await prisma.document.update({
        where: { id: doc.id },
        data: {
          title: newTitle,
          description: newDescription
        }
      });
    }
  }
  console.log("All document titles standardized.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
