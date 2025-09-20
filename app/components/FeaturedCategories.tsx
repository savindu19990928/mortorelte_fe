
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  
  useEffect(() => {
    fetch("https://admin.mortorelite.com/api/categories/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.results.map((b: any) => b));
      })
      .catch((err) => console.error("Error fetching catagories:", err));
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the exact parts you need for your vehicle. Browse our comprehensive categories of premium auto parts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 6).map((category, index) => (
            <Link key={index} href={`/parts?category=${encodeURIComponent(category.name)}`} className="group cursor-pointer">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  {/* <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                      <i className={`${category.icon} text-blue-600 text-xl`}></i>
                    </div>
                  </div> */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{category.products_count} {category.products_count !== 1? 'parts' : 'part'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
