'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import Locked from '@/app/locked';
import Cookies from 'js-cookie';
import { useGlobalState } from '../GlobalContext';
import Auth from '../auth';

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
  in_cart: boolean;
}

interface WishlistItem {
  id: number;
  product: Product;
}

export default function WishlistPage() {
  const [updated, setUpdated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { setCartCount } = useGlobalState();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const addToCart = async (product_id: number) => {
    try {
      const auth = await Auth();
      if (!auth) {
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
          quantity: 1,
        }),
      });
      if (res.ok) {
        const cartData = await Locked();
        setCartCount(cartData.cart_items_count);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      return false;
    } finally {
      setUpdated(!updated);
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
        setUpdated(!updated);
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
      "https://admin.mortorelite.com/api/wishlist/",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setWishlistItems(data.items);
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
          <p className="text-gray-600">Save your favorite parts for later</p>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Image */}
                <div className="aspect-square w-full overflow-hidden rounded-t-lg bg-gray-100 relative">
                  <img
                    src={item.product.primary_image.image}
                    alt={item.product.name}
                    className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-200"
                  />
                  {!item.product.in_stock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-2">
                    <span className="text-xs text-blue-600 font-medium">{item.product.brand.name}</span>
                  </div>

                  <Link href={`/parts/${item.product.slug}`}>
                    <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 line-clamp-2 cursor-pointer mb-3">
                      {item.product.name}
                    </h3>
                  </Link>

                  {/* Price */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">${item.product.price}</span>
                    {item.product.compare_price && (
                      <span className="text-sm text-gray-500 line-through">${item.product.compare_price}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => { addToCart(item.product.id) }}
                      className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${(item.product.in_stock) && (!item.product.in_cart)
                        ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      disabled={(!item.product.in_stock) || item.product.in_cart}
                    >
                      {item.product.in_cart ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                    <button onClick={() => { removeFromWishlist(item.product.id) }} className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 cursor-pointer">
                      <i className="ri-delete-bin-line text-gray-500"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <i className="ri-heart-line text-4xl text-gray-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding items you love to your wishlist</p>
            <Link
              href="/parts"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Browse Parts
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}