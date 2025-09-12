'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TrackOrderModal from '../components/TrackOrderModal';
import AddAddressModal from '../components/AddAddressModal';
import Locked from '../locked';
import Cookies from 'js-cookie';

const orderHistory = [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    total: 225.97,
    items: [
      { name: 'Premium Brake Pads Set', quantity: 2, price: 89.99 },
      { name: 'High Performance Air Filter', quantity: 1, price: 45.99 }
    ]
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'In Transit',
    total: 129.99,
    items: [
      { name: 'LED Headlight Bulbs H7', quantity: 1, price: 129.99 }
    ]
  }
];

export default function AccountPage() {
  type UserInfo = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    profilePicture: string | File | null;
    profilePicturePreview?: string;
  };

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    profilePicture: null,
    profilePicturePreview: undefined
  });

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
      .catch(err => console.error(err));
  }, []);

  const handleSignOut = () => {
    Cookies.remove('refresh');
    Cookies.remove('remember');
    Cookies.remove('access');
  };

  const [activeTab, setActiveTab] = useState('dashboard');
  const [trackingModal, setTrackingModal] = useState({ isOpen: false, orderId: '' });
  const [addressModal, setAddressModal] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState<any[]>([]);
  const [password, setPassword] = useState({
    old_password: "",
    new_password: "",
    confirm_password: ""
  });

  const handleTrackOrder = (orderId: string) => {
    setTrackingModal({ isOpen: true, orderId });
  };

  const handleAddAddress = (address: any) => {
    const newAddress = {
      id: Date.now().toString(),
      ...address
    };
    setSavedAddresses(prev => [...prev, newAddress]);
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
              ? data.profile_picture // backend returns URL
              : prev.profilePicture,  // keep old picture
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
    { id: 'dashboard', name: 'Dashboard', icon: 'ri-dashboard-line' },
    { id: 'orders', name: 'Orders', icon: 'ri-shopping-bag-line' },
    { id: 'profile', name: 'Profile', icon: 'ri-user-line' },
    { id: 'addresses', name: 'Addresses', icon: 'ri-map-pin-line' },
    { id: 'wishlist', name: 'Wishlist', icon: 'ri-heart-line' },
    { id: 'settings', name: 'Settings', icon: 'ri-settings-line' }
  ];

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
                    {userInfo.profilePicture ? (
                      <img
                        src={userInfo.profilePicture}
                        alt="Profile"
                        className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      />
                    ) : (
                      <>
                        {userInfo.firstName?.[0]}
                        {userInfo.lastName?.[0]}
                      </>
                    )}
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
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-blue-100 rounded-md">
                        <i className="ri-shopping-bag-line text-blue-600 text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Total Orders</p>
                        <p className="text-2xl font-bold text-gray-900">12</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-green-100 rounded-md">
                        <i className="ri-truck-line text-green-600 text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Delivered</p>
                        <p className="text-2xl font-bold text-gray-900">8</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-yellow-100 rounded-md">
                        <i className="ri-time-line text-yellow-600 text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Pending</p>
                        <p className="text-2xl font-bold text-gray-900">2</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-md">
                        <i className="ri-heart-line text-purple-600 text-xl"></i>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-500">Wishlist</p>
                        <p className="text-2xl font-bold text-gray-900">5</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                    <Link href="#" onClick={() => setActiveTab('orders')} className="text-blue-600 hover:text-blue-500 text-sm font-medium">
                      View All
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {orderHistory.slice(0, 3).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">${order.total}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-6">Order History</h1>

                <div className="space-y-6">
                  {orderHistory.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Order #{order.id}</h3>
                          <p className="text-sm text-gray-500">Placed on {order.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-gray-900">${order.total}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-900">{item.name}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 flex space-x-3">
                        <button
                          onClick={() => handleTrackOrder(order.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap"
                        >
                          Track Order
                        </button>
                        <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap">
                          Reorder
                        </button>
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
                              {address.firstName} {address.lastName}
                            </h3>
                            {address.isDefault && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                              <i className="ri-edit-line"></i>
                            </button>
                            <button className="text-gray-400 hover:text-red-600 cursor-pointer">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 space-y-1">
                          {address.company && <p>{address.company}</p>}
                          <p>{address.address1}</p>
                          {address.address2 && <p>{address.address2}</p>}
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                          <p>{address.country}</p>
                          <p>{address.phone}</p>
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
            )}

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
      <TrackOrderModal
        isOpen={trackingModal.isOpen}
        onClose={() => setTrackingModal({ isOpen: false, orderId: '' })}
        orderId={trackingModal.orderId}
      />

      <AddAddressModal
        isOpen={addressModal}
        onClose={() => setAddressModal(false)}
        onSave={handleAddAddress}
      />

      <Footer />
    </div>
  );
}
