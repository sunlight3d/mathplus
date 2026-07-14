"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getSettings() {
  try {
    const settings = await prisma.siteSetting.findMany();
    return settings;
  } catch (error) {
    console.error("Lỗi lấy danh sách settings:", error);
    return [];
  }
}

export async function getSettingByKey(key: string) {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key },
    });
    return setting?.value || null;
  } catch (error) {
    console.error(`Lỗi lấy setting ${key}:`, error);
    return null;
  }
}

export async function updateSetting(key: string, value: string, description?: string) {
  try {
    const updated = await prisma.siteSetting.upsert({
      where: { key },
      update: {
        value,
        ...(description ? { description } : {}),
      },
      create: {
        key,
        value,
        description: description || key,
      },
    });

    revalidatePath("/");
    revalidatePath("/gioi-thieu");
    return { success: true, setting: updated };
  } catch (error) {
    console.error("Lỗi cập nhật setting:", error);
    return { success: false, error: "Lỗi hệ thống khi cập nhật." };
  }
}
