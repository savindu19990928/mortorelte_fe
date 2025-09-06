
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 cursor-pointer">
              <img 
                src="https://static.readdy.ai/image/7287dcd8714649f87b3169e43a183267/e259380cbb3e9d709b7a736eec0aab34.png" 
                alt="Motor Elite Logo" 
                className="h-8 w-8 object-contain"
              />
              <span className="font-bold text-xl text-gray-900">Motor Elite</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/parts" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">Parts</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">Contact</Link>
            </nav>

            {/* Desktop Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-search-line text-gray-400 text-base"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search auto parts..."
                  className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search Icon */}
              <button 
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-search-line"></i>
                </div>
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-heart-line"></i>
                </div>
                <span className="hidden lg:block text-sm font-medium">Wishlist</span>
              </Link>

              {/* Account */}
              <Link href="/account" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-user-line"></i>
                </div>
                <span className="hidden sm:block text-sm font-medium">Account</span>
              </Link>

              {/* Cart */}
              <Link href="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 relative cursor-pointer transition-colors">
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-shopping-cart-line"></i>
                </div>
                <span className="hidden sm:block text-sm font-medium">Cart</span>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </Link>

              {/* Mobile Menu */}
              <button 
                className="md:hidden p-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <i className="ri-menu-line"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <img 
              src="https://static.readdy.ai/image/7287dcd8714649f87b3169e43a183267/e259380cbb3e9d709b7a736eec0aab34.png" 
              alt="Motor Elite Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-xl text-gray-900">Motor Elite</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/parts" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">Parts</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">Contact</Link>
          </nav>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400 text-base"></i>
              </div>
              <input
                type="text"
                placeholder="Search auto parts..."
                className="w-full pl-9 pr-4 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Icon */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-search-line"></i>
              </div>
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-heart-line"></i>
              </div>
              <span className="hidden lg:block text-sm font-medium">Wishlist</span>
            </Link>

            {/* Account */}
            <Link href="/account" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-user-line"></i>
              </div>
              <span className="hidden sm:block text-sm font-medium">Account</span>
            </Link>

            {/* Cart */}
            <Link href="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 relative cursor-pointer transition-colors">
              <div className="w-5 h-5 flex items-center justify-center">
                <i className="ri-shopping-cart-line"></i>
              </div>
              <span className="hidden sm:block text-sm font-medium">Cart</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </Link>

            {/* Mobile Menu */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - appears below header when icon is clicked */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400 text-base"></i>
              </div>
              <input
                type="text"
                placeholder="Search auto parts..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <nav className="flex flex-col space-y-4">
              <Link href="/parts" className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors">Parts</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer">Contact</Link>
              <Link href="/wishlist" className="sm:hidden text-gray-700 hover:text-blue-600 font-medium cursor-pointer transition-colors">Wishlist</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
