
'use client';

import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from './components/HeroSection';
import FeaturedCategories from './components/FeaturedCategories';
import FeaturedProducts from './components/FeaturedProducts';
import WhyChooseUs from './components/WhyChooseUs';
import Newsletter from './components/Newsletter';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <FeaturedCategories />
        <FeaturedProducts />
        <WhyChooseUs />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
