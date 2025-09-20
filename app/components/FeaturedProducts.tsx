'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FeaturedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    fetch("https://admin.mortorelite.com/api/products/?featured=true")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.results.map((b: any) => b));
      })
      .catch((err) => console.error("Error fetching catagories:", err))
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          {/* Spinner */}
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

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
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
              {/* Image */}
              <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                <img
                  src={product.primary_image.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {product.compare_price && (
                    <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
                      -20%
                    </span>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Link href={`/parts/${product.slug}`} className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                    <i className="ri-eye-line text-gray-600"></i>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-blue-600 font-medium">{product.brand.name}</span>
                  <p className="text-xs text-gray-500 mt-1">{product.category.name}</p>
                </div>
                
                <Link href={`/parts/${product.slug}`}>
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
                        className={`ri-star${i < Math.floor(product.average_rating) ? '-fill' : '-line'} text-yellow-400 text-sm`}
                      ></i>
                    ))}
                  </div>
                  <span className="ml-2 text-xs text-gray-500">({product.reviews_count})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900">${product.price}</span>
                    {product.compare_price && (
                      <span className="text-sm text-gray-500 line-through">${product.compare_price}</span>
                    )}
                  </div>
                </div>
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