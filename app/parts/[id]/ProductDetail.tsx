
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Auth from '../../auth';
import Cookies from 'js-cookie';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Locked from '@/app/locked';
import { useGlobalState } from '../../GlobalContext';

interface ProductDetailProps {
  productId: string;
}

interface Product {
  id: number;
  slug: string;
  sku: string;
  name: string;
  description: string;
  short_description: string;
  weight: number;
  dimensions: string;
  condition: string;
  warranty_months: number;
  category: any;
  price: number;
  compare_price?: number;
  average_rating: number;
  reviews_count: number;
  images?: any;
  attributes?: any;
  brand: any;
  inventory: any;
  in_stock: boolean;
  in_cart: boolean;
  is_wishlisted: boolean;
  qyt_cart: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [inCart, setInCart] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { setCartCount } = useGlobalState();
  const [isLoaded, setIsLoaded] = useState(false);

  const addToCart = async (product_id: number, quantity: number) => {
    if (quantity === 0) {
      return;
    }
    try {
      const auth = await Auth();
      if (!auth) {
        window.location.href = process.env.NEXT_PUBLIC_HOMEPAGE + "auth/login";
        return;
      }
      const access_token = Cookies.get("access");
      const res = await fetch("https://admin.mortorelite.com/api/cart/add/", {
        method: "POST",
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
        setInCart(true);
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

  const updateCart = async (product_id: number, quantity: number) => {
    try {
      const auth = await Auth();
      if (!auth) {
        return;
      }
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
        if (quantity === 0) {
          setInCart(false);
        }
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

  const addToWishlist = async (product_id: number) => {
    try {
      const auth = await Auth();
      if (!auth) {
        window.location.href = process.env.NEXT_PUBLIC_HOMEPAGE + "auth/login";
        return;
      }
      const access_token = Cookies.get("access");
      const res = await fetch("https://admin.mortorelite.com/api/wishlist/add/", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_id: product_id
        }),
      });
      if (res.ok) {
        setIsWishlisted(true);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      return false;
    }
  };

  const removeFromWishlist = async (product_id: number) => {
    try {
      const auth = await Auth();
      if (!auth) {
        return;
      }
      const access_token = Cookies.get("access");
      const res = await fetch(`https://admin.mortorelite.com/api/wishlist/remove/${product_id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${access_token}`
        },
      });
      if (res.ok) {
        setIsWishlisted(false);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      return false;
    }
  };
  const [product, setProduct] = useState<Product>();
  useEffect(() => {
    const access_token = Cookies.get("access");

    fetch(`https://admin.mortorelite.com/api/products/${productId}/`, {
      headers:
        access_token
          ? { Authorization: `Bearer ${access_token}` }
          : {}
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setIsWishlisted(data.is_wishlisted);
        setInCart(data.in_cart);
        if (data.qyt_cart !== 0) {
          setQuantity(data.qyt_cart);
        }
      })
      .catch((err) => console.error("Error fetching products:", err))
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

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

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
          <Link href="/parts" className="mt-4 inline-block text-blue-600 hover:text-blue-500">
            Back to Parts
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.compare_price ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100) : 0;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <Link href="/parts" className="text-gray-500 hover:text-gray-700">Parts</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
              <div className="grid grid-cols-3 gap-6">
                {product.images.map((img: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-blue-500 ${selectedImage === index ? 'ring-2 ring-blue-500' : 'ring-1 ring-gray-300'
                      }`}
                  >
                    <img
                      src={img.image}
                      alt={`${img.alt_text} view ${index + 1}`}
                      className="h-full w-full object-cover object-top rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Main image */}
            <div className="w-full aspect-square">
              <img
                src={product.images[selectedImage].image}
                alt={product.images[selectedImage].alt_text}
                className="w-full h-full object-cover object-top sm:rounded-lg"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-blue-600 font-medium">{product.brand.name}</span>
              <span className="text-sm text-gray-400">•</span>
              <span className="text-sm text-gray-500">SKU: {product.sku}</span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <div className="flex items-center space-x-4">
                <p className="text-3xl font-bold text-gray-900">${product.price}</p>
                {product.compare_price && (
                  <>
                    <p className="text-xl text-gray-500 line-through">${product.compare_price}</p>
                    <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Save {discount}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`ri-star${i < Math.floor(product.average_rating) ? '-fill' : '-line'} text-yellow-400 text-lg`}
                    ></i>
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-600">
                  {product.average_rating} out of 5 stars
                </p>
                <p className="ml-4 text-sm text-gray-600">
                  ({product.reviews_count} reviews)
                </p>
              </div>
            </div>

            {/* Stock status */}
            <div className="mt-4">
              {product.in_stock ? (
                <p className="text-green-600 text-sm font-medium flex items-center">
                  <i className="ri-check-line mr-1"></i>
                  In stock ({product.inventory.available_quantity} available)
                </p>
              ) : (
                <p className="text-red-600 text-sm font-medium flex items-center">
                  <i className="ri-close-line mr-1"></i>
                  Out of stock
                </p>
              )}
            </div>

            {/* Quantity and Add to cart */}
            <div className="mt-6">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(0, quantity - 1))}
                    className="p-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <i className="ri-subtract-line"></i>
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.inventory.available_quantity, quantity + 1))}
                    className="p-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <i className="ri-add-line"></i>
                  </button>
                </div>

                <button
                  onClick={() =>
                    inCart
                      ? updateCart(product.id, quantity)
                      : addToCart(product.id, quantity)
                  }
                  disabled={!product.in_stock}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  {inCart ? 'Update cart ' : 'Add to Cart'}
                </button>
              </div>

              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() =>
                    isWishlisted
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product.id)
                  }
                  className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  <i
                    className={`mr-2 ${isWishlisted ? "ri-heart-fill text-red-500" : "ri-heart-line"
                      }`}
                  ></i>
                  {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>

                {/* <button className="flex-1 border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md font-medium transition-colors duration-200 whitespace-nowrap">
                  <i className="ri-share-line mr-2"></i>
                  Share
                </button> */}
              </div>
            </div>

            {/* Features */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
              <ul className="mt-4 space-y-2">
                {product.attributes.map((attr: any, index: number) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    {attr.value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product details tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'description', name: 'Description' },
                { id: 'specifications', name: 'Specifications' },
                // { id: 'reviews', name: 'Reviews' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div key="1" className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Condition</span>
                  <span className="text-gray-600">
                    {product.condition === "new" ? "Brand new" : product.condition}
                  </span>
                </div>
                <div key="2" className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Weight</span>
                  <span className="text-gray-600">{product.weight} Kg</span>
                </div>
                <div key="3" className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Dimensions</span>
                  <span className="text-gray-600">{product.dimensions} (L x W x H in cm)</span>
                </div>
                <div key="4" className="flex justify-between py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-900">Warranty</span>
                  <span className="text-gray-600">{product.warranty_months} months</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="mb-8">
                  <h4 className="text-lg font-medium text-gray-900">Customer Reviews</h4>
                  <div className="mt-4 flex items-center space-x-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`ri-star${i < Math.floor(product.average_rating) ? '-fill' : '-line'} text-yellow-400 text-xl`}
                        ></i>
                      ))}
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{product.average_rating}</span>
                    <span className="text-gray-600">out of 5</span>
                    <span className="text-gray-600">({product.reviews_count} reviews)</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Reviews */}
                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">Mike Johnson</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-gray-600">
                      Excellent brake pads! Much quieter than my previous ones and the stopping power is impressive. Easy installation and great quality.
                    </p>
                  </div>

                  <div className="border-b border-gray-200 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">Sarah Davis</span>
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <i key={i} className="ri-star-fill text-yellow-400 text-sm"></i>
                          ))}
                          <i className="ri-star-line text-yellow-400 text-sm"></i>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">1 month ago</span>
                    </div>
                    <p className="text-gray-600">
                      Good product overall. Fit perfectly on my Honda Civic. Only downside is the price, but you get what you pay for.
                    </p>
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
