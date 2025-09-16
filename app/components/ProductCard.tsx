
'use client';

import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: any;
  price: number;
  compare_price?: number;
  average_rating: number;
  reviews_count: number;
  primary_image?: any;
  brand: any;
  in_stock: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const discount = product.compare_price ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100) : 0;

  return (
    <div className="group relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
        {product.primary_image &&
          <img
            src={product.primary_image.image}
            alt={product.name}
            className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
          />
        }
        {!product.primary_image &&
          <img
            src={'https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-blank-avatar-modern-vector-png-image_40962406.jpg'}
            alt={product.name}
            className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
          />
        }
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.compare_price && (
            <span className="bg-red-500 text-white px-2 py-1 text-xs font-medium rounded">
              -{Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}%
            </span>
          )}
          {!product.in_stock && (
            <span className="bg-gray-500 text-white px-2 py-1 text-xs font-medium rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 cursor-pointer">
            <i className="ri-heart-line text-gray-600 hover:text-red-500"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <span className="text-xs text-blue-600 font-medium">{product.brand.name}</span>
          <p className="text-xs text-gray-500 mt-1">{product.category.name}</p>
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

        {/* Add to Cart */}
        <button
          disabled={!product.in_stock}
          className="mt-3 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
        >
          {product.in_stock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
