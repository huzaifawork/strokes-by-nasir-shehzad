"use client";

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { getAwards, type Award } from '@/services/awardsService';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadImage } from '@/services/storageService';
import { LuPlus, LuPencil, LuTrash2, LuX, LuUpload, LuAward, LuUsers } from 'react-icons/lu';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function AwardsAdmin() {
  const [items, setItems] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Award | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({ title: '', order: 0 });
  
  const [awardImageFile, setAwardImageFile] = useState<File | null>(null);
  const [awardImagePreview, setAwardImagePreview] = useState<string>('');
  
  const [receivingImageFile, setReceivingImageFile] = useState<File | null>(null);
  const [receivingImagePreview, setReceivingImagePreview] = useState<string>('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const data = await getAwards();
    setItems(data);
    setLoading(false);
  };

  const handleAwardImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAwardImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setAwardImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReceivingImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReceivingImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setReceivingImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let awardImageUrl = editingItem?.awardImageUrl || '';
      if (awardImageFile) {
        awardImageUrl = await uploadImage(awardImageFile, 'awards');
      }

      let receivingImageUrl = editingItem?.receivingImageUrl || '';
      if (receivingImageFile) {
        receivingImageUrl = await uploadImage(receivingImageFile, 'awards_receiving');
      }

      if (!awardImageUrl && !receivingImageUrl) {
        toast.error('At least one image is required');
        setUploading(false);
        return;
      }

      const itemData = { 
        ...formData, 
        awardImageUrl, 
        receivingImageUrl, 
        createdAt: new Date() 
      };

      if (editingItem) {
        await updateDoc(doc(db, 'awards', editingItem.id), itemData);
        toast.success('Award updated successfully!');
      } else {
        await addDoc(collection(db, 'awards'), itemData);
        toast.success('Award added successfully!');
      }

      closeModal();
      fetchItems();
    } catch (error) {
      console.error('Error saving item:', error);
      toast.error('Failed to save award');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (item: Award) => {
    if (!confirm(`Are you sure you want to delete "${item.title}"?`)) return;

    try {
      await deleteDoc(doc(db, 'awards', item.id));
      toast.success('Award deleted successfully!');
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
      toast.error('Failed to delete award');
    }
  };

  const openModal = (item?: Award) => {
    if (item) {
      setEditingItem(item);
      setFormData({ title: item.title, order: item.order });
      setAwardImagePreview(item.awardImageUrl || '');
      setReceivingImagePreview(item.receivingImageUrl || '');
    } else {
      setEditingItem(null);
      setFormData({ title: '', order: items.length });
      setAwardImagePreview('');
      setReceivingImagePreview('');
    }
    setAwardImageFile(null);
    setReceivingImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setFormData({ title: '', order: 0 });
    setAwardImageFile(null);
    setAwardImagePreview('');
    setReceivingImageFile(null);
    setReceivingImagePreview('');
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-1 sm:mb-2">Certificates & Awards</h1>
              <p className="text-sm sm:text-base text-gray-600">Manage your achievements and recognitions</p>
            </div>
            <button
              onClick={() => openModal()}
              className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors text-sm sm:text-base shadow-sm"
            >
              <LuPlus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Add Award</span>
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading...</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 mb-4">No awards yet</p>
              <button onClick={() => openModal()} className="text-black hover:underline">
                Add your first award
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
                  <div className={`grid aspect-[4/3] ${item.awardImageUrl && item.receivingImageUrl ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {item.awardImageUrl && (
                      <div className="relative overflow-hidden group cursor-pointer border-r border-gray-100">
                        <Image src={item.awardImageUrl} alt="Award" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-[10px] text-white px-2 py-0.5 rounded-full">Award</div>
                      </div>
                    )}
                    {item.receivingImageUrl && (
                      <div className="relative overflow-hidden group cursor-pointer">
                        <Image src={item.receivingImageUrl} alt="Receiving" fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
                        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-md text-[10px] text-white px-2 py-0.5 rounded-full">Receiving</div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-base sm:text-lg text-black mb-3">{item.title}</h3>
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
                    {editingItem ? 'Edit Award' : 'Add New Award'}
                  </h2>
                  <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <LuX className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Award Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none"
                      placeholder="e.g., National Excellence Award in Art"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Award Image */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Award Image <span className="text-gray-400 text-xs">(optional)</span>
                      </label>
                      <div className="flex flex-col items-center space-y-4">
                        {awardImagePreview ? (
                          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
                            <Image src={awardImagePreview} alt="Award Preview" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-full aspect-square md:aspect-[4/3] rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                            <LuAward className="w-8 h-8 mb-2" />
                            <span className="text-xs">No image selected</span>
                          </div>
                        )}
                        <label className="w-full cursor-pointer flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          <LuUpload className="w-4 h-4" />
                          <span>{awardImageFile ? 'Change Award Image' : 'Upload Award Image'}</span>
                          <input type="file" accept="image/*" onChange={handleAwardImageChange} className="hidden" />
                        </label>
                      </div>
                    </div>

                    {/* Receiving Image */}
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-gray-700">
                        Receiving Image <span className="text-gray-400 text-xs">(optional)</span>
                      </label>
                      <div className="flex flex-col items-center space-y-4">
                        {receivingImagePreview ? (
                          <div className="relative w-full aspect-square md:aspect-[4/3] rounded-lg overflow-hidden border border-gray-200">
                            <Image src={receivingImagePreview} alt="Receiving Preview" fill className="object-cover" />
                          </div>
                        ) : (
                          <div className="w-full aspect-square md:aspect-[4/3] rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
                            <LuUsers className="w-8 h-8 mb-2" />
                            <span className="text-xs">No image selected</span>
                          </div>
                        )}
                        <label className="w-full cursor-pointer flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm">
                          <LuUpload className="w-4 h-4" />
                          <span>{receivingImageFile ? 'Change Receiving Image' : 'Upload Receiving Image'}</span>
                          <input type="file" accept="image/*" onChange={handleReceivingImageChange} className="hidden" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-gray-100">
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
                      className="w-full sm:flex-1 px-4 py-2.5 text-sm sm:text-base bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {uploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>{editingItem ? 'Update' : 'Create'}</span>
                      )}
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
