
'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" className="text-2xl font-['Pacifico'] mb-4 block">
              Motor Elite
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted source for quality automotive parts and accessories. We've been serving car enthusiasts and professionals for over 25 years.
            </p>
            <div className="flex space-x-4 mt-6">
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-facebook-fill text-xl text-gray-300 hover:text-white cursor-pointer"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-twitter-fill text-xl text-gray-300 hover:text-white cursor-pointer"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-instagram-line text-xl text-gray-300 hover:text-white cursor-pointer"></i>
              </div>
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-youtube-fill text-xl text-gray-300 hover:text-white cursor-pointer"></i>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/parts" className="text-gray-300 hover:text-white text-sm">All Parts</Link></li>
              <li><Link href="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white text-sm">Contact</Link></li>
              <li><Link href="/account" className="text-gray-300 hover:text-white text-sm">My Account</Link></li>
              <li><Link href="/wishlist" className="text-gray-300 hover:text-white text-sm">Wishlist</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Engine Parts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Brakes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Suspension</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Electrical</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white text-sm">Body Parts</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/contact" className="text-gray-300 hover:text-white text-sm">Contact Us</Link></li>
              <li><Link href="/shipping" className="text-gray-300 hover:text-white text-sm">Shipping Info</Link></li>
              <li><Link href="/returns" className="text-gray-300 hover:text-white text-sm">Returns & Exchanges</Link></li>
              <li><Link href="/warranty" className="text-gray-300 hover:text-white text-sm">Warranty</Link></li>
              <li><Link href="/faq" className="text-gray-300 hover:text-white text-sm">FAQ</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Motor Elite. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
