import { getSettings } from "@/actions/settings";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const settings = await getSettings();
  
  // Transform settings array into a key-value object
  const settingsMap = settings.reduce((acc: Record<string, string>, curr: any) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  return <HomeClient settings={settingsMap} />;
}
