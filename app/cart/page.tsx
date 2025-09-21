'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Locked from '../locked';
import { useGlobalState } from '../GlobalContext';

interface Product {
  id: number;
  slug: string;
  name: string;
  category: any;
  price: number;
  compare_price?: number;
  primary_image?: any;
  brand: any;
  in_stock: boolean;
}

interface CartItem {
  id: number;
  quantity: number;
  product: Product;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState(0.00);
  const [total, setTotal] = useState(0.00);
  const [savings, setSavings] = useState(0);
  const [updated, setUpdated] = useState(false);
  const { setCartCount } = useGlobalState();
  const [isLoaded, setIsLoaded] = useState(false);

  const updateQuantity = async (product_id: number, quantity: number) => {
    try {
      const access_token = Cookies.get("access");
      const res = await fetch(`https://admin.mortorelite.com/api/cart/items/1/`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: product_id,
          quantity: quantity,
        }),
      });
      if (res.ok) {
        setUpdated(!updated);
        const cartData = await Locked();
        setCartCount(cartData.cart_items_count);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      return false;
    }
  };

  const removeItem = async (id: number) => {
    try {
      const access_token = Cookies.get("access");
      const res = await fetch(`https://admin.mortorelite.com/api/cart/items/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      });
      if (res.ok) {
        setUpdated(!updated);
        const cartData = await Locked();
        setCartCount(cartData.cart_items_count);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      return false;
    }
  };

  useEffect(() => {
    const access_token = Cookies.get("access");
    fetch(
      "https://admin.mortorelite.com/api/cart/",
      {
        headers: {
          ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
        const sumComparePrice =
          data.items?.reduce((sum: number, item: { product: any; quantity: number }) => {
            const comparePrice = item.product?.compare_price;
            const qty = item.quantity || 0;
            return sum + (comparePrice ? Number(comparePrice) * qty : 0);
          }, 0) ?? 0;
        setSubTotal(sumComparePrice);
        setTotal(data.total_amount);
        setSavings(sumComparePrice - data.total_amount);
      })
      .catch((err) => console.error("Error fetching items:", err))
      .finally(() => {
        setIsLoaded(true);
      });
  }, [updated])

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
                        src={item.product.primary_image.image}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover object-top rounded-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            <Link href={`/parts/${item.product.slug}`} className="hover:text-blue-600">
                              {item.product.name}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">{item.product.brand.name}</p>
                          {!item.product.in_stock && (
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
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-50 cursor-pointer"
                            disabled={!item.product.in_stock}
                          >
                            <i className="ri-subtract-line"></i>
                          </button>
                          <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-50 cursor-pointer"
                            disabled={!item.product.in_stock}
                          >
                            <i className="ri-add-line"></i>
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm md:text-lg font-bold text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            {item.product.compare_price && (
                              <span className="hidden md:block text-sm text-gray-500 line-through">
                                ${(item.product.compare_price * item.quantity).toFixed(2)}
                              </span>
                            )}
                          </div>
                          <p className="hidden md:block text-sm text-gray-500 mt-1">
                            ${item.product.compare_price} each
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
                  <span className="text-gray-600">SubTotal</span>
                  <span className="font-medium">${subTotal.toFixed(2)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>Savings</span>
                    <span>-${savings.toFixed(2)}</span>
                  </div>
                )}
                {/* 
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div> */}

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

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
