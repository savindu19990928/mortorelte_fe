
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const cartItems = [
  {
    id: 1,
    name: 'Premium Brake Pads Set',
    brand: 'BrakeMaster',
    price: 89.99,
    originalPrice: 109.99,
    quantity: 2,
    image: 'https://readdy.ai/api/search-image?query=Premium%20automotive%20brake%20pads%20set%20with%20modern%20packaging%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20high%20quality%20auto%20parts%2C%20detailed%20view%20showing%20brake%20pad%20material%20and%20construction&width=150&height=150&seq=bp1&orientation=squarish',
    inStock: true
  },
  {
    id: 2,
    name: 'High Performance Air Filter',
    brand: 'AirFlow Pro',
    price: 45.99,
    quantity: 1,
    image: 'https://readdy.ai/api/search-image?query=High%20performance%20automotive%20air%20filter%20with%20clean%20white%20background%2C%20professional%20product%20photography%2C%20engine%20air%20filter%20with%20pleated%20design%2C%20quality%20auto%20parts&width=150&height=150&seq=af1&orientation=squarish',
    inStock: true
  },
  {
    id: 3,
    name: 'LED Headlight Bulbs H7',
    brand: 'BrightBeam',
    price: 129.99,
    quantity: 1,
    image: 'https://readdy.ai/api/search-image?query=LED%20automotive%20headlight%20bulbs%20H7%20type%20with%20modern%20packaging%20on%20clean%20white%20background%2C%20professional%20product%20photography%2C%20bright%20LED%20car%20lights%2C%20premium%20auto%20electrical%20parts&width=150&height=150&seq=led1&orientation=squarish',
    inStock: false
  }
];

export default function CartPage() {
  const [items, setItems] = useState(cartItems);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter(item => item.id !== id));
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = items.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price;
    return sum + ((originalPrice - item.price) * item.quantity);
  }, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <i className="ri-shopping-cart-line text-gray-400 text-4xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">Add some auto parts to get started!</p>
            <Link 
              href="/parts"
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
            >
              Shop Auto Parts
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
              <span className="text-gray-600">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg">
              {items.map((item, index) => (
                <div key={item.id} className={`p-6 ${index !== items.length - 1 ? 'border-b border-gray-200' : ''}`}>
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover object-top rounded-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link href={`/parts/${item.id}`} className="hover:text-blue-600">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{item.brand}</p>
                          {!item.inStock && (
                            <p className="text-sm text-red-600 mt-1 flex items-center">
                              <i className="ri-error-warning-line mr-1"></i>
                              Out of stock
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 cursor-pointer"
                            disabled={!item.inStock}
                          >
                            <i className="ri-subtract-line"></i>
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 cursor-pointer"
                            disabled={!item.inStock}
                          >
                            <i className="ri-add-line"></i>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${(item.originalPrice * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            ${item.price} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/parts"
                className="text-blue-600 hover:text-blue-500 font-medium flex items-center"
              >
                <i className="ri-arrow-left-line mr-2"></i>
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {subtotal < 100 && (
                <div className="mt-4 p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-blue-800">
                    <i className="ri-truck-line mr-1"></i>
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium text-center block transition-colors duration-200 whitespace-nowrap"
              >
                Proceed to Checkout
              </Link>

              {/* Payment Methods */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">We accept</p>
                <div className="flex items-center justify-center space-x-2">
                  <i className="ri-visa-line text-2xl text-blue-600"></i>
                  <i className="ri-mastercard-line text-2xl text-red-500"></i>
                  <i className="ri-paypal-line text-2xl text-blue-500"></i>
                  <i className="ri-bank-card-line text-2xl text-gray-600"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
