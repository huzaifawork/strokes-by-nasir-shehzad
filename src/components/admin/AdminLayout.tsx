"use client";

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { LuHouse, LuImage, LuCalendar, LuMapPin, LuLogOut, LuMenu, LuX, LuAward } from 'react-icons/lu';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LuHouse },
  { name: 'Gallery', href: '/admin/gallery', icon: LuImage },
  { name: 'Exhibitions', href: '/admin/exhibitions', icon: LuCalendar },
  { name: 'Residencies', href: '/admin/residencies', icon: LuMapPin },
  { name: 'Awards', href: '/admin/awards', icon: LuAward },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ash-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {mobileMenuOpen ? (
              <LuX className="w-6 h-6 text-black" />
            ) : (
              <LuMenu className="w-6 h-6 text-black" />
            )}
          </button>
          <div className="relative w-28 h-10">
            <Image
              src="/STROKESBYNASIRLOGO1.png"
              alt="Strokes by Nasir"
              fill
              className="object-contain object-left"
            />
          </div>
        </div>
        <button
          onClick={signOut}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LuLogOut className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-black text-white p-6 flex-col z-50">
        {/* Logo/Brand */}
        <div className="mb-10">
          <div className="relative w-40 h-16 mb-4">
            <Image
              src="/STROKESBYNASIRLOGO1.png"
              alt="Strokes by Nasir"
              fill
              className="object-contain object-left brightness-0 invert"
            />
          </div>
          <h1 className="text-xl font-semibold">Admin Panel</h1>
          <p className="text-sm text-gray-400 mt-1">Portfolio Management</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-white text-black'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="border-t border-gray-800 pt-4">
          <div className="px-4 py-2 mb-2">
            <p className="text-xs text-gray-400">Signed in as</p>
            <p className="text-sm text-white break-words overflow-wrap-anywhere">{user?.email}</p>
          </div>
          <button
            onClick={signOut}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all"
          >
            <LuLogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setMobileMenuOpen(false)}>
          <aside
            className="fixed left-0 top-0 bottom-0 w-64 bg-black text-white p-6 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo/Brand */}
            <div className="mb-8 mt-16">
              <h1 className="text-xl font-semibold">Admin Panel</h1>
              <p className="text-sm text-gray-400 mt-1">Portfolio Management</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-white text-black'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="border-t border-gray-800 pt-4">
              <div className="px-4 py-2">
                <p className="text-xs text-gray-400">Signed in as</p>
                <p className="text-sm text-white break-words overflow-wrap-anywhere">{user?.email}</p>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:ml-64 pt-16 lg:pt-0 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
