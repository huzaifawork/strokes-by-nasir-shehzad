"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAwards, Award } from '@/services/awardsService';
import Image from 'next/image';
import { LuX, LuChevronLeft, LuChevronRight, LuAward } from 'react-icons/lu';

export default function Awards() {
  const [awards, setAwards] = useState<Award[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAward, setSelectedAward] = useState<number | null>(null);

  useEffect(() => {
    const fetchAwards = async () => {
      const items = await getAwards();
      setAwards(items);
      setLoading(false);
    };

    fetchAwards();
  }, []);

  const openLightbox = (index: number) => {
    setSelectedAward(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedAward(null);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    if (selectedAward !== null) {
      setSelectedAward((selectedAward - 1 + awards.length) % awards.length);
    }
  };

  const goToNext = () => {
    if (selectedAward !== null) {
      setSelectedAward((selectedAward + 1) % awards.length);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedAward === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAward]);

  return (
    <section id="awards" className="relative min-h-screen bg-white py-24 lg:py-32 scroll-mt-24 lg:scroll-mt-32">
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
            Certificates & Awards
          </h2>
          <div className="h-[1px] w-24 bg-black" />
        </motion.div>

        {/* Awards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="aspect-[3/4] bg-gray-100 rounded-sm" />
                  <div className="aspect-[3/4] bg-gray-100 rounded-sm" />
                </div>
                <div className="h-7 bg-gray-100 rounded w-2/3 mb-3" />
              </div>
            ))}
          </div>
        ) : awards.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-gray-400 text-lg">No awards available yet.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 lg:gap-x-16 lg:gap-y-24">
            {awards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer flex flex-col"
                onClick={() => openLightbox(index)}
              >
                {/* Images Duo Container */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {/* Award Image */}
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-700">
                    <Image
                      src={award.awardImageUrl}
                      alt={`${award.title} - Certificate`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-[8px] uppercase tracking-widest font-bold text-black border border-black/5">
                      Certificate
                    </div>
                  </div>
                  
                  {/* Receiving Image */}
                  <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-700 mt-8 md:mt-12 group-hover:mt-4 transition-all duration-700">
                    <Image
                      src={award.receivingImageUrl}
                      alt={`${award.title} - Occasion`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm text-[8px] uppercase tracking-widest font-bold text-black border border-black/5">
                      The Occasion
                    </div>
                  </div>
                </div>

                {/* Award Details */}
                <div className="flex flex-col mt-auto pt-4 border-t border-gray-100">
                  <h3 className="text-2xl md:text-3xl font-medium text-black tracking-tight mb-4 group-hover:text-gray-600 transition-colors duration-300">
                    {award.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-black/40 group-hover:text-black transition-colors duration-300">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">View Gallery</span>
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
        {selectedAward !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 p-3 text-white hover:bg-white/10 rounded-full transition-colors z-50"
            >
              <LuX className="w-8 h-8" />
            </button>

            {/* Nav */}
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-8 p-4 text-white hover:bg-white/10 rounded-full transition-all z-20 hidden md:block"
            >
              <LuChevronLeft className="w-10 h-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-8 p-4 text-white hover:bg-white/10 rounded-full transition-all z-20 hidden md:block"
            >
              <LuChevronRight className="w-10 h-10" />
            </button>

            {/* Content Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full h-full max-w-7xl flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-8 md:gap-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 w-full h-full relative flex flex-col items-center justify-center space-y-8 overflow-y-auto custom-scrollbar">
                
                <h3 className="text-2xl md:text-5xl font-light text-white text-center tracking-tight mb-4 md:mb-12">
                  {awards[selectedAward].title}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 w-full">
                  <div className="group relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm bg-white/5">
                    <Image
                      src={awards[selectedAward].awardImageUrl}
                      alt="Award Certificate"
                      fill
                      className="object-contain p-2"
                    />
                    <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-white/40 bg-black/40 px-2 py-1 rounded">The Award</div>
                  </div>
                  <div className="group relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-sm bg-white/5">
                    <Image
                      src={awards[selectedAward].receivingImageUrl}
                      alt="Receiving Award"
                      fill
                      className="object-contain p-2"
                    />
                    <div className="absolute bottom-4 left-4 text-[10px] uppercase tracking-widest text-white/40 bg-black/40 px-2 py-1 rounded">The Occasion</div>
                  </div>
                </div>

                <div className="flex items-center gap-6 mt-12 md:hidden">
                    <button onClick={goToPrevious} className="p-4 bg-white/5 rounded-full"><LuChevronLeft className="w-6 h-6 text-white" /></button>
                    <span className="text-white/40 text-sm">{selectedAward + 1} / {awards.length}</span>
                    <button onClick={goToNext} className="p-4 bg-white/5 rounded-full"><LuChevronRight className="w-6 h-6 text-white" /></button>
                </div>
              </div>
            </motion.div>

            {/* Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-[0.3em] font-light hidden md:block">
              CERTIFICATE {selectedAward + 1} OF {awards.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
