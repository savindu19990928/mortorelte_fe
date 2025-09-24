'use client';

import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">Home</Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-900 font-medium">About Us</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div 
        className="relative bg-cover bg-center bg-gray-900"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://readdy.ai/api/search-image?query=Modern%20automotive%20service%20center%20garage%20with%20professional%20mechanics%20working%20on%20luxury%20cars%2C%20high-tech%20equipment%2C%20clean%20industrial%20environment%2C%20professional%20automotive%20business%20setting%2C%20bright%20lighting&width=1200&height=600&seq=about1&orientation=landscape')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Trusted Auto Parts Partner Since 2010
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              At Motor Elite, we've been dedicated to providing premium quality auto parts and exceptional service to keep your vehicle running at its best.
            </p>
          </div>
        </div>
      </div>

      {/* Company Story */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded in 2010 by automotive enthusiasts, Motor Elite began as a small family business with a simple mission: to provide car owners with reliable, high-quality auto parts at fair prices.
                </p>
                <p>
                  Over the years, we've grown from a local parts shop to a trusted nationwide supplier, but our commitment to quality and customer service has never wavered. We understand that your vehicle is more than just transportation—it's your independence, your livelihood, and often your passion.
                </p>
                <p>
                  Today, Motor Elite serves thousands of customers across the country, from weekend DIY mechanics to professional automotive shops. Our extensive catalog includes parts for all major vehicle makes and models, sourced from trusted manufacturers and rigorously tested for quality.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero.jpg"
                alt="Motor Elite Warehouse"
                className="rounded-lg shadow-lg object-cover w-full h-96"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and ensure we deliver the best experience for our customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-award-line text-blue-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-600">
                We source only the highest quality parts from trusted manufacturers, ensuring reliability and performance for your vehicle.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-customer-service-2-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Support</h3>
              <p className="text-gray-600">
                Our knowledgeable team is always ready to help you find the right parts and answer any technical questions you may have.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-truck-line text-purple-600 text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                With multiple warehouses and efficient logistics, we ensure your parts arrive quickly so you can get back on the road.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced team combines decades of automotive expertise with a passion for customer service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/images/profile1.jpg"
                alt="Mike Johnson"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
              />
              <h3 className="text-xl font-semibold text-gray-900">Mike Johnson</h3>
              <p className="text-blue-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">25+ years in automotive industry, ASE certified master technician</p>
            </div>

            <div className="text-center">
              <img
                src="/images/profile2.jpg"
                alt="Sarah Chen"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
              />
              <h3 className="text-xl font-semibold text-gray-900">Sarah Chen</h3>
              <p className="text-blue-600 mb-2">Technical Director</p>
              <p className="text-gray-600 text-sm">Automotive engineering degree, specializes in performance parts</p>
            </div>

            <div className="text-center">
              <img
                src="/images/profile3.jpg"
                alt="David Rodriguez"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover object-top"
              />
              <h3 className="text-xl font-semibold text-gray-900">David Rodriguez</h3>
              <p className="text-blue-600 mb-2">Customer Success Manager</p>
              <p className="text-gray-600 text-sm">15+ years in customer service, parts specialist certification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-white mb-2">50,000+</div>
              <div className="text-blue-100">Parts in Stock</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">100,000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-blue-100">Customer Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-white mb-2">99%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Motor Elite for all their automotive parts needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/parts"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              Shop Parts Now
            </Link>
            <Link
              href="/contact"
              className="border border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-3 rounded-lg font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}