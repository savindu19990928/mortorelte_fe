'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AddAddressModal from '../components/AddAddressModal';
import Locked from '../locked';
import Auth from '../auth';
import Cookies from 'js-cookie';

export default function AccountPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profilePicture: string | File | null;
    profilePicturePreview?: string;
  };

  interface Address {
    id: number;
    type: string;
    street: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
    is_default: boolean;
  }

  const [activeTab, setActiveTab] = useState('orders');
  const [addressModal, setAddressModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [orderHistory, setOrderHistory] = useState<any[]>([]);
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    profilePicture: null,
    profilePicturePreview: undefined
  });

  const fetchOrders = async () => {
    try {
      const auth = await Auth();
      let access_token = Cookies.get('access');
      if (auth) {
        const response = await fetch("https://admin.mortorelite.com/api/orders/", {
          method: "GET",
          headers: { "Authorization": `Bearer ${access_token}` }
        });
        const data = await response.json();
        if (response.ok) {
          setOrderHistory(data.results);
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
          setSavedAddresses(data.results);
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
    }
  }

  useEffect(() => {
    Locked()
      .then(data => {
        if (data) {
          setUserInfo(prev => ({
            ...prev,
            firstName: data.first_name,
            lastName: data.last_name,
            phone: data.phone,
            email: data.email,
            profilePicture: data.profile_picture,
          }));
        }
      })
      .catch(err => console.error(err))
      .finally(() => {
        fetchAddress();
        fetchOrders();
      });
  }, []);

  const handleSignOut = () => {
    Cookies.remove('refresh');
    Cookies.remove('remember');
    Cookies.remove('access');
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
            type: address.type,
            street: address.street,
            city: address.city,
            state: address.state,
            postal_code: address.postal_code,
            country: address.country,
            is_default: address.is_default
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setSavedAddresses(prev => [...prev, data]);
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
    }
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      const auth = await Auth();
      let access_token = Cookies.get('access');
      if (auth) {
        const response = await fetch(`https://admin.mortorelite.com/api/addresses/${addressId}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`,
          },
        });

        if (response.ok) {
          setSavedAddresses(prev => prev.filter(addr => addr.id !== addressId));
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
    }
  };

  const handleProfilePictureUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUserInfo((prev) => ({
      ...prev,
      profilePicture: file,
      profilePicturePreview: URL.createObjectURL(file),
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const auth = await Auth();
      if (!auth) {
        return;
      }
      const access_token = Cookies.get("access");

      let response;

      if (userInfo.profilePicture instanceof File) {
        const formData = new FormData();
        formData.append("first_name", userInfo.firstName);
        formData.append("last_name", userInfo.lastName);
        formData.append("phone", userInfo.phone);
        formData.append("email", userInfo.email);
        formData.append("profile_picture", userInfo.profilePicture);

        response = await fetch("https://admin.mortorelite.com/api/auth/profile/", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
          body: formData,
        });
      } else {
        response = await fetch("https://admin.mortorelite.com/api/auth/profile/", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify({
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            phone: userInfo.phone,
            email: userInfo.email,
          }),
        });
      }

      if (response.ok) {
        const data = await response.json();
        setUserInfo((prev) => ({
          ...prev,
          profilePicture:
            userInfo.profilePicture instanceof File
              ? data.profile_picture
              : prev.profilePicture,
          profilePicturePreview: userInfo.profilePicture instanceof File ? data.profile_picture : prev.profilePicturePreview,
        }));
        alert("Profile updated successfully!");
      } else {
        console.error(await response.text());
        alert("Profile update failed!");
      }
    } catch (error) {
      console.error(error);
      alert("Profile update failed!");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const access_token = Cookies.get('access');
      const response = await fetch("https://admin.mortorelite.com/api/auth/change-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${access_token}` },
        body: JSON.stringify({
          old_password: password.old_password,
          new_password: password.new_password,
          confirm_password: password.confirm_password
        })
      });
      if (response.ok) {
        alert('Password updated successfully!');
      } else {
        const data = await response.json();
        alert(data[Object.keys(data)[0]]);
      }
    } catch (error) {
      alert(error);
    }
  };

  const tabs = [
    { id: 'orders', name: 'Orders', icon: 'ri-shopping-bag-line' },
    { id: 'profile', name: 'Profile', icon: 'ri-user-line' },
    { id: 'addresses', name: 'Addresses', icon: 'ri-map-pin-line' },
    { id: 'settings', name: 'Settings', icon: 'ri-settings-line' }
  ];

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
            <span className="text-gray-900 font-medium">My Account</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-lg">
                    {userInfo.firstName?.[0]}
                    {userInfo.lastName?.[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{userInfo.firstName} {userInfo.lastName}</h3>
                  <p className="text-sm text-gray-500">{userInfo.email}</p>
                </div>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md transition-colors duration-200 ${activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    <i className={tab.icon}></i>
                    <span className="text-sm font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  href="/auth/login"
                  onClick={handleSignOut}
                  className="w-full flex items-center space-x-3 px-3 py-2 text-left rounded-md text-red-600 hover:bg-red-50 transition-colors duration-200"
                >
                  <i className="ri-logout-box-line"></i>
                  <span className="text-sm font-medium">Sign Out</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Orders */}
            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>

                <div className="space-y-6">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Order #{order.order_number}</h3>
                          <p className="text-sm text-gray-500">Placed on {order.created_at}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">${order.total_amount}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status_display === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status_display}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item : any) => (
                          <div key={item.id} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{item.product.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-gray-900">${(item.total_price)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex space-x-3">
                        {/* <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap">
                          Report
                        </button> */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile */}
            {activeTab === 'profile' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h1>

                <form onSubmit={handleUpdateProfile} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {/* Profile Picture Upload */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                      <img
                        src={
                          userInfo.profilePicturePreview ??
                          (typeof userInfo.profilePicture === "string" ? userInfo.profilePicture : undefined) ??
                          "/images/placeholderProfile.png"
                        }
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border border-gray-300"
                      />
                      <label
                        htmlFor="profilePicture"
                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition"
                      >
                        📷
                      </label>
                      <input
                        id="profilePicture"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureUpload}
                        className="hidden"
                      />
                    </div>
                  </div>

                  {/* Info Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={userInfo.firstName}
                        onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={userInfo.lastName}
                        onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Other tabs content would go here */}
            {activeTab === 'addresses' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Addresses</h1>

                {savedAddresses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {savedAddresses.map((address) => (
                      <div key={address.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-medium text-gray-900">
                              {address.type.charAt(0).toUpperCase() + address.type.slice(1)}
                            </h3>
                            {address.is_default && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button onClick={() => handleDeleteAddress(address.id)} className="text-gray-400 hover:text-red-600 cursor-pointer">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          {/* {address.company && <p>{address.company}</p>}
                          <p>{address.address1}</p>
                          {address.address2 && <p>{address.address2}</p>} */}
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.postal_code}</p>
                          <p>{address.country}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <p className="text-gray-500 text-center">No saved addresses yet.</p>
                  </div>
                )}

                <button
                  onClick={() => setAddressModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                >
                  Add Address
                </button>
              </div>
            )}
            {/* 
            {activeTab === 'wishlist' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h1>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <p className="text-gray-500">Your wishlist is empty.</p>
                  <Link href="/parts" className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap">
                    Browse Parts
                  </Link>
                </div>
              </div>
            )} */}

            {activeTab === 'settings' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h1>
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
                    <form onSubmit={handleChangePassword} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                        <input
                          type="password"
                          onChange={(e) => setPassword({ ...password, old_password: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <input
                          type="password"
                          onChange={(e) => setPassword({ ...password, new_password: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                        <input
                          type="password"
                          onChange={(e) => setPassword({ ...password, confirm_password: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddAddressModal
        isOpen={addressModal}
        onClose={() => setAddressModal(false)}
        onSave={handleAddAddress}
      />

      <Footer />
    </div>
  );
}
