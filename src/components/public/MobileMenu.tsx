"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LuX } from 'react-icons/lu';

const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Exhibitions', href: '#exhibitions' },
  { name: 'Residencies', href: '#residencies' },
  { name: 'Awards', href: '#awards' },
];

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          />

          {/* Menu Panel - Ash White Theme */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[88%] max-w-md bg-white rounded-2xl shadow-2xl z-50 lg:hidden overflow-hidden border border-gray-200"
          >
            {/* Header: Logo & Close */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div className="relative w-32 h-11">
                <Image
                  src="/STROKESBYNASIRLOGO1.png"
                  alt="Strokes by Nasir"
                  fill
                  className="object-contain object-left"
                />
              </div>
              
              <button
                onClick={onClose}
                className="p-2 text-gray-600 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                aria-label="Close menu"
              >
                <LuX className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col items-center py-10 space-y-5">
              {navigationLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="text-xl font-light tracking-wide text-gray-700 hover:text-black transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Admin Link */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="pt-1"
              >
                <Link
                  href="/login"
                  onClick={onClose}
                  className="text-sm font-light text-gray-400 hover:text-gray-600 transition-colors"
                >
                  Admin
                </Link>
              </motion.div>
            </nav>

            {/* Contact Button */}
            <div className="px-6 pb-6 pt-2">
              <motion.a
                href="#contact"
                onClick={onClose}
                whileTap={{ scale: 0.98 }}
                className="block w-full py-4 text-center text-sm font-medium tracking-wider bg-black text-white rounded-full hover:bg-gray-800 transition-all shadow-sm"
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
