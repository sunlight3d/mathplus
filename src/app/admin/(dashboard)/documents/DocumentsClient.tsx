"use client";

import { useState } from "react";
import { createDocument, updateDocument, deleteDocument } from "@/actions/document";
import { uploadDocumentAction } from "@/actions/upload";
import { Edit, Trash2, Plus, Upload, X } from "lucide-react";

export default function DocumentsClient({ documents }: { documents: any[] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({ 
    title: "", 
    slug: "", 
    description: "", 
    fileUrl: "", 
    color: "from-blue-500 to-cyan-400" 
  });
  const [loading, setLoading] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);

  const openNew = () => {
    setFormData({ title: "", slug: "", description: "", fileUrl: "", color: "from-blue-500 to-cyan-400" });
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (doc: any) => {
    setFormData({ 
      title: doc.title || "", 
      slug: doc.slug || "", 
      description: doc.description || "", 
      fileUrl: doc.fileUrl || "", 
      color: doc.color || "from-blue-500 to-cyan-400"
    });
    setEditingId(doc.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Bạn có chắc muốn xóa tài liệu này?")) {
      await deleteDocument(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      await updateDocument(editingId, formData);
    } else {
      await createDocument(formData);
    }
    setLoading(false);
    setShowForm(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle direct file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadingDoc(true);

      const uploadData = new FormData();
      uploadData.append("file", file);

      try {
        const res = await uploadDocumentAction(uploadData);
        if (res.success) {
          setFormData({ ...formData, fileUrl: res.url as string });
        } else {
          alert("Lỗi upload: " + res.message);
        }
      } catch (err) {
        alert("Có lỗi xảy ra khi upload tài liệu.");
      } finally {
        setUploadingDoc(false);
      }
    }
  };

  return (
    <div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="font-semibold text-gray-700">Danh sách tài liệu</h2>
          <button 
            onClick={openNew}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors shadow-sm"
          >
            <Plus size={16} className="mr-2" />
            Thêm mới
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-sm font-semibold text-gray-600">ID</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Tên tài liệu</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Mô tả</th>
                <th className="p-4 text-sm font-semibold text-gray-600">File URL</th>
                <th className="p-4 text-sm font-semibold text-gray-600 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-sm text-gray-500">#{doc.id}</td>
                  <td className="p-4 text-sm font-medium text-gray-800">{doc.title}</td>
                  <td className="p-4 text-sm text-gray-600 max-w-xs truncate">{doc.description}</td>
                  <td className="p-4 text-sm text-blue-600 max-w-xs truncate">
                    <a href={doc.fileUrl} target="_blank" rel="noreferrer" className="hover:underline">
                      {doc.fileUrl}
                    </a>
                  </td>
                  <td className="p-4 text-sm text-right space-x-2">
                    <button 
                      onClick={() => openEdit(doc)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                      title="Sửa"
                    >
                      <Edit size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(doc.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                      title="Xóa"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {documents.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-500">
                    Chưa có tài liệu nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden my-8">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-800">
                {editingId ? "Sửa tài liệu" : "Thêm tài liệu mới"}
              </h2>
              <button 
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors bg-white hover:bg-gray-100 p-2 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Tên tài liệu *</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
                    placeholder="VD: Toán lớp 6"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Đường dẫn thân thiện (Slug) *</label>
                  <input
                    type="text"
                    name="slug"
                    required
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
                    placeholder="VD: toan-lop-6"
                  />
                  <p className="text-xs text-gray-500 mt-1">Sử dụng chữ thường, không dấu, ngăn cách bằng dấu gạch ngang.</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Mô tả ngắn</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow resize-none"
                    placeholder="Tài liệu học tập..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Upload File PDF *</label>
                  <div className="flex gap-4 items-end">
                    <div className="flex-1">
                      <input
                        type="text"
                        name="fileUrl"
                        required
                        value={formData.fileUrl}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
                        placeholder="Đường dẫn file sau khi upload"
                        readOnly
                      />
                    </div>
                    <div className="relative shrink-0">
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={handleFileUpload} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        disabled={uploadingDoc}
                      />
                      <button 
                        type="button" 
                        className={`px-4 py-2.5 rounded-lg flex items-center font-medium transition-colors ${
                          uploadingDoc 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        <Upload size={18} className="mr-2" />
                        {uploadingDoc ? "Đang upload..." : "Chọn File"}
                      </button>
                    </div>
                  </div>
                  {formData.fileUrl && (
                    <p className="text-xs text-green-600 mt-2 font-medium">Đã tải lên: {formData.fileUrl}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Màu sắc gradient (Giao diện hiển thị)</label>
                  <select
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-shadow"
                  >
                    <option value="from-blue-500 to-cyan-400">Xanh nước biển (Blue - Cyan)</option>
                    <option value="from-emerald-500 to-teal-400">Xanh ngọc (Emerald - Teal)</option>
                    <option value="from-orange-500 to-amber-400">Cam (Orange - Amber)</option>
                    <option value="from-purple-500 to-fuchsia-400">Tím (Purple - Fuchsia)</option>
                    <option value="from-rose-500 to-pink-400">Hồng (Rose - Pink)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={loading || uploadingDoc}
                  className="px-6 py-2.5 text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 rounded-lg font-medium transition-colors shadow-sm"
                >
                  {loading ? "Đang lưu..." : "Lưu tài liệu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
