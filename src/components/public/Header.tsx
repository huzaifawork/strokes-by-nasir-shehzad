"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { LuLock, LuLockOpen } from 'react-icons/lu';
import MobileMenu from './MobileMenu';

const navigationLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Gallery', href: '#gallery' },
  { name: 'Exhibitions', href: '#exhibitions' },
  { name: 'Residencies', href: '#residencies' },
];

export default function Header() {
  const [isLockHovered, setIsLockHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-ash-100/90 backdrop-blur-lg border-b border-ash-200/60 shadow-sm">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative flex items-center h-16 lg:h-24">
            
            {/* Left Side - Hamburger (Mobile) & Contact/Lock (Desktop) */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button - Moved to start for mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-black hover:text-gray-600 transition-colors"
                aria-label="Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              {/* Contact Button */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="hidden lg:flex items-center px-8 py-3 text-[13px] font-normal tracking-wider bg-black text-white rounded-full transition-all duration-300 hover:bg-gray-800 uppercase"
              >
                Contact
              </motion.a>

              {/* Lock Icon - Admin Access (Hidden on Mobile) */}
              <div className="hidden lg:block">
                <Link href="/login">
                  <motion.button
                    onHoverStart={() => setIsLockHovered(true)}
                    onHoverEnd={() => setIsLockHovered(false)}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative p-3.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 group"
                    aria-label="Admin Login"
                  >
                    <motion.div
                      animate={{ rotate: isLockHovered ? [0, -8, 8, -8, 0] : 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                      {isLockHovered ? (
                        <LuLockOpen className="w-5 h-5 text-black" />
                      ) : (
                        <LuLock className="w-5 h-5 text-gray-600" />
                      )}
                    </motion.div>
                    
                    {/* Tooltip */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ 
                        opacity: isLockHovered ? 1 : 0, 
                        y: isLockHovered ? 0 : 8 
                      }}
                      transition={{ duration: 0.2 }}
                      className="absolute -bottom-11 left-0 px-3 py-1.5 bg-black text-white text-[11px] font-light rounded-md whitespace-nowrap pointer-events-none tracking-wide"
                    >
                      Admin Access
                    </motion.div>
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Center - Navigation Links */}
            <nav className="hidden lg:flex items-center justify-center space-x-10 absolute left-1/2 -translate-x-1/2">
              {navigationLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-[13px] font-light tracking-wider text-gray-600 transition-colors duration-300 hover:text-black group uppercase"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Logo - Positioned to emerge from corner */}
        <Link href="/" className="absolute -right-4 lg:-right-4 top-0 group overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-52 h-24 lg:w-72 lg:h-36"
          >
            <Image
              src="/strokesbynasirlogo1.png"
              alt="Nasir Shehzad - Artist"
              fill
              className="object-contain object-right-top"
              priority
            />
          </motion.div>
        </Link>
      </header>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
