'use client';

import { useState } from 'react';

interface TrackOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

const trackingData = {
  'ORD-001': {
    status: 'Delivered',
    currentLocation: 'New York, NY',
    deliveryDate: '2024-01-18',
    steps: [
      { status: 'Order Confirmed', date: '2024-01-15', time: '10:30 AM', completed: true },
      { status: 'Processing', date: '2024-01-15', time: '2:45 PM', completed: true },
      { status: 'Shipped', date: '2024-01-16', time: '9:15 AM', completed: true },
      { status: 'Out for Delivery', date: '2024-01-18', time: '8:30 AM', completed: true },
      { status: 'Delivered', date: '2024-01-18', time: '3:20 PM', completed: true }
    ]
  },
  'ORD-002': {
    status: 'In Transit',
    currentLocation: 'Chicago, IL',
    estimatedDelivery: '2024-01-25',
    steps: [
      { status: 'Order Confirmed', date: '2024-01-10', time: '11:20 AM', completed: true },
      { status: 'Processing', date: '2024-01-10', time: '4:15 PM', completed: true },
      { status: 'Shipped', date: '2024-01-12', time: '10:30 AM', completed: true },
      { status: 'In Transit', date: '2024-01-20', time: '2:45 PM', completed: true },
      { status: 'Out for Delivery', date: '', time: '', completed: false },
      { status: 'Delivered', date: '', time: '', completed: false }
    ]
  }
};

export default function TrackOrderModal({ isOpen, onClose, orderId }: TrackOrderModalProps) {
  const tracking = trackingData[orderId as keyof typeof trackingData];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Track Order #{orderId}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>

          {tracking ? (
            <div>
              {/* Order Status Card */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-900">Current Status</h3>
                    <p className="text-blue-700">{tracking.status}</p>
                    <p className="text-sm text-blue-600 mt-1">
                      Current Location: {tracking.currentLocation}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-600">
                      {tracking.status === 'Delivered' ? 'Delivered on' : 'Estimated Delivery'}
                    </p>
                    <p className="text-lg font-semibold text-blue-900">
                      {tracking.deliveryDate || tracking.estimatedDelivery}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="space-y-4">
                {tracking.steps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <i className="ri-check-line text-sm"></i>
                        ) : (
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        )}
                      </div>
                      {index < tracking.steps.length - 1 && (
                        <div className={`w-0.5 h-8 ml-4 mt-1 ${
                          step.completed ? 'bg-green-200' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-medium ${
                        step.completed ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.status}
                      </h4>
                      {step.date && (
                        <p className="text-sm text-gray-500">
                          {step.date} at {step.time}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Info */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Shipping Information</h4>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Carrier:</span> Motor Elite Express
                </p>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">Tracking Number:</span> ME{orderId}ABC123
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Shipping Method:</span> Standard Delivery
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i className="ri-search-line text-gray-400 text-2xl"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Order Not Found</h3>
              <p className="text-gray-500">Unable to find tracking information for this order.</p>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors duration-200 whitespace-nowrap"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}