'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProductCard from '../components/ProductCard';
import FilterSidebar from '../components/FilterSidebar';
import Auth from '../auth';

export default function PartsPage() {
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [pageCount, setPageCount] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [brands, setBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
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

    // fetch("https://admin.mortorelite.com/api/products/?page=1")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProducts(Object.values(data.results));
    //     if (data.results.length > 0) {
    //       const maxPriceRange = Math.max(...data.results.map((p: any) => p.price));
    //       setPriceRange([0, maxPriceRange]);
    //       setMaxPrice(maxPriceRange);
    //       setPageCount(Math.ceil(data.count / 20));
    //     }
    //   })
    //   .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [showOnSale, setShowOnSale] = useState(false);
  const [showInStock, setShowInStock] = useState(false);

  // const filteredProducts = products.filter(product => {
  //   if (selectedCategory !== 'All' && product.category.name !== selectedCategory) return false;
  //   if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand.name)) return false;
  //   if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
  //   if (showOnSale && !product.compare_price) return false;
  //   if (showInStock && !product.in_stock) return false;
  //   return true;
  // });

  const filteredProducts = async (): Promise<any[]> => {
    try {
      await Auth(true);
      const access_token = Cookies.get("access");
      const params = new URLSearchParams();
  
      if (selectedCategory !== "All") {
        params.append("category__name__icontains", selectedCategory);
      }
      if (selectedBrands.length > 0) {
        params.append("brands", selectedBrands.join(","));
      }
      if (showInStock) {
        params.append("in_stock", "true");
      }
      params.append("price__gte", priceRange[0].toString());
      params.append("price__lte", priceRange[1].toString());
      params.append("page", page.toString());
  
      const queries = params.toString();
  
      const res = await fetch(
        "https://admin.mortorelite.com/api/products/?" + queries,
        {
          headers: {
            ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
          },
        }
      );
  
      const data = await res.json();
  
      setProducts(Object.values(data.results));
      setPageCount(Math.ceil(data.count / 20));
  
      if (data.results.length > 0) {
        const maxPriceRange = Math.max(...data.results.map((p: any) => p.price));
        setMaxPrice(maxPriceRange);
  
        if (maxPriceRange < priceRange[1]) {
          setPriceRange([priceRange[0], maxPriceRange]);
        }
      }
  
      return Object.values(data.results);
    } catch (err) {
      console.error("Error fetching products:", err);
      return [];
    }
  };  

  useEffect(() => {
    filteredProducts();
  }, [selectedBrands, selectedCategory, showInStock, showOnSale, priceRange, page]);

  const sortedProducts = [...products].sort((a, b) => {
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
              maxPrice={maxPrice}
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
                      {/* Prev Button */}
                      <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <i className="ri-arrow-left-s-line"></i>
                      </button>

                      {/* Page Numbers */}
                      {Array.from({ length: pageCount }, (_, i) => i + 1).map((i) => (
                        <button
                          key={i}
                          onClick={() => setPage(i)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${i === page
                              ? "bg-blue-50 text-blue-600 border-gray-300"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                            }`}
                        >
                          {i}
                        </button>
                      ))}

                      {/* Next Button */}
                      <button
                        onClick={() => setPage(page + 1)}
                        disabled={page === pageCount}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
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