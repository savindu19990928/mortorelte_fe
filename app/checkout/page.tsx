
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Auth from '../auth';
import Cookies from 'js-cookie';

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

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subTotal, setSubTotal] = useState(0.00);
  const [step, setStep] = useState(1);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    // Shipping Information
    street: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    selectedAddress: '',

    // Payment Information
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',

    // Order Notes
    orderNotes: ''
  });

  const fetchAddress = async () => {
    try {
      const auth = await Auth();
      let access_token = Cookies.get('access');
      if (auth) {
        const response = await fetch("https://admin.mortorelite.com/api/addresses/", {
          method: "GET",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${access_token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setSavedAddresses(data.results.filter((addr: any) => addr.type === "shipping"));
          return true;
        } else {
          return false;
        }
      } else {
        if (window.location.pathname !== "/auth/login" && window.location.pathname !== "/auth/register") {
          window.location.href = process.env.NEXT_PUBLIC_HOMEPAGE + "auth/login";
        }
        return false;
      }
    } catch (error) {
      return false;
    } finally {
      setIsLoaded(true);
    }
  }

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
        setCartItems(data.items);
        setSubTotal(data.total_amount);
      })
      .catch((err) => console.error("Error fetching items:", err))
      .finally(() => {
        fetchAddress();
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAddAddress = async (address: any) => {
    try {
      const auth = await Auth();
      let access_token = Cookies.get('access');
      if (auth) {
        const response = await fetch("https://admin.mortorelite.com/api/addresses/", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${access_token}` },
          body: JSON.stringify({
            type: "shipping",
            street: address.street,
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            country: address.country,
            is_default: false
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setSavedAddresses(prev => [...prev, data]);
          return data.id;
        } else {
          return false;
        }
      } else {
        if (window.location.pathname !== "/auth/login" && window.location.pathname !== "/auth/register") {
          window.location.href = process.env.NEXT_PUBLIC_HOMEPAGE + "auth/login";
        }
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let paymentMethod = 'cod';
    if (formData.paymentMethod === "Credit Card") {
      paymentMethod = "credit_card";
    }
    if (formData.selectedAddress === "new") {
      const selectedAddr = await handleAddAddress(formData);
      setFormData(prev => ({ ...prev, selectedAddress: selectedAddr }));
    }

    try {
      await Auth();
      let access_token = Cookies.get('access');
      const response = await fetch("https://admin.mortorelite.com/api/orders/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${access_token}` },
        body: JSON.stringify({
          billing_address_id: formData.selectedAddress,
          shipping_address_id: formData.selectedAddress,
          shipping_method_id: 1,
          payment_method: "credit_card",
          notes: ""
        }),
      });
      if (response.ok) {
        window.location.href = process.env.NEXT_PUBLIC_HOMEPAGE + "account";
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Please check your connection.");
    }
  }

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
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <Link href="/cart" className="text-gray-500 hover:text-gray-700">Cart</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          {/* Desktop / Tablet stepper */}
          <div className="hidden md:flex items-center justify-center space-x-8">
            {[
              { step: 1, name: 'Shipping', icon: 'ri-truck-line' },
              { step: 2, name: 'Payment', icon: 'ri-bank-card-line' },
              { step: 3, name: 'Review', icon: 'ri-file-list-line' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${step >= item.step
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'border-gray-300 text-gray-500'
                    }`}
                >
                  {step > item.step ? (
                    <i className="ri-check-line"></i>
                  ) : (
                    <i className={item.icon}></i>
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${step >= item.step ? 'text-blue-600' : 'text-gray-500'
                    }`}
                >
                  {item.name}
                </span>

                {index < 2 && (
                  <div
                    className={`ml-8 w-16 h-px ${step > item.step ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile - only current step */}
          <div className="flex md:hidden items-center justify-center">
            {(() => {
              const steps = [
                { step: 1, name: 'Shipping', icon: 'ri-truck-line' },
                { step: 2, name: 'Payment', icon: 'ri-bank-card-line' },
                { step: 3, name: 'Review', icon: 'ri-file-list-line' }
              ];

              const current = steps.find((item) => item.step === step);

              if (!current) return null; // <-- Fix TypeScript complaint

              return (
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 bg-blue-600 border-blue-600 text-white">
                    <i className={current.icon}></i>
                  </div>
                  <span className="ml-2 text-sm font-medium text-blue-600">
                    {current.name}
                  </span>
                </div>
              );
            })()}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Shipping Information */}
              {step === 1 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>

                  {/* Saved addresses dropdown */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Shipping Address</label>
                    <select
                      name="selectedAddress"
                      value={formData.selectedAddress}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value === "new") {
                          setFormData({ ...formData, selectedAddress: "new", state: "", street: "", city: "", country: "", postal_code: "" });
                        } else {
                          const chosen = savedAddresses.find(addr => addr.id === Number(value));
                          if (chosen) {
                            setFormData({
                              ...formData,
                              selectedAddress: chosen.id,
                              ...chosen,
                            });
                          }
                        }
                      }}
                      className="w-full px-3 py-2 text-sm font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">-- Select Address --</option>
                      {savedAddresses.map((address) => (
                        <option key={address.id} value={address.id}>
                          {address.street} {address.city}, {address.state}, {address.country} {address.postal_code}
                        </option>
                      ))}
                      <option value="new">+ Add New Address</option>
                    </select>
                  </div>

                  {/* Only show address form if "new" is selected */}
                  {formData.selectedAddress === "new" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                        <input
                          type="text"
                          name="street"
                          required
                          value={formData.street}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="postal_code"
                          required
                          value={formData.postal_code}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <input
                          type="text"
                          name="country"
                          required
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}


              {/* Step 2: Payment Information */}
              {step === 2 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Information</h2>

                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Credit Card"
                          checked={formData.paymentMethod === 'Credit Card'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg text-center ${formData.paymentMethod === 'Credit Card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                          }`}>
                          <i className="ri-bank-card-line text-2xl mb-2"></i>
                          <p className="font-medium">Credit Card</p>
                        </div>
                      </label>
                      <label className="cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Cash on Delivery"
                          checked={formData.paymentMethod === 'Cash on Delivery'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`p-4 border-2 rounded-lg text-center ${formData.paymentMethod === 'Cash on Delivery' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                          }`}>
                          <i className="ri-cash-line text-2xl mb-2"></i>
                          <p className="font-medium">Cash on Delivery</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  {formData.paymentMethod === 'Credit Card' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                        <input
                          type="text"
                          name="nameOnCard"
                          value={formData.nameOnCard}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-6 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {step === 3 && (
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                          <img
                            src={item.product.primary_image.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover object-top rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                            <p className="text-sm text-gray-500">{item.product.brand.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
                            <p className="text-sm text-gray-500">${item.product.price}/each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping & Payment Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Shipping Address</h3>
                      <div className="text-sm text-gray-600">
                        <p>{formData.street}</p>
                        <p>{formData.city}, {formData.state} {formData.postal_code}</p>
                        <p>{formData.country}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Payment Method</h3>
                      <div className="text-sm text-gray-600">
                        <p className="capitalize">{formData.paymentMethod}</p>
                        {formData.paymentMethod === 'card' && formData.cardNumber && (
                          <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-6 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-80">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.product.primary_image.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover object-top rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                {/* <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div> */}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">${subTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-3 bg-green-50 rounded-md">
                <div className="flex items-center">
                  <i className="ri-shield-check-line text-green-500 mr-2"></i>
                  <p className="text-xs text-green-800">
                    Your payment information is secure and encrypted
                  </p>
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
