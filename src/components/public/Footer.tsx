"use client";

import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Artist Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-3">
            Nasir Shehzad
          </h2>
          
          {/* Artist Specialty */}
          <p className="text-xs md:text-sm text-gray-400 font-medium tracking-wider uppercase mb-4">
            Visual Artist
          </p>

          {/* Contact Info */}
          <div className="space-y-1 text-xs md:text-sm text-gray-400">
            <p>
              <a href="mailto:strokesbynasirshehzad@gmail.com" className="hover:text-white transition-colors">
                strokesbynasirshehzad@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+923008554243" className="hover:text-white transition-colors">
                +92 300 8554243
              </a>
            </p>
          </div>
        </motion.div>

        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-sm text-gray-400">
            © {currentYear} Nasir Shehzad. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
