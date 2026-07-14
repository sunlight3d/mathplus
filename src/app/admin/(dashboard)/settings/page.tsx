import { getSettings } from "@/actions/settings";
import SettingsClient from "./SettingsClient";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Cấu hình hình ảnh</h1>
        <p className="mt-1 text-sm text-gray-500">
          Quản lý các hình ảnh tĩnh (banner, logo, ảnh giới thiệu) trên website.
        </p>
      </div>

      <SettingsClient initialSettings={settings} />
    </div>
  );
}
