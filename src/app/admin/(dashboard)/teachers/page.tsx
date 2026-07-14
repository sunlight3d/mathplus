import { PrismaClient } from "@prisma/client";
import TeachersClient from "./TeachersClient";

const prisma = new PrismaClient();

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({ orderBy: { createdAt: "desc" } });
  return <TeachersClient teachers={teachers} />;
}
