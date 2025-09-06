'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';

const wishlistItems = [
  {
    id: 1,
    name: 'Premium Brake Pad Set',
    brand: 'Brembo',
    price: 89.99,
    originalPrice: 119.99,
    image: 'https://readdy.ai/api/search-image?query=high-quality%20automotive%20brake%20pads%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20premium%20brake%20pad%20components%2C%20detailed%20automotive%20brake%20system%20parts&width=200&height=200&seq=wish1&orientation=squarish',
    inStock: true
  },
  {
    id: 2,
    name: 'LED Headlight Bulbs',
    brand: 'Philips',
    price: 129.99,
    originalPrice: 159.99,
    image: 'https://readdy.ai/api/search-image?query=automotive%20LED%20headlight%20bulbs%20set%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20modern%20car%20lighting%20components%2C%20LED%20automotive%20bulbs&width=200&height=200&seq=wish2&orientation=squarish',
    inStock: true
  },
  {
    id: 3,
    name: 'Shock Absorber Set',
    brand: 'Monroe',
    price: 189.99,
    originalPrice: 229.99,
    image: 'https://readdy.ai/api/search-image?query=automotive%20shock%20absorber%20struts%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20car%20suspension%20components%2C%20shock%20absorber%20parts&width=200&height=200&seq=wish3&orientation=squarish',
    inStock: false
  }
];

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Save your favorite parts for later</p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Image */}
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover object-top"
                  />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                    <i className="ri-heart-fill text-red-500"></i>
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-blue-600 font-medium">{item.brand}</span>
                  </div>
                  
                  <Link href={`/parts/${item.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2 cursor-pointer mb-3">
                      {item.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button 
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                        item.inStock 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!item.inStock}
                    >
                      Add to Cart
                    </button>
                    <button className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                      <i className="ri-delete-bin-line text-gray-500"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-heart-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding items you love to your wishlist</p>
            <Link 
              href="/parts" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Browse Parts
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}