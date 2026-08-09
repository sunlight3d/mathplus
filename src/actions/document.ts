"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function getDocuments() {
  try {
    const documents = await prisma.document.findMany({
      orderBy: { createdAt: "desc" },
    });
    return { success: true, documents };
  } catch (error) {
    console.error("Failed to fetch documents:", error);
    return { success: false, message: "Lỗi tải danh sách tài liệu" };
  }
}

export async function createDocument(data: {
  title: string;
  slug: string;
  description: string;
  fileUrl: string;
  color: string;
}) {
  try {
    const document = await prisma.document.create({
      data,
    });
    revalidatePath("/tai-lieu");
    revalidatePath("/admin/documents");
    return { success: true, document };
  } catch (error) {
    console.error("Failed to create document:", error);
    return { success: false, message: "Lỗi tạo tài liệu mới" };
  }
}

export async function updateDocument(
  id: number,
  data: {
    title: string;
    slug: string;
    description: string;
    fileUrl: string;
    color: string;
  }
) {
  try {
    const document = await prisma.document.update({
      where: { id },
      data,
    });
    revalidatePath("/tai-lieu");
    revalidatePath(`/tai-lieu/${document.slug}`);
    revalidatePath("/admin/documents");
    return { success: true, document };
  } catch (error) {
    console.error("Failed to update document:", error);
    return { success: false, message: "Lỗi cập nhật tài liệu" };
  }
}

export async function deleteDocument(id: number) {
  try {
    await prisma.document.delete({
      where: { id },
    });
    revalidatePath("/tai-lieu");
    revalidatePath("/admin/documents");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete document:", error);
    return { success: false, message: "Lỗi xóa tài liệu" };
  }
}
