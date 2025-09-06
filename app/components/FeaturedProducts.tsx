'use client';

import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Premium Brake Pad Set',
    brand: 'Brembo',
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.8,
    reviews: 127,
    image: 'https://readdy.ai/api/search-image?query=high-quality%20automotive%20brake%20pads%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20premium%20brake%20pad%20components%2C%20detailed%20automotive%20brake%20system%20parts&width=300&height=300&seq=prod1&orientation=squarish',
    badge: 'Best Seller',
    inStock: true
  },
  {
    id: 2,
    name: 'High Performance Air Filter',
    brand: 'K&N',
    price: 45.99,
    originalPrice: null,
    rating: 4.9,
    reviews: 89,
    image: 'https://readdy.ai/api/search-image?query=automotive%20high-performance%20air%20filter%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20car%20air%20filter%20component%2C%20automotive%20filtration%20system%20parts&width=300&height=300&seq=prod2&orientation=squarish',
    badge: 'New Arrival',
    inStock: true
  },
  {
    id: 3,
    name: 'LED Headlight Bulbs',
    brand: 'Philips',
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.7,
    reviews: 203,
    image: 'https://readdy.ai/api/search-image?query=automotive%20LED%20headlight%20bulbs%20set%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20modern%20car%20lighting%20components%2C%20LED%20automotive%20bulbs&width=300&height=300&seq=prod3&orientation=squarish',
    badge: 'Sale',
    inStock: true
  },
  {
    id: 4,
    name: 'Engine Oil Filter',
    brand: 'Mobil 1',
    price: 12.99,
    originalPrice: null,
    rating: 4.6,
    reviews: 456,
    image: 'https://readdy.ai/api/search-image?query=automotive%20engine%20oil%20filter%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20car%20oil%20filter%20component%2C%20automotive%20maintenance%20parts&width=300&height=300&seq=prod4&orientation=squarish',
    badge: null,
    inStock: true
  },
  {
    id: 5,
    name: 'Shock Absorber Set',
    brand: 'Monroe',
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.5,
    reviews: 78,
    image: 'https://readdy.ai/api/search-image?query=automotive%20shock%20absorber%20struts%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20car%20suspension%20components%2C%20shock%20absorber%20parts&width=300&height=300&seq=prod5&orientation=squarish',
    badge: 'Featured',
    inStock: false
  },
  {
    id: 6,
    name: 'Spark Plug Set',
    brand: 'NGK',
    price: 32.99,
    originalPrice: null,
    rating: 4.8,
    reviews: 312,
    image: 'https://readdy.ai/api/search-image?query=automotive%20spark%20plugs%20set%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20car%20ignition%20system%20components%2C%20spark%20plug%20parts&width=300&height=300&seq=prod6&orientation=squarish',
    badge: null,
    inStock: true
  }
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white" data-product-shop>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular auto parts, trusted by mechanics and car enthusiasts worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-product-shop>
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              {/* Image */}
              <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {product.originalPrice && (
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                      -20%
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                    <i className="ri-heart-line text-gray-600 hover:text-red-500"></i>
                  </button>
                  <Link href={`/parts/${product.id}`} className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                    <i className="ri-eye-line text-gray-600"></i>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-blue-600 font-medium">{product.brand}</span>
                  <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                </div>
                
                <Link href={`/parts/${product.id}`}>
                  <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2 cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`ri-star${i < Math.floor(product.rating) ? '-fill' : '-line'} text-yellow-400 text-sm`}
                      ></i>
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Add to Cart */}
                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/parts" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            View All Products
            <div className="ml-2 w-5 h-5 flex items-center justify-center">
              <i className="ri-arrow-right-line"></i>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}