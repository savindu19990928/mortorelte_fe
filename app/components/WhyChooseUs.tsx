'use client';

const features = [
  {
    icon: 'ri-shield-check-line',
    title: 'Quality Guaranteed',
    description: 'All parts come with manufacturer warranty and our quality guarantee for your peace of mind.'
  },
  {
    icon: 'ri-truck-line',
    title: 'Fast Shipping',
    description: 'Free shipping on orders over $75. Get your parts delivered quickly with our express options.'
  },
  {
    icon: 'ri-customer-service-2-line',
    title: 'Expert Support',
    description: 'Our automotive experts are here to help you find the right parts for your specific vehicle.'
  },
  {
    icon: 'ri-price-tag-3-line',
    title: 'Best Prices',
    description: 'Competitive pricing with regular deals and discounts. Price match guarantee available.'
  },
  {
    icon: 'ri-search-line',
    title: 'Easy Part Finder',
    description: 'Advanced search tools help you find compatible parts using your vehicle information.'
  },
  {
    icon: 'ri-refresh-line',
    title: 'Easy Returns',
    description: '30-day return policy with free return shipping on defective or incorrect parts.'
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Motor Elite?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing the best auto parts shopping experience with quality products and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                <i className={`${feature.icon} text-2xl text-blue-600 group-hover:text-white transition-colors duration-300`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Need Help Finding the Right Part?
          </h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our automotive experts are standing by to help you find the exact part you need. Get personalized assistance for your vehicle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:1-800-MOTOR-ELITE" 
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer"
            >
              <div className="mr-2 w-5 h-5 flex items-center justify-center">
                <i className="ri-phone-line"></i>
              </div>
              Call 1-800-MOTOR-ELITE
            </a>
            <a 
              href="mailto:support@motorelite.com" 
              className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <div className="mr-2 w-5 h-5 flex items-center justify-center">
                <i className="ri-mail-line"></i>
              </div>
              Email Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}