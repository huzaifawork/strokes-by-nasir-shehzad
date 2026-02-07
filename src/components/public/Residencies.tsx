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
    <section id="residencies" className="relative min-h-screen bg-[#F8F8F8] py-24 lg:py-32">
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
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-400 text-lg">Loading residencies...</div>
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
                className="group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden mb-5 shadow-sm hover:shadow-2xl transition-shadow duration-500">
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
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm font-medium">
                      Click to view
                    </span>
                  </div>
                </div>

                {/* Residency Details */}
                <div className="space-y-3">
                  {/* Title */}
                  <h3 className="text-2xl font-medium text-black tracking-tight">
                    {residency.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-base text-gray-600 leading-relaxed">
                    {residency.description}
                  </p>
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
              className="relative max-w-6xl max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={residencies[selectedImage].imageUrl}
                  alt={residencies[selectedImage].title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-2xl font-medium mb-2">{residencies[selectedImage].title}</h3>
                <p className="text-sm text-gray-300">{residencies[selectedImage].description}</p>
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
