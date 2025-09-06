
'use client';

import Link from 'next/link';

const categories = [
  {
    name: 'Engine Parts',
    icon: 'ri-settings-3-line',
    image: 'https://readdy.ai/api/search-image?query=high-quality%20automotive%20engine%20components%20and%20parts%20laid%20out%20professionally%2C%20pistons%2C%20engine%20blocks%2C%20gaskets%2C%20and%20mechanical%20parts%2C%20clean%20white%20background%2C%20product%20photography%20style%2C%20detailed%20automotive%20engineering%20parts&width=300&height=200&seq=cat1&orientation=landscape',
    count: '2,847 parts',
    href: '/parts?category=engine'
  },
  {
    name: 'Brake System',
    icon: 'ri-stop-circle-line',
    image: 'https://readdy.ai/api/search-image?query=professional%20brake%20system%20components%20including%20brake%20pads%2C%20rotors%2C%20calipers%2C%20and%20brake%20lines%2C%20automotive%20parts%20photography%2C%20clean%20white%20background%2C%20high-quality%20brake%20parts%20arrangement&width=300&height=200&seq=cat2&orientation=landscape',
    count: '1,523 parts',
    href: '/parts?category=brakes'
  },
  {
    name: 'Suspension',
    icon: 'ri-car-line', 
    image: 'https://readdy.ai/api/search-image?query=automotive%20suspension%20system%20parts%20including%20shock%20absorbers%2C%20struts%2C%20springs%2C%20and%20control%20arms%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20suspension%20components%20arrangement&width=300&height=200&seq=cat3&orientation=landscape',
    count: '987 parts',
    href: '/parts?category=suspension'
  },
  {
    name: 'Electrical',
    icon: 'ri-flashlight-line',
    image: 'https://readdy.ai/api/search-image?query=automotive%20electrical%20components%20including%20alternators%2C%20starters%2C%20batteries%2C%20and%20wiring%20harnesses%2C%20professional%20electrical%20parts%20photography%2C%20clean%20white%20background%2C%20automotive%20electrical%20system%20parts&width=300&height=200&seq=cat4&orientation=landscape',
    count: '1,234 parts',
    href: '/parts?category=electrical'
  },
  {
    name: 'Exhaust System',
    icon: 'ri-sound-module-line',
    image: 'https://readdy.ai/api/search-image?query=automotive%20exhaust%20system%20components%20including%20mufflers%2C%20catalytic%20converters%2C%20exhaust%20pipes%2C%20professional%20parts%20photography%2C%20clean%20white%20background%2C%20exhaust%20system%20parts%20arrangement&width=300&height=200&seq=cat5&orientation=landscape',
    count: '756 parts',
    href: '/parts?category=exhaust'
  },
  {
    name: 'Filters & Fluids',
    icon: 'ri-drop-line',
    image: 'https://readdy.ai/api/search-image?query=automotive%20filters%20and%20fluids%20including%20oil%20filters%2C%20air%20filters%2C%20fuel%20filters%2C%20motor%20oil%20bottles%2C%20professional%20product%20photography%2C%20clean%20white%20background%2C%20automotive%20maintenance%20products&width=300&height=200&seq=cat6&orientation=landscape',
    count: '1,456 parts',
    href: '/parts?category=filters'
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the exact parts you need for your vehicle. Browse our comprehensive categories of premium auto parts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.href} className="group cursor-pointer">
              <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center">
                      <i className={`${category.icon} text-blue-600 text-xl`}></i>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{category.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
