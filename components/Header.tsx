'use client';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Auth from '../app/auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    Auth();
    const user = Cookies.get('refresh');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  if (!isMounted) return null;

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 cursor-pointer">
            <img
              src="/images/logo.png"
              alt="Motor Elite Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-xl text-gray-900">Motor Elite</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/parts" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Parts</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</Link>
          </nav>

          {/* Desktop Search */}
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
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className="ri-search-line"></i>
            </button>

            {/* ✅ If logged in → Wishlist + Account + Cart */}
            {isLoggedIn ? (
              <>
                {/* Wishlist */}
                <Link href="/wishlist" className="hidden sm:flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <i className="ri-heart-line"></i>
                  <span className="hidden lg:block text-sm font-medium">Wishlist</span>
                </Link>

                {/* Account */}
                <Link href="/account" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600">
                  <i className="ri-user-line"></i>
                  <span className="hidden sm:block text-sm font-medium">Account</span>
                </Link>

                {/* Cart */}
                <Link href="/cart" className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 relative">
                  <i className="ri-shopping-cart-line"></i>
                  <span className="hidden sm:block text-sm font-medium">Cart</span>
                  {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span> */}
                </Link>
              </>
            ) : (
              /* If not logged in → Show only Login */
              <Link href="/auth/login" className="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors">
                Login
              </Link>
            )}

            {/* Mobile Menu */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <i className={isMenuOpen ? 'ri-close-line' : 'ri-menu-line'}></i>
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {isSearchOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="ri-search-line text-gray-400 text-base"></i>
              </div>
              <input
                type="text"
                placeholder="Search auto parts..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <nav className="flex flex-col space-y-4">
              <Link href="/parts" className="text-gray-700 hover:text-blue-600 font-medium">Parts</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">About</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">Contact</Link>

              {/* ✅ Only show Wishlist link in mobile if logged in */}
              {isLoggedIn && (
                <Link href="/wishlist" className="sm:hidden text-gray-700 hover:text-blue-600 font-medium">Wishlist</Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
