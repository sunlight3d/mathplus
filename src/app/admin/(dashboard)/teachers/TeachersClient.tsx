"use client";

import { useState, useCallback } from "react";
import { createTeacher, updateTeacher, deleteTeacher } from "@/actions/admin";
import { Plus, Edit, Trash2, X, Upload } from "lucide-react";
import Cropper from 'react-easy-crop';
import RichTextEditor from "@/components/RichTextEditor";
import { uploadImageAction } from "@/actions/upload";

const ROLES = [
  "Giáo viên Toán Tiểu học",
  "Giáo viên Toán THCS",
  "Giáo viên Toán PTTH",
  "Giáo viên Luyện thi Đại học",
  "Chuyên gia Cố vấn"
];

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

export default function TeachersClient({ teachers }: { teachers: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ name: "", role: ROLES[0], bio: "", exp: "", students: "", avatar: "" });
  const [loading, setLoading] = useState(false);

  // Cropper states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const openNew = () => {
    setFormData({ name: "", role: ROLES[0], bio: "", exp: "", students: "", avatar: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (teacher: any) => {
    setFormData({ 
      name: teacher.name || "", 
      role: teacher.role || ROLES[0], 
      bio: teacher.bio || "", 
      exp: teacher.exp || "", 
      students: teacher.students || "", 
      avatar: teacher.avatar || "" 
    });
    setEditingId(teacher.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa giáo viên này?")) {
      await deleteTeacher(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await updateTeacher(editingId, formData);
    } else {
      await createTeacher(formData);
    }
    setLoading(false);
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImageSrc(reader.result?.toString() || null);
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
    if (!imageSrc || !croppedAreaPixels) return;
    try {
      setUploadingImage(true);
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      if (croppedBlob) {
        const formDataPayload = new FormData();
        formDataPayload.append("file", croppedBlob, "avatar.jpg");
        const res = await uploadImageAction(formDataPayload);
        if (res.success && res.url) {
          setFormData({ ...formData, avatar: res.url });
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
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Giáo viên</h2>
        <button onClick={openNew} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={20} />
          <span>Thêm mới</span>
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-gray-800">{editingId ? "Sửa thông tin giáo viên" : "Thêm giáo viên mới"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên giáo viên</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vai trò / Chuyên môn</label>
                <select name="role" value={formData.role} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500">
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kinh nghiệm</label>
                <input type="text" name="exp" value={formData.exp} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="VD: 15+ năm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng học sinh</label>
                <input type="text" name="students" value={formData.students} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500" placeholder="VD: 10.000+" />
              </div>
              
              {/* Image Upload Area */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh đại diện</label>
                <div className="flex items-start gap-4">
                  {formData.avatar ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setFormData({...formData, avatar: ''})} className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white hover:text-red-700">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <span className="text-xs text-gray-400">Trống</span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <Upload size={18} />
                      Tải ảnh từ máy tính
                      <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">Kéo thả để cắt ảnh vuông (tỷ lệ 1:1) trực tiếp. Khuyên dùng ảnh chân dung.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Giới thiệu ngắn (Bio)</label>
                <RichTextEditor 
                  value={formData.bio} 
                  onChange={(value) => setFormData({ ...formData, bio: value })} 
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border text-gray-600 rounded-lg hover:bg-gray-50">Hủy</button>
              <button type="submit" disabled={loading} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50">
                {loading ? "Đang xử lý..." : "Lưu thay đổi"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cropper Modal */}
      {isCropping && imageSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-lg">Cắt ảnh đại diện</h3>
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
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-green-600 mt-2"
                />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button onClick={() => setIsCropping(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-100">Hủy</button>
                <button onClick={handleSaveCrop} disabled={uploadingImage} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 flex items-center gap-2">
                  {uploadingImage ? "Đang lưu..." : "Cắt & Lưu ảnh"}
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
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Ảnh</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Tên giáo viên</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Vai trò</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Kinh nghiệm</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((teacher) => (
                <tr key={teacher.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-500">#{teacher.id}</td>
                  <td className="py-3 px-4">
                    {teacher.avatar ? (
                      <img src={teacher.avatar} alt={teacher.name} className="w-10 h-10 rounded-full object-cover border border-gray-200" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">Trống</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{teacher.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{teacher.role}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{teacher.exp}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => openEdit(teacher)} className="text-green-600 hover:text-green-800 p-1 mx-1">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(teacher.id)} className="text-orange-500 hover:text-orange-600 p-1 mx-1">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {teachers.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">Chưa có giáo viên nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
