import React, { useState } from 'react';
import { ShoppingCart, Search, Leaf } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Filters } from './components/Filters';
import { Cart } from './components/Cart';
import { CartProvider } from './context/CartContext';
import { Product, FilterState } from './types';

// Extended product data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Bamboo Water Bottle',
    description: 'Sustainable bamboo water bottle with zero plastic',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
    carbonFootprint: 2.5,
    recyclable: true,
    certifications: ['FSC Certified', 'Carbon Neutral'],
    sustainablePackaging: true,
    category: 'Kitchen',
    rating: 4.5,
    priceId: 'price_H5ggYwtDq5',
  },
  {
    id: '2',
    name: 'Organic Cotton T-Shirt',
    description: 'Made from 100% organic cotton',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    carbonFootprint: 3.8,
    recyclable: true,
    certifications: ['GOTS Certified', 'Fair Trade'],
    sustainablePackaging: true,
    category: 'Clothing',
    rating: 4.0,
    priceId: 'price_H5ggYwtDq6',
  },
  {
    id: '3',
    name: 'Solar Power Bank',
    description: 'Charge your devices with solar energy',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1620827552635-1c6b147aec31',
    carbonFootprint: 5.2,
    recyclable: true,
    certifications: ['Energy Star'],
    sustainablePackaging: true,
    category: 'Electronics',
    rating: 4.8,
    priceId: 'price_H5ggYwtDq7',
  },
  {
    id: '4',
    name: 'Reusable Produce Bags',
    description: 'Set of 5 mesh bags for plastic-free grocery shopping',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1610419626022-657ddf8190e3',
    carbonFootprint: 1.2,
    recyclable: true,
    certifications: ['Zero Waste Certified'],
    sustainablePackaging: true,
    category: 'Kitchen',
    rating: 4.7,
    priceId: 'price_H5ggYwtDq8',
  },
  {
    id: '5',
    name: 'Bamboo Toothbrush Set',
    description: 'Pack of 4 biodegradable toothbrushes',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04',
    carbonFootprint: 0.8,
    recyclable: true,
    certifications: ['Plastic Free', 'Biodegradable'],
    sustainablePackaging: true,
    category: 'Personal Care',
    rating: 4.6,
    priceId: 'price_H5ggYwtDq9',
  },
  {
    id: '6',
    name: 'Recycled Paper Notebook',
    description: '100% recycled paper, spiral-bound notebook',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57',
    carbonFootprint: 1.5,
    recyclable: true,
    certifications: ['FSC Recycled'],
    sustainablePackaging: true,
    category: 'Office',
    rating: 4.4,
    priceId: 'price_H5ggYwtDq10',
  },
];

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 1000,
    recyclableOnly: false,
    sustainablePackagingOnly: false,
    maxCarbonFootprint: 100,
    category: '',
    minRating: 0,
  });

  const filteredProducts = sampleProducts.filter((product) => {
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (product.price < filters.minPrice || product.price > filters.maxPrice) {
      return false;
    }
    if (filters.recyclableOnly && !product.recyclable) {
      return false;
    }
    if (filters.sustainablePackagingOnly && !product.sustainablePackaging) {
      return false;
    }
    if (product.carbonFootprint > filters.maxCarbonFootprint) {
      return false;
    }
    if (filters.minRating > 0 && product.rating < filters.minRating) {
      return false;
    }
    return true;
  });

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Leaf className="h-8 w-8 text-green-600" />
                <h1 className="ml-2 text-2xl font-bold text-gray-900">EcoMarket</h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
                <Cart />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            <div className="w-64 flex-shrink-0">
              <Filters filters={filters} onFilterChange={setFilters} />
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </CartProvider>
  );
}

export default App;