import { PrismaClient } from "@prisma/client";
import DocumentsClient from "./DocumentsClient";

const prisma = new PrismaClient();

export default async function DocumentsAdminPage() {
  const documents = await prisma.document.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Tài liệu</h1>
      </div>
      <DocumentsClient documents={documents} />
    </div>
  );
}
