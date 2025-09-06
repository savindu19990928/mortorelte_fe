
'use client';

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  selectedCategory: string;
  selectedBrands: string[];
  onCategoryChange: (category: string) => void;
  onBrandChange: (brands: string[]) => void;
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  showOnSale: boolean;
  onShowOnSaleChange: (show: boolean) => void;
  showInStock: boolean;
  onShowInStockChange: (show: boolean) => void;
}

export default function FilterSidebar({
  categories,
  brands,
  selectedCategory,
  selectedBrands,
  onCategoryChange,
  onBrandChange,
  priceRange,
  onPriceRangeChange,
  showOnSale,
  onShowOnSaleChange,
  showInStock,
  onShowInStockChange
}: FilterSidebarProps) {
  const handleBrandToggle = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      onBrandChange(selectedBrands.filter(b => b !== brand));
    } else {
      onBrandChange([...selectedBrands, brand]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value="All"
              checked={selectedCategory === 'All'}
              onChange={() => onCategoryChange('All')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => onCategoryChange(category)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Brands</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min</label>
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => onPriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                min="0"
                max="500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max</label>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value) || 500])}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                min="0"
                max="500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Offers */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Special Offers</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showOnSale}
              onChange={(e) => onShowOnSaleChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">On Sale</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showInStock}
              onChange={(e) => onShowInStockChange(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-700">In Stock Only</span>
          </label>
        </div>
      </div>

      {/* Clear Filters */}
      <button 
        onClick={() => {
          onCategoryChange('All');
          onBrandChange([]);
          onPriceRangeChange([0, 500]);
          onShowOnSaleChange(false);
          onShowInStockChange(false);
        }}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
      >
        Clear All Filters
      </button>
    </div>
  );
}