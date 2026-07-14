import { PrismaClient } from "@prisma/client";
import SuccessStoriesClient from "./SuccessStoriesClient";

const prisma = new PrismaClient();

export default async function SuccessStoriesPage() {
  const stories = await prisma.successStory.findMany({ orderBy: { createdAt: "desc" } });
  return <SuccessStoriesClient stories={stories} />;
}
