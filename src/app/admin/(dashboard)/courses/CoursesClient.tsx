"use client";

import { useState, useCallback } from "react";
import { createCourse, updateCourse, deleteCourse } from "@/actions/admin";
import { Edit, Trash2, Plus, Upload, X } from "lucide-react";
import Cropper from 'react-easy-crop';
import RichTextEditor from "@/components/RichTextEditor";
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

export default function CoursesClient({ courses }: { courses: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ title: "", slug: "", description: "", category: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);

  // Cropper states
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isCropping, setIsCropping] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const openNew = () => {
    setFormData({ title: "", slug: "", description: "", category: "", price: "", image: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (course: any) => {
    setFormData({ 
      title: course.title || "", 
      slug: course.slug || "", 
      description: course.description || "", 
      category: course.category || "", 
      price: course.price || "", 
      image: course.image || "" 
    });
    setEditingId(course.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa khóa học này?")) {
      await deleteCourse(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await updateCourse(editingId, formData);
    } else {
      await createCourse(formData);
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
        formDataPayload.append("file", croppedBlob, "course.jpg");
        const res = await uploadImageAction(formDataPayload);
        if (res.success && res.url) {
          setFormData({ ...formData, image: res.url });
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
        <h2 className="text-2xl font-bold text-gray-800">Quản lý Khóa học</h2>
        <button onClick={openNew} className="flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition-colors">
          <Plus size={20} />
          <span>Thêm mới</span>
        </button>
      </div>

      {showForm && (
        <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-gray-800">{editingId ? "Sửa khóa học" : "Thêm khóa học mới"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tên khóa học</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Đường dẫn (Slug)</label>
                <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500" required>
                  <option value="" disabled>Chọn danh mục</option>
                  <option value="Toán tiểu học">Toán tiểu học</option>
                  <option value="Toán THCS">Toán THCS</option>
                  <option value="Toán PTTH">Toán PTTH</option>
                  <option value="Luyện thi đại học">Luyện thi đại học</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg focus:ring-green-500 focus:border-green-500" />
              </div>
              
              {/* Image Upload Area */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh khóa học (Thumbnail)</label>
                <div className="flex items-start gap-4">
                  {formData.image ? (
                    <div className="relative w-32 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setFormData({...formData, image: ''})} className="absolute top-1 right-1 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white hover:text-red-700">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="w-32 h-20 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                      <span className="text-xs text-gray-400">Trống</span>
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <Upload size={18} />
                      Tải ảnh từ máy tính
                      <input type="file" accept="image/*" onChange={onFileChange} className="hidden" />
                    </label>
                    <p className="mt-2 text-xs text-gray-500">Kéo thả để cắt ảnh (tỷ lệ 16:9) trực tiếp. Ảnh sẽ được dùng làm thumbnail khóa học.</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                <RichTextEditor 
                  value={formData.description} 
                  onChange={(value) => setFormData({ ...formData, description: value })} 
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
              <h3 className="font-bold text-lg">Cắt ảnh khóa học</h3>
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
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Tên khóa học</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Danh mục</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600">Giá</th>
                <th className="py-3 px-4 text-sm font-semibold text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-500">#{course.id}</td>
                  <td className="py-3 px-4">
                    {course.image ? (
                      <img src={course.image} alt={course.title} className="w-16 h-9 rounded-md object-cover border border-gray-200" />
                    ) : (
                      <div className="w-16 h-9 rounded-md bg-gray-100 flex items-center justify-center text-gray-400 text-[10px]">Trống</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{course.title}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{course.category}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{course.price}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => openEdit(course)} className="text-green-600 hover:text-green-800 p-1 mx-1">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(course.id)} className="text-orange-500 hover:text-orange-700 p-1 mx-1">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {courses.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-500">Chưa có khóa học nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
