
'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Returns & Exchanges</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return Policy</h2>
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-lg font-medium text-green-800 mb-2">30-Day Return Window</p>
              <p className="text-green-700">
                We accept returns within 30 days of delivery for most items in new, unused condition.
              </p>
            </div>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                At Motor Elite, we stand behind the quality of our automotive parts. If you're not completely satisfied with your purchase, we make returns easy and hassle-free.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Returnable Items</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-green-600">✓ Eligible for Return</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Unused parts in original packaging</li>
                  <li>• Items with all original tags and labels</li>
                  <li>• Non-electrical components</li>
                  <li>• Standard replacement parts</li>
                  <li>• Accessories and tools</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 text-red-600">✗ Not Eligible for Return</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Electrical components (tested/installed)</li>
                  <li>• Custom or special order items</li>
                  <li>• Fluids, oils, and chemicals</li>
                  <li>• Used or installed parts</li>
                  <li>• Items damaged by customer</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Return Items</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                <div>
                  <h3 className="font-semibold text-lg">Contact Customer Service</h3>
                  <p className="text-gray-600">Call us at 1-800-MOTOR-01 or email support@motorelite.com to initiate your return.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                <div>
                  <h3 className="font-semibold text-lg">Receive Return Authorization</h3>
                  <p className="text-gray-600">We'll provide you with a Return Merchandise Authorization (RMA) number and return instructions.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                <div>
                  <h3 className="font-semibold text-lg">Package & Ship</h3>
                  <p className="text-gray-600">Pack items securely in original packaging and ship using our prepaid return label.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">4</div>
                <div>
                  <h3 className="font-semibold text-lg">Receive Refund</h3>
                  <p className="text-gray-600">Once we receive and inspect your return, we'll process your refund within 3-5 business days.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Exchange Policy</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We offer exchanges for defective items or incorrect parts shipped due to our error. Exchanges are processed as returns with new orders to ensure fastest delivery.
              </p>
              <h3 className="font-semibold mb-2">Exchange Process:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Contact us within 30 days of delivery</li>
                <li>We'll send a replacement and provide return label for original item</li>
                <li>No additional shipping charges for our errors</li>
                <li>Expedited processing for urgent needs</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Refund Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Refund Methods</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Original payment method (credit card, PayPal)</li>
                  <li>• Store credit for faster processing</li>
                  <li>• Check by mail (if original payment unavailable)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">Processing Times</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Credit cards: 3-5 business days</li>
                  <li>• PayPal: 1-2 business days</li>
                  <li>• Store credit: Immediate</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Return Shipping</h2>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Free Return Shipping</h3>
                <p className="text-green-700">We provide prepaid return labels for defective items and our shipping errors.</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-yellow-800 mb-2">Customer Responsibility</h3>
                <p className="text-yellow-700">Return shipping costs are deducted from refunds for customer changes of mind or incorrect orders.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                Our customer service team is here to help make your return as smooth as possible.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600">1-800-MOTOR-01</p>
                  <p className="text-sm text-gray-500">Mon-Fri 8AM-6PM EST</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600">returns@motorelite.com</p>
                  <p className="text-sm text-gray-500">24-48 hour response</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Live Chat</h3>
                  <p className="text-gray-600">Available on website</p>
                  <p className="text-sm text-gray-500">Mon-Fri 9AM-5PM EST</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
