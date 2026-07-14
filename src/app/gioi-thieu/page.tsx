import { getSettings } from "@/actions/settings";
import { prisma } from "@/lib/prisma";
import GioiThieuClient from "./GioiThieuClient";

export default async function AboutPage() {
  const settings = await getSettings();
  
  const settingsMap = settings.reduce((acc: Record<string, string>, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const successStories = await prisma.successStory.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return <GioiThieuClient settings={settingsMap} successStories={successStories} />;
}
