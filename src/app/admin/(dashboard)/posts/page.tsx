import { PrismaClient } from "@prisma/client";
import PostsClient from "./PostsClient";

const prisma = new PrismaClient();

export default async function PostsPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return <PostsClient posts={posts} />;
}
