"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-ash-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          
          {/* Left Side - Text Content (Hidden on mobile initially, shown after scroll) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 text-center lg:text-left"
          >
            {/* Name */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-4 md:mb-6"
              >
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-gray-900"
                >
                  Nasir
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-semibold text-gray-900"
                >
                  Shehzad
                </motion.span>
              </motion.h1>
            </div>

            {/* Divider Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="h-[1px] bg-black/20 mb-4 md:mb-6 lg:max-w-md"
            />

            {/* Artist Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
              className="space-y-2"
            >
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 font-medium tracking-wide uppercase">
                Visual Artist
              </p>
            </motion.div>

            {/* Quote or Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
              className="mt-8 md:mt-12 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-normal leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              "Creating visual narratives that transcend the boundaries of conventional art"
            </motion.p>
          </motion.div>

          {/* Right Side - Artist Image (Takes full screen on mobile) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 relative pt-20 lg:pt-8 lg:mt-8"
          >
            <div className="relative aspect-[3/4] w-full max-w-sm sm:max-w-sm md:max-w-md lg:max-w-sm mx-auto">
              {/* Background Accent */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute -right-4 -bottom-4 w-full h-full bg-gray-200 -z-10"
              />
              
              {/* Artist Image */}
              <div className="relative w-full h-full overflow-hidden shadow-2xl group">
                <Image
                  src="/NASIRSHAHZAD.jpeg"
                  alt="Nasir Shehzad - Artist"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  priority
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on Mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-gray-400 uppercase tracking-wider">Scroll</span>
          <svg 
            className="w-5 h-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
