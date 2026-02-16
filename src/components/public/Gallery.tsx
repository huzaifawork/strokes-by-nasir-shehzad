"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getGalleryItems, GalleryItem } from '@/services/galleryService';
import Image from 'next/image';
import { LuX, LuChevronLeft, LuChevronRight } from 'react-icons/lu';

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const items = await getGalleryItems();
      setGalleryItems(items);
      setLoading(false);
    };

    fetchGallery();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryItems.length) % galleryItems.length);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryItems.length);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <section id="gallery" className="relative min-h-screen bg-[#F8F8F8] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 lg:mb-24"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-black mb-4">
            Gallery
          </h2>
          <div className="h-[1px] w-24 bg-black" />
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="animate-pulse">
                {/* Image Skeleton */}
                <div className="relative aspect-[3/4] bg-gray-200 rounded-sm mb-4" />
                {/* Title Skeleton */}
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                {/* Description Skeleton */}
                <div className="h-4 bg-gray-200 rounded w-full mb-1" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : galleryItems.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-400 text-lg">No artworks available yet.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] bg-white overflow-hidden mb-4 shadow-sm hover:shadow-xl transition-shadow duration-500">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    loading="lazy"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                      Click to view
                    </span>
                  </div>
                </div>

                {/* Artwork Details */}
                <div className="space-y-2">
                  {/* Name */}
                  <h3 className="text-xl font-medium text-black tracking-tight">
                    {item.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                  
                  {/* Size & Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                    <span className="text-xs uppercase tracking-wider text-gray-500">
                      {item.size}
                    </span>
                    <span className="text-lg font-medium text-black">
                      {item.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <LuX className="w-6 h-6" />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <LuChevronLeft className="w-8 h-8" />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <LuChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full h-full max-w-6xl flex flex-col overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative w-full flex-shrink-0" style={{ height: 'min(70vh, 600px)' }}>
                <Image
                  src={galleryItems[selectedImage].imageUrl}
                  alt={galleryItems[selectedImage].name}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Image Info - Below image on mobile, overlay on desktop */}
              <div className="bg-black/90 md:bg-gradient-to-t md:from-black/80 md:to-transparent p-4 sm:p-6 text-white md:absolute md:bottom-0 md:left-0 md:right-0">
                <h3 className="text-xl sm:text-2xl font-medium mb-2">{galleryItems[selectedImage].name}</h3>
                <p className="text-sm text-gray-300 mb-3 leading-relaxed">{galleryItems[selectedImage].description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span>{galleryItems[selectedImage].size}</span>
                  <span className="text-lg font-medium">{galleryItems[selectedImage].price}</span>
                </div>
              </div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} / {galleryItems.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
