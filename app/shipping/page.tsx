
'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Shipping Information</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Methods & Rates</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Standard Shipping</h3>
                  <p className="text-gray-600 mb-2">5-7 business days</p>
                  <p className="text-gray-600">Free on orders over $75</p>
                  <p className="text-gray-600">$8.99 for orders under $75</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Express Shipping</h3>
                  <p className="text-gray-600 mb-2">2-3 business days</p>
                  <p className="text-gray-600">$19.99 for all orders</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Overnight Delivery</h3>
                  <p className="text-gray-600 mb-2">Next business day</p>
                  <p className="text-gray-600">$39.99 for all orders</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-3">Local Pickup</h3>
                  <p className="text-gray-600 mb-2">Same day availability</p>
                  <p className="text-gray-600">Free at our warehouse</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Processing Time</h2>
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-4">
                Most orders are processed within 1-2 business days. Custom or special order items may require additional processing time of 3-5 business days.
              </p>
              <p className="text-gray-600">
                Orders placed after 2:00 PM EST will be processed the following business day. Weekend orders will be processed on Monday.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Locations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">Domestic Shipping</h3>
                <p className="text-gray-600 mb-2">We ship to all 50 US states</p>
                <p className="text-gray-600">Alaska and Hawaii may have extended delivery times</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-3">International Shipping</h3>
                <p className="text-gray-600 mb-2">Currently available to Canada and Mexico</p>
                <p className="text-gray-600">Additional customs fees may apply</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Large Item Shipping</h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-3">
                Large items such as complete engine assemblies, transmissions, and body panels require special freight shipping.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Freight shipping rates calculated at checkout</li>
                <li>Delivery to your driveway or nearest freight terminal</li>
                <li>Appointment scheduling required for delivery</li>
                <li>Additional handling fees may apply for residential delivery</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Order Tracking</h2>
            <p className="text-gray-600 mb-4">
              Once your order ships, you'll receive a tracking number via email. You can track your package using:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Your Motor Elite account dashboard</li>
              <li>Direct carrier tracking websites</li>
              <li>Our customer service team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Restrictions</h2>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-3">Please note the following shipping restrictions:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Hazardous materials require ground shipping only</li>
                <li>Some oversized items cannot be shipped to PO boxes</li>
                <li>Certain automotive fluids have shipping restrictions</li>
                <li>International shipments may be subject to additional regulations</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
