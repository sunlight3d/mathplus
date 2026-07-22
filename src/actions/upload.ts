"use server";

import fs from "fs/promises";
import path from "path";

export async function uploadImageAction(formData: FormData) {
  try {
    const file = formData.get("file") as File | null;
    if (!file) {
      return { success: false, message: "Không tìm thấy file" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Sanitize original filename (keep only alphanumeric and dots)
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
    const filename = `${uniqueSuffix}-${sanitizedName}`;

    // Define the upload directory
    const uploadDir = path.join(process.cwd(), "public", "uploads", "teachers");

    // Ensure directory exists
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filepath = path.join(uploadDir, filename);

    // Write file
    await fs.writeFile(filepath, buffer);

    // Return the API URL to bypass Next.js dev server cache for public folder
    return { 
      success: true, 
      url: `/api/uploads/teachers/${filename}` 
    };

  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, message: "Có lỗi xảy ra khi upload ảnh" };
  }
}
