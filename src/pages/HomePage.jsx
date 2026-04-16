import React from 'react';
import HeroBanner from '../components/HeroBanner';
import CategoriesSection from '../components/CategoriesSection';
import SuggestionSection from '../components/SuggestionSection';
import ProductsGridSection from '../components/ProductsGridSection';
import MembershipBanner from '../components/MembershipBanner';
import { useLatestProducts } from '../hooks/useLatestProducts';

export default function HomePage() {
  const { products: heroProducts, loading: heroLoading } = useLatestProducts(5);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mt-6 sm:mt-8 flex flex-col gap-12 sm:gap-16 w-full">
      <HeroBanner products={heroProducts} loading={heroLoading} />

      <CategoriesSection />

      <SuggestionSection
        title="Suggestion"
        subtitle="Curated picks just for you."
      />

      <ProductsGridSection />

      {/* จำลองว่ายังไม่ได้ล็อคอิน (isLoggedIn={false}) ถ้าล็อคอินแล้วแบนเนอร์นี้จะหายไปเอง */}
      <MembershipBanner isLoggedIn={false} />
    </main>
  );
}
