"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

// ================= COURSES =================
export async function createCourse(data: any) {
  try {
    await prisma.course.create({ data });
    revalidatePath("/admin/courses");
    revalidatePath("/khoa-hoc");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateCourse(id: number, data: any) {
  try {
    await prisma.course.update({ where: { id }, data });
    revalidatePath("/admin/courses");
    revalidatePath("/khoa-hoc");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteCourse(id: number) {
  try {
    await prisma.course.delete({ where: { id } });
    revalidatePath("/admin/courses");
    revalidatePath("/khoa-hoc");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ================= TEACHERS =================
export async function createTeacher(data: any) {
  try {
    await prisma.teacher.create({ data });
    revalidatePath("/admin/teachers");
    revalidatePath("/doi-ngu-giao-vien");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateTeacher(id: number, data: any) {
  try {
    await prisma.teacher.update({ where: { id }, data });
    revalidatePath("/admin/teachers");
    revalidatePath("/doi-ngu-giao-vien");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteTeacher(id: number) {
  try {
    await prisma.teacher.delete({ where: { id } });
    revalidatePath("/admin/teachers");
    revalidatePath("/doi-ngu-giao-vien");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ================= SUCCESS STORIES =================
export async function createSuccessStory(data: any) {
  try {
    await prisma.successStory.create({ data });
    revalidatePath("/admin/success-stories");
    revalidatePath("/cau-chuyen-thanh-cong");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updateSuccessStory(id: number, data: any) {
  try {
    await prisma.successStory.update({ where: { id }, data });
    revalidatePath("/admin/success-stories");
    revalidatePath("/cau-chuyen-thanh-cong");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deleteSuccessStory(id: number) {
  try {
    await prisma.successStory.delete({ where: { id } });
    revalidatePath("/admin/success-stories");
    revalidatePath("/cau-chuyen-thanh-cong");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

// ================= POSTS =================
export async function createPost(data: any) {
  try {
    await prisma.post.create({ data });
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function updatePost(id: number, data: any) {
  try {
    await prisma.post.update({ where: { id }, data });
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}

export async function deletePost(id: number) {
  try {
    await prisma.post.delete({ where: { id } });
    revalidatePath("/admin/posts");
    revalidatePath("/blog");
    return { success: true };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
