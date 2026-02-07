"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { getExhibitions, type Exhibition } from '@/services/exhibitionsService';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadImage } from '@/services/storageService';
import { LuPlus, LuPencil, LuTrash2, LuX, LuUpload } from 'react-icons/lu';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ExhibitionsAdmin() {
  const [items, setItems] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Exhibition | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', order: 0 });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getExhibitions();
    setItems(data);
    setLoading(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = editingItem?.imageUrl || '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'exhibitions');
      }

      const itemData = { ...formData, imageUrl, createdAt: new Date() };

      if (editingItem) {
        await updateDoc(doc(db, 'exhibitions', editingItem.id), itemData);
        toast.success('Exhibition updated successfully!');
      } else {
        await addDoc(collection(db, 'exhibitions'), itemData);
        toast.success('Exhibition added successfully!');
      }

      closeModal();
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error('Failed to save exhibition');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: Exhibition) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;

    try {
      await deleteDoc(doc(db, 'exhibitions', item.id));
      toast.success('Exhibition deleted successfully!');
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete exhibition');
    }
  };

  const openModal = (item?: Exhibition) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, description: item.description, order: item.order });
      setImagePreview(item.imageUrl);
    } else {
      setEditingItem(null);
      setFormData({ title: '', description: '', order: items.length });
      setImagePreview('');
    }
    setImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ title: '', description: '', order: 0 });
    setImageFile(null);
    setImagePreview('');
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-1 sm:mb-2">Exhibitions Management</h1>
              <p className="text-sm sm:text-base text-gray-600">Manage your exhibition history</p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm sm:text-base shadow-sm"
            >
              <LuPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add Exhibition</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 mb-4">No exhibitions yet</p>
              <button onClick={() => openModal()} className="text-black hover:underline">
                Add your first exhibition
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-base sm:text-lg text-black mb-2">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-3">{item.description}</p>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openModal(item)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
                      >
                        <LuPencil className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm"
                      >
                        <LuTrash2 className="w-4 h-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex justify-between items-center rounded-t-2xl">
                  <h2 className="text-xl sm:text-2xl font-bold text-black">
                    {editingItem ? 'Edit Exhibition' : 'Add New Exhibition'}
                  </h2>
                  <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <LuX className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exhibition Image {!editingItem && <span className="text-red-500">*</span>}
                    </label>
                    <div className="flex flex-col items-center space-y-4">
                      {imagePreview && (
                        <div className="relative w-full aspect-[4/3] max-w-md rounded-lg overflow-hidden">
                          <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                        </div>
                      )}
                      <label className="cursor-pointer flex items-center space-x-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm sm:text-base">
                        <LuUpload className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{imageFile ? 'Change Image' : 'Upload Image'}</span>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" required={!editingItem} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Exhibition Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                      placeholder="e.g., Solo Exhibition at National Gallery"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                      placeholder="Describe the exhibition..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="w-full sm:flex-1 px-4 py-2.5 text-sm sm:text-base border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={uploading}
                      className="w-full sm:flex-1 px-4 py-2.5 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                    >
                      {uploading ? 'Saving...' : editingItem ? 'Update' : 'Create'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
