"use client";

import { useState, useCallback } from "react";
import { updateSetting } from "@/actions/settings";
import { Edit, Upload, X } from "lucide-react";
import Cropper from 'react-easy-crop';
import { uploadImageAction } from "@/actions/upload";

// Helper to extract a cropped image as Blob
const getCroppedImg = async (imageSrc: string, pixelCrop: any): Promise<Blob | null> => {
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => reject(err));
    img.src = imageSrc;
  });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  if (!ctx) return null;

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob);
    }, 'image/jpeg');
  });
};

const DEFAULT_SETTINGS = [
  { key: "LOGO", name: "Logo Website", desc: "Ảnh Logo dùng chung cho Header và Footer (Tỷ lệ 1:1)", defaultRatio: 1, defaultUrl: "/images/logo.png" },
  { key: "HOME_BANNER_1", name: "Banner Trang chủ 1", desc: "Ảnh slider số 1 (Tỷ lệ 16:9)", defaultRatio: 16 / 9, defaultUrl: "/images/hero_slider_1.jpg" },
  { key: "HOME_BANNER_2", name: "Banner Trang chủ 2", desc: "Ảnh slider số 2 (Tỷ lệ 16:9)", defaultRatio: 16 / 9, defaultUrl: "/images/hero_slider_2.jpg" },
  { key: "HOME_BANNER_3", name: "Banner Trang chủ 3", desc: "Ảnh slider số 3 (Tỷ lệ 16:9)", defaultRatio: 16 / 9, defaultUrl: "/images/hero_slider_3.jpg" },
  { key: "HOME_ABOUT_IMG", name: "Ảnh Giới thiệu (Trang chủ)", desc: "Ảnh phần 'Về MathPlus' ở trang chủ (Tỷ lệ 1:1 hoặc 9:16)", defaultRatio: 1, defaultUrl: "/images/10.jpg" },
  { key: "HOME_OFFLINE_IMG", name: "Ảnh Lớp Offline (Trang chủ)", desc: "Ảnh minh họa lớp học offline (Tỷ lệ 16:9)", defaultRatio: 16 / 9, defaultUrl: "/images/offline_math_class.jpg" },
  { key: "HOME_ONLINE_IMG", name: "Ảnh Lớp Online (Trang chủ)", desc: "Ảnh minh họa lớp học online (Tỷ lệ 16:9)", defaultRatio: 16 / 9, defaultUrl: "/images/online_math_class.jpg" },
  
  { key: "ABOUT_BANNER", name: "Banner Trang Giới thiệu", desc: "Ảnh banner chính trang giới thiệu (Tỷ lệ 16:9)", defaultRatio: 16 / 9, defaultUrl: "/images/hero_slider_2.jpg" },
  { key: "ABOUT_FOUNDER_IMG", name: "Ảnh Người sáng lập", desc: "Ảnh chân dung Founder trang giới thiệu (Tỷ lệ 1:1 hoặc 9:16)", defaultRatio: 1, defaultUrl: "/images/10.jpg" },
  { key: "ABOUT_OFFLINE_IMG", name: "Ảnh Đội ngũ/Cơ sở", desc: "Ảnh phần đội ngũ giáo viên / cơ sở vật chất (Tỷ lệ 16:9)", defaultRatio: 16 / 9, defaultUrl: "/images/offline_math_class.jpg" },
  { key: "ABOUT_ONLINE_IMG", name: "Ảnh Phương pháp", desc: "Ảnh phần phương pháp giảng dạy (Tỷ lệ 16:9)", defaultRatio: 16 / 9, defaultUrl: "/images/online_math_class.jpg" },
];

const DEFAULT_TEXT_SETTINGS = [
  { key: "ABOUT_FOUNDER_NAME", name: "Tên người sáng lập", desc: "Tên hiển thị bên dưới ảnh Founder", defaultValue: "Thầy Nguyễn Văn Dũng" },
  { key: "ABOUT_FOUNDER_TITLE", name: "Chức danh", desc: "Chức danh hiển thị bên dưới tên", defaultValue: "Người Sáng Lập & Giám Đốc Chuyên Môn" },
  { key: "ABOUT_FOUNDER_STORY_P1", name: "Câu chuyện thành lập (Đoạn 1)", desc: "Đoạn 1 của câu chuyện thành lập", defaultValue: "Từ những ngày đầu bước chân vào bục giảng, tôi đã nhận ra một điều: Toán học không chỉ là những con số hay định lý khô khan. Đó là một ngôn ngữ tuyệt đẹp giúp chúng ta tư duy logic, giải quyết vấn đề và khám phá thế giới." },
  { key: "ABOUT_FOUNDER_STORY_P2", name: "Câu chuyện thành lập (Đoạn 2)", desc: "Đoạn 2 của câu chuyện thành lập", defaultValue: "Tuy nhiên, không ít học sinh gặp khó khăn và dần mất đi niềm đam mê với môn học này vì cách tiếp cận chưa phù hợp. Điều đó đã thôi thúc tôi thành lập MathPlus – một không gian học tập nơi mỗi con số đều mang một câu chuyện, mỗi bài toán đều là một thử thách thú vị." },
  { key: "ABOUT_FOUNDER_STORY_P3", name: "Câu chuyện thành lập (Đoạn 3)", desc: "Đoạn 3 của câu chuyện thành lập", defaultValue: "Tại MathPlus, chúng tôi không dạy học sinh học vẹt. Chúng tôi dạy các em cách tư duy. Với phương pháp cá nhân hóa và sự tận tâm của đội ngũ giáo viên, tôi tin rằng mọi học sinh đều có thể chinh phục môn Toán và ứng dụng nó vào cuộc sống một cách xuất sắc." },
  
  { key: "STATS_TEACHERS", name: "Số liệu - Giáo viên", desc: "Số giáo viên tận tâm", defaultValue: "100+" },
  { key: "STATS_BRANCHES", name: "Số liệu - Cơ sở", desc: "Số cơ sở học tập trực tiếp", defaultValue: "18+" },
  { key: "STATS_STUDENTS", name: "Số liệu - Học sinh", desc: "Số học sinh đã lấy lại gốc Toán", defaultValue: "42000+" },
  { key: "STATS_PROGRESS", name: "Số liệu - Tiến bộ", desc: "Tỷ lệ học sinh tiến bộ", defaultValue: "95%+" },
  { key: "STATS_YEARS", name: "Số liệu - Số năm hoạt động", desc: "Số năm hoạt động của trung tâm", defaultValue: "8+" },
];

const LEADERS_CONFIG = [
  { 
    id: 1, 
    imgKey: "LEADER_1_IMG",
    nameKey: "LEADER_1_NAME", defaultName: "Thầy Nguyễn Văn Dũng",
    roleKey: "LEADER_1_ROLE", defaultRole: "Người Sáng Lập & Giám Đốc Chuyên Môn",
    descKey: "LEADER_1_DESC", defaultDesc: "Với 10 năm kinh nghiệm giảng dạy chuyên Toán, Thầy Dũng là người truyền cảm hứng và xây dựng triết lý giáo dục cốt lõi tại MathPlus, mang đến những bài học sâu sắc và thực tế." 
  },
  { 
    id: 2, 
    imgKey: "LEADER_2_IMG",
    nameKey: "LEADER_2_NAME", defaultName: "Thầy Nguyễn Ngọc Sơn",
    roleKey: "LEADER_2_ROLE", defaultRole: "Giám Đốc Điều Hành",
    descKey: "LEADER_2_DESC", defaultDesc: "Phụ trách quản lý điều hành trung tâm, đồng thời là chuyên gia giảng dạy các bộ môn Toán và Vật lý, tạo ra môi trường học tập chuyên nghiệp và hiệu quả cho học sinh." 
  },
  { 
    id: 3, 
    imgKey: "LEADER_3_IMG",
    nameKey: "LEADER_3_NAME", defaultName: "Thầy Hà Văn Đài",
    roleKey: "LEADER_3_ROLE", defaultRole: "Trưởng phòng Đào tạo",
    descKey: "LEADER_3_DESC", defaultDesc: "Chuyên gia giảng dạy các bộ môn Vật lý, Hóa học và Tin học. Đảm nhiệm việc nghiên cứu và phát triển lộ trình học tập, tài liệu giảng dạy chuẩn hóa cho trung tâm." 
  },
];

export default function SettingsClient({ initialSettings }: { initialSettings: any[] }) {
  const [settings, setSettings] = useState<any[]>(initialSettings);
  
  const [editingKey, setEditingKey] = useState<string | null>(null);
  
  // Cropper states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [editingTexts, setEditingTexts] = useState<Record<string, string>>({});
  const [savingTextKey, setSavingTextKey] = useState<string | null>(null);

  // Leader edits
  const [editingLeaderId, setEditingLeaderId] = useState<number | null>(null);
  const [leaderForm, setLeaderForm] = useState({ name: "", role: "", desc: "" });
  const [savingLeader, setSavingLeader] = useState<number | null>(null);

  const handleTextChange = (key: string, val: string) => {
    setEditingTexts(prev => ({ ...prev, [key]: val }));
  };

  const handleSaveText = async (key: string, name: string) => {
    try {
      setSavingTextKey(key);
      const val = editingTexts[key] !== undefined ? editingTexts[key] : (getSettingValue(key) || "");
      await updateSetting(key, val, name);
      
      const newSettings = [...settings];
      const existIdx = newSettings.findIndex(s => s.key === key);
      if (existIdx >= 0) {
        newSettings[existIdx].value = val;
      } else {
        newSettings.push({ key, value: val });
      }
      setSettings(newSettings);
      alert("Đã lưu nội dung thành công!");
    } catch (e) {
      alert("Lỗi khi lưu nội dung");
    } finally {
      setSavingTextKey(null);
    }
  };

  const getSettingValue = (key: string) => {
    return settings.find((s) => s.key === key)?.value || null;
  };

  const handleEditLeader = (leader: any) => {
    setEditingLeaderId(leader.id);
    const dbName = getSettingValue(leader.nameKey);
    const dbRole = getSettingValue(leader.roleKey);
    const dbDesc = getSettingValue(leader.descKey);
    setLeaderForm({
      name: dbName !== null ? dbName : leader.defaultName,
      role: dbRole !== null ? dbRole : leader.defaultRole,
      desc: dbDesc !== null ? dbDesc : leader.defaultDesc,
    });
  };

  const handleSaveLeader = async (leader: any) => {
    try {
      setSavingLeader(leader.id);
      await updateSetting(leader.nameKey, leaderForm.name, `Tên Lãnh đạo ${leader.id}`);
      await updateSetting(leader.roleKey, leaderForm.role, `Chức danh Lãnh đạo ${leader.id}`);
      await updateSetting(leader.descKey, leaderForm.desc, `Mô tả Lãnh đạo ${leader.id}`);
      
      const newSettings = [...settings];
      const keysAndVals = [
        { key: leader.nameKey, value: leaderForm.name },
        { key: leader.roleKey, value: leaderForm.role },
        { key: leader.descKey, value: leaderForm.desc },
      ];
      keysAndVals.forEach(({ key, value }) => {
        const existIdx = newSettings.findIndex(s => s.key === key);
        if (existIdx >= 0) {
          newSettings[existIdx].value = value;
        } else {
          newSettings.push({ key, value });
        }
      });
      setSettings(newSettings);
      setEditingLeaderId(null);
      alert("Đã lưu thông tin lãnh đạo thành công!");
    } catch (e) {
      alert("Lỗi khi lưu thông tin lãnh đạo");
    } finally {
      setSavingLeader(null);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string, defaultRatio: number) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || null);
        setEditingKey(key);
        setAspectRatio(defaultRatio);
        setIsCropping(true);
      });
      reader.readAsDataURL(file);
      e.target.value = ''; // reset input
    }
  };

  const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (!imageSrc || !croppedAreaPixels || !editingKey) return;
    try {
      setUploadingImage(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedBlob) {
        const formDataPayload = new FormData();
        formDataPayload.append("file", croppedBlob, `${editingKey.toLowerCase()}.jpg`);
        const res = await uploadImageAction(formDataPayload);
        
        if (res.success && res.url) {
          // Update DB setting
          const targetSetting = DEFAULT_SETTINGS.find(s => s.key === editingKey);
          await updateSetting(editingKey, res.url, targetSetting?.name);
          
          // Update local state
          const newSettings = [...settings];
          const existIdx = newSettings.findIndex(s => s.key === editingKey);
          if (existIdx >= 0) {
            newSettings[existIdx].value = res.url;
          } else {
            newSettings.push({ key: editingKey, value: res.url });
          }
          setSettings(newSettings);
        } else {
          alert(res.message || "Lỗi khi tải ảnh lên");
        }
      }
    } catch (e) {
      console.error(e);
      alert("Lỗi cắt ảnh");
    } finally {
      setUploadingImage(false);
      setIsCropping(false);
      setImageSrc(null);
      setEditingKey(null);
    }
  };

  return (
    <div>
      {/* Cropper Modal */}
      {isCropping && imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg">Cắt ảnh ({editingKey})</h3>
              <button onClick={() => setIsCropping(false)} className="text-gray-500 hover:text-gray-700"><X size={20}/></button>
            </div>
            <div className="relative flex-1 bg-gray-900">
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </div>
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Tỉ lệ khung hình</label>
                  <select value={aspectRatio} onChange={(e) => setAspectRatio(Number(e.target.value))} className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white">
                    <option value={16 / 9}>Ngang (16:9)</option>
                    <option value={9 / 16}>Dọc (9:16)</option>
                    <option value={1}>Vuông (1:1)</option>
                    <option value={21 / 9}>Siêu ngang (21:9)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-2">Thu phóng (Zoom)</label>
                  <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-green-600 mt-2"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsCropping(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Hủy</button>
                <button onClick={handleSaveCrop} disabled={uploadingImage} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 flex items-center gap-2">
                  {uploadingImage ? "Đang lưu..." : "Cắt & Cập nhật ảnh"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 w-1/3">Vị trí ảnh</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Ảnh hiện tại</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right w-40">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DEFAULT_SETTINGS.map((item) => {
                const currentVal = getSettingValue(item.key);
                return (
                  <tr key={item.key} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                      <div className="text-xs text-gray-400 font-mono mt-1">({item.key})</div>
                    </td>
                    <td className="py-4 px-4">
                      {currentVal ? (
                        <div className="w-32 h-16 rounded overflow-hidden border border-green-300 bg-gray-100 relative shadow-sm">
                          <img src={currentVal} alt={item.name} className="w-full h-full object-contain" />
                          <div className="absolute inset-0 border-2 border-green-500 rounded pointer-events-none"></div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-16 rounded overflow-hidden border border-gray-200 bg-gray-50 relative opacity-70">
                            <img src={item.defaultUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                          </div>
                          <span className="text-xs text-gray-400 italic">Đang dùng ảnh mặc định</span>
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <label className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded text-sm font-medium hover:bg-green-100 cursor-pointer transition-colors">
                        <Edit size={16} />
                        Thay ảnh
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => onFileChange(e, item.key, item.defaultRatio)} 
                          className="hidden" 
                        />
                      </label>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-bold text-gray-800">Cấu hình Nội dung (Văn bản)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 w-1/3">Vị trí nội dung</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Nội dung hiện tại</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right w-40">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {DEFAULT_TEXT_SETTINGS.map((item) => {
                const dbVal = getSettingValue(item.key);
                const currentVal = dbVal !== null ? dbVal : item.defaultValue;
                const editingVal = editingTexts[item.key] !== undefined ? editingTexts[item.key] : currentVal;
                const isSaving = savingTextKey === item.key;
                
                return (
                  <tr key={item.key} className="hover:bg-gray-50">
                    <td className="py-4 px-4 align-top">
                      <div className="font-medium text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500 mt-1">{item.desc}</div>
                      <div className="text-xs text-gray-400 font-mono mt-1">({item.key})</div>
                    </td>
                    <td className="py-4 px-4 align-top">
                      <textarea 
                        className="w-full min-h-[100px] border border-gray-300 rounded-md p-2 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                        value={editingVal}
                        onChange={(e) => handleTextChange(item.key, e.target.value)}
                        placeholder="Nhập nội dung vào đây..."
                      />
                    </td>
                    <td className="py-4 px-4 text-right align-top">
                      <button 
                        onClick={() => handleSaveText(item.key, item.name)}
                        disabled={isSaving || editingVal === currentVal}
                        className={`inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                          editingVal !== currentVal 
                            ? "bg-green-600 text-white hover:bg-green-700" 
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
        <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Thông tin Ban Lãnh đạo</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 w-24">Ảnh</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 w-1/4">Tên Lãnh đạo</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 w-1/4">Chức danh</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Mô tả</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right w-32">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {LEADERS_CONFIG.map((leader) => {
                const isEditing = editingLeaderId === leader.id;
                const isSaving = savingLeader === leader.id;

                const dbImg = getSettingValue(leader.imgKey);
                const dbName = getSettingValue(leader.nameKey);
                const dbRole = getSettingValue(leader.roleKey);
                const dbDesc = getSettingValue(leader.descKey);
                const currentName = dbName !== null ? dbName : leader.defaultName;
                const currentRole = dbRole !== null ? dbRole : leader.defaultRole;
                const currentDesc = dbDesc !== null ? dbDesc : leader.defaultDesc;

                return (
                  <tr key={leader.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4 align-top">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100 relative shadow-sm mb-2">
                        {dbImg ? (
                           <img src={dbImg} alt={currentName} className="w-full h-full object-cover" />
                        ) : (
                           <div className="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-50">Trống</div>
                        )}
                      </div>
                      <label className="text-[10px] text-center w-full block bg-gray-200 hover:bg-gray-300 py-1 rounded cursor-pointer text-gray-700">
                        Đổi ảnh
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => onFileChange(e, leader.imgKey, 1)} 
                          className="hidden" 
                        />
                      </label>
                    </td>
                    <td className="py-4 px-4 align-top">
                      {isEditing ? (
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-green-500 outline-none"
                          value={leaderForm.name}
                          onChange={e => setLeaderForm({...leaderForm, name: e.target.value})}
                        />
                      ) : (
                        <div className="font-medium text-gray-800">{currentName}</div>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top">
                      {isEditing ? (
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-green-500 outline-none"
                          value={leaderForm.role}
                          onChange={e => setLeaderForm({...leaderForm, role: e.target.value})}
                        />
                      ) : (
                        <div className="text-gray-600 text-sm">{currentRole}</div>
                      )}
                    </td>
                    <td className="py-4 px-4 align-top">
                      {isEditing ? (
                        <textarea 
                          className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-green-500 outline-none min-h-[100px]"
                          value={leaderForm.desc}
                          onChange={e => setLeaderForm({...leaderForm, desc: e.target.value})}
                        />
                      ) : (
                        <div className="text-gray-600 text-sm whitespace-pre-wrap">{currentDesc}</div>
                      )}
                    </td>
                    <td className="py-4 px-4 text-right align-top">
                      {isEditing ? (
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => handleSaveLeader(leader)}
                            disabled={isSaving}
                            className="w-full py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700 disabled:opacity-50"
                          >
                            {isSaving ? "Đang lưu..." : "Lưu"}
                          </button>
                          <button 
                            onClick={() => setEditingLeaderId(null)}
                            disabled={isSaving}
                            className="w-full py-1.5 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 disabled:opacity-50"
                          >
                            Hủy
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => handleEditLeader(leader)}
                          className="inline-flex items-center justify-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-sm font-medium hover:bg-blue-100 transition-colors"
                        >
                          <Edit size={16} /> Sửa
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
