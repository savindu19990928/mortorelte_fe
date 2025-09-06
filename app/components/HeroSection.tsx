
'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section 
      className="relative bg-cover bg-center bg-no-repeat h-[600px] flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://readdy.ai/api/search-image?query=modern%20automotive%20garage%20workshop%20with%20professional%20car%20repair%20equipment%2C%20tools%2C%20and%20auto%20parts%20displayed%20on%20shelves%2C%20clean%20industrial%20setting%20with%20excellent%20lighting%2C%20high-tech%20automotive%20service%20center%20atmosphere%2C%20professional%20mechanic%20workspace%20with%20organized%20tool%20storage&width=1200&height=600&seq=hero1&orientation=landscape')`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Auto Parts<br />
            <span className="text-blue-400">For Every Vehicle</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover quality parts from trusted brands with fast shipping and expert support. Get your vehicle running at peak performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/parts" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Shop All Parts
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
