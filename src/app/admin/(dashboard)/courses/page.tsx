import { PrismaClient } from "@prisma/client";
import CoursesClient from "./CoursesClient";

const prisma = new PrismaClient();

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({ orderBy: { createdAt: "desc" } });
  return <CoursesClient courses={courses} />;
}
