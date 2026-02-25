"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getResidencies, Residency } from '@/services/residenciesService';
import Image from 'next/image';
import { LuX, LuChevronLeft, LuChevronRight } from 'react-icons/lu';

export default function Residencies() {
  const [residencies, setResidencies] = useState<Residency[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    const fetchResidencies = async () => {
      const items = await getResidencies();
      setResidencies(items);
      setLoading(false);
    };

    fetchResidencies();
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
      setSelectedImage((selectedImage - 1 + residencies.length) % residencies.length);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % residencies.length);
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
    <section id="residencies" className="relative min-h-screen bg-[#F8F8F8] py-24 lg:py-32 scroll-mt-24 lg:scroll-mt-32">
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
            Residencies
          </h2>
          <div className="h-[1px] w-24 bg-black" />
        </motion.div>

        {/* Residencies Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                {/* Image Skeleton */}
                <div className="relative aspect-[4/3] bg-gray-200 rounded-sm mb-5" />
                {/* Title Skeleton */}
                <div className="h-7 bg-gray-200 rounded w-2/3 mb-3" />
                {/* Description Skeleton */}
                <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : residencies.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-400 text-lg">No residencies available yet.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
            {residencies.map((residency, index) => (
              <motion.div
                key={residency.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer flex flex-col h-full"
                onClick={() => openLightbox(index)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden mb-6 shadow-sm hover:shadow-2xl transition-shadow duration-500">
                  <Image
                    src={residency.imageUrl}
                    alt={residency.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                  />
                  
                  {/* Subtle Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium backdrop-blur-sm bg-black/20 px-4 py-2 rounded-full">
                      View Residency
                    </span>
                  </div>
                </div>

                {/* Residency Details */}
                <div className="flex flex-col flex-grow">
                  {/* Title */}
                  <h3 className="text-2xl font-medium text-black tracking-tight mb-3">
                    {residency.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-base text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {residency.description}
                  </p>
                  
                  {/* View Details Indicator */}
                  <div className="flex items-center gap-3 text-black/40 group-hover:text-black transition-colors duration-300">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Discover</span>
                    <div className="h-[1px] w-8 bg-current transition-all duration-500 group-hover:w-16" />
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
                  src={residencies[selectedImage].imageUrl}
                  alt={residencies[selectedImage].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Image Info - Below image on mobile, overlay on desktop */}
              <div className="bg-black/90 md:bg-gradient-to-t md:from-black/90 md:via-black/70 md:to-transparent p-6 sm:p-8 text-white md:absolute md:bottom-0 md:left-0 md:right-0">
                <h3 className="text-2xl sm:text-3xl font-medium mb-3">{residencies[selectedImage].title}</h3>
                <div className="max-h-[150px] overflow-y-auto pr-4 custom-scrollbar lg:max-w-3xl">
                  <p className="text-base text-gray-300 leading-relaxed font-light">
                    {residencies[selectedImage].description}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {selectedImage + 1} / {residencies.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
