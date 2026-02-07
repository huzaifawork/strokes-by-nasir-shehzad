"use client";

import ProtectedRoute from '@/components/admin/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { LuImage, LuCalendar, LuMapPin, LuArrowRight } from 'react-icons/lu';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">Dashboard</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-8 sm:mb-10">Manage your portfolio content</p>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Link 
                href="/admin/gallery" 
                className="group bg-white p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 block"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <LuImage className="w-6 h-6 text-blue-600" />
                  </div>
                  <LuArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-1">Gallery</h3>
                <p className="text-sm text-gray-500">Manage artworks</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link 
                href="/admin/exhibitions" 
                className="group bg-white p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 block"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                    <LuCalendar className="w-6 h-6 text-green-600" />
                  </div>
                  <LuArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-1">Exhibitions</h3>
                <p className="text-sm text-gray-500">Manage exhibitions</p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link 
                href="/admin/residencies" 
                className="group bg-white p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition-all border border-gray-100 block sm:col-span-2 lg:col-span-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                    <LuMapPin className="w-6 h-6 text-purple-600" />
                  </div>
                  <LuArrowRight className="w-5 h-5 text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-1">Residencies</h3>
                <p className="text-sm text-gray-500">Manage residencies</p>
              </Link>
            </motion.div>
          </div>

          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-black mb-3">Welcome to your Admin Panel</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Use the navigation menu to manage different sections of your portfolio. 
              You can add, edit, and delete items from the Gallery, Exhibitions, and Residencies sections.
            </p>
          </motion.div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
