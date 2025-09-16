'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';

const products = [
  {
    id: 1,
    name: 'Premium Brake Pads Set',
    category: 'Brake System',
    price: 89.99,
    originalPrice: 109.99,
    rating: 4.8,
    reviews: 156,
    image: 'https://readdy.ai/api/search-image?query=Premium%20automotive%20brake%20pads%20set%20with%20modern%20packaging%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20high%20quality%20auto%20parts%2C%20detailed%20view%20showing%20brake%20pad%20material%20and%20construction&width=300&height=300&seq=bp1&orientation=squarish',
    brand: 'BrakeMaster',
    inStock: true,
    isOnSale: true
  },
  {
    id: 2,
    name: 'High Performance Air Filter',
    category: 'Engine Parts',
    price: 45.99,
    rating: 4.7,
    reviews: 89,
    image: 'https://readdy.ai/api/search-image?query=High%20performance%20automotive%20air%20filter%20with%20clean%20white%20background%2C%20professional%20product%20photography%2C%20engine%20air%20filter%20with%20pleated%20design%2C%20quality%20auto%20parts&width=300&height=300&seq=af1&orientation=squarish',
    brand: 'AirFlow Pro',
    inStock: true,
    isOnSale: false
  },
  {
    id: 3,
    name: 'LED Headlight Bulbs H7',
    category: 'Electrical',
    price: 129.99,
    rating: 4.9,
    reviews: 234,
    image: 'https://readdy.ai/api/search-image?query=LED%20automotive%20headlight%20bulbs%20H7%20type%20with%20modern%20packaging%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20bright%20LED%20car%20lights%2C%20premium%20auto%20electrical%20parts&width=300&height=300&seq=led1&orientation=squarish',
    brand: 'BrightBeam',
    inStock: true,
    isOnSale: false
  },
  {
    id: 4,
    name: 'Shock Absorber Front Pair',
    category: 'Suspension',
    price: 189.99,
    originalPrice: 229.99,
    rating: 4.6,
    reviews: 78,
    image: 'https://readdy.ai/api/search-image?query=Automotive%20shock%20absorbers%20front%20pair%20with%20clean%20white%20background%2C%20professional%20product%20photography%2C%20suspension%20parts%20for%20cars%2C%20quality%20auto%20parts%20with%20detailed%20metallic%20finish&width=300&height=300&seq=shock1&orientation=squarish',
    brand: 'SmoothRide',
    inStock: true,
    isOnSale: true
  },
  {
    id: 5,
    name: 'Engine Oil Filter Premium',
    category: 'Engine Parts',
    price: 24.99,
    rating: 4.5,
    reviews: 145,
    image: 'https://readdy.ai/api/search-image?query=Premium%20automotive%20engine%20oil%20filter%20with%20clean%20white%20background%2C%20professional%20product%20photography%2C%20cylindrical%20oil%20filter%20with%20quality%20construction%2C%20auto%20maintenance%20parts&width=300&height=300&seq=of1&orientation=squarish',
    brand: 'FilterPro',
    inStock: true,
    isOnSale: false
  },
  {
    id: 6,
    name: 'Ceramic Brake Rotors Set',
    category: 'Brake System',
    price: 259.99,
    rating: 4.8,
    reviews: 92,
    image: 'https://readdy.ai/api/search-image?query=Ceramic%20automotive%20brake%20rotors%20set%20with%20clean%20white%20background%2C%20professional%20product%20photography%2C%20high%20performance%20brake%20discs%20with%20detailed%20metallic%20surface%2C%20premium%20auto%20parts&width=300&height=300&seq=br1&orientation=squarish',
    brand: 'CeramicStop',
    inStock: false,
    isOnSale: false
  },
  {
    id: 7,
    name: 'Transmission Fluid ATF',
    category: 'Transmission',
    price: 34.99,
    rating: 4.4,
    reviews: 67,
    image: 'https://readdy.ai/api/search-image?query=Automotive%20transmission%20fluid%20ATF%20bottle%20with%20clean%20white%20background%2C%20professional%20product%20photography%2C%20red%20transmission%20oil%20container%2C%20quality%20auto%20fluids%20and%20lubricants&width=300&height=300&seq=tf1&orientation=squarish',
    brand: 'FluidMax',
    inStock: true,
    isOnSale: false
  },
  {
    id: 8,
    name: 'Performance Exhaust Muffler',
    category: 'Exhaust System',
    price: 149.99,
    originalPrice: 179.99,
    rating: 4.7,
    reviews: 103,
    image: 'https://readdy.ai/api/search-image?query=Performance%20automotive%20exhaust%20muffler%20with%20clean%20white%20background%2C%20professional%20product%20photography%2C%20stainless%20steel%20exhaust%20component%20with%20polished%20finish%2C%20quality%20auto%20parts&width=300&height=300&seq=ex1&orientation=squarish',
    brand: 'PowerFlow',
    inStock: true,
    isOnSale: true
  }
];

export default function PartsPage() {
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  useEffect(() => {
    fetch("https://admin.mortorelite.com/api/brands/")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.results.map((b: any) => b.name));
      })
      .catch((err) => console.error("Error fetching brands:", err));

    fetch("https://admin.mortorelite.com/api/categories/")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.results.map((b: any) => b.name));
      })
      .catch((err) => console.error("Error fetching catagories:", err));
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [showOnSale, setShowOnSale] = useState(false);
  const [showInStock, setShowInStock] = useState(false);

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'All' && product.category !== selectedCategory) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
    if (showOnSale && !product.isOnSale) return false;
    if (showInStock && !product.inStock) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">Auto Parts</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <FilterSidebar
              categories={categories}
              brands={brands}
              selectedCategory={selectedCategory}
              selectedBrands={selectedBrands}
              onCategoryChange={setSelectedCategory}
              onBrandChange={setSelectedBrands}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              showOnSale={showOnSale}
              onShowOnSaleChange={setShowOnSale}
              showInStock={showInStock}
              onShowInStockChange={setShowInStock}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Auto Parts</h1>
                <p className="mt-2 text-gray-600">
                  Showing {sortedProducts.length} of {products.length} products
                  {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                  {selectedBrands.length > 0 && ` from ${selectedBrands.join(', ')}`}
                </p>
              </div>

              <div className="mt-4 sm:mt-0">
                <label htmlFor="sort" className="sr-only">Sort by</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-product-shop>
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <i className="ri-search-line text-gray-400 text-3xl"></i>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedProducts.length}</span> of{' '}
                      <span className="font-medium">{products.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <i className="ri-arrow-left-s-line"></i>
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        2
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                        3
                      </button>
                      <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <i className="ri-arrow-right-s-line"></i>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}