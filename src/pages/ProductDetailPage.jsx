import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ALL_PRODUCTS } from '../data/mock';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import ShowcaseGrid from '../components/ShowcaseGrid';

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Scroll to top when loading new product
    window.scrollTo(0, 0);
    const foundProduct = ALL_PRODUCTS.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-32 min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-extrabold text-gray-300">Product Not Found</h1>
      </main>
    );
  }

  // Get random "more from this shop" and "recommended"
  // Using deterministic slicing to avoid hydration mismatch if SSR, but fine for pure React
  const categoryItems = ALL_PRODUCTS.filter(p => p.id !== product.id && p.category === product.category);
  const shopItems = categoryItems.slice(0, 3);

  const otherItems = ALL_PRODUCTS.filter(p => p.id !== product.id && p.category !== product.category);
  const recommendedItems = otherItems.slice(0, 3);

  // Fallback to ensuring we have 3 items if not enough in category
  const finalShopItems = shopItems.length === 3 ? shopItems : otherItems.slice(3, 6);

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-12 flex flex-col gap-16 sm:gap-24 min-h-screen w-full bg-[#f8fafc]">

      {/* Top Section: Split Layout (Gallery + Info) */}
      <section className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">
        <ProductGallery images={product.images || [product.image]} title={product.name} />
        <ProductInfo product={product} />
      </section>

      <hr className="border-gray-200" />

      {/* Bottom Section 1: More from this shop */}
      <section>
        <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#032b82] tracking-tight">More from this Shop</h2>
          <button className="text-[10px] sm:text-xs font-bold text-[#032b82] tracking-widest uppercase hover:text-blue-500 transition-colors">View Shop</button>
        </div>
        <ShowcaseGrid items={finalShopItems} />
      </section>

      {/* Bottom Section 2: Recommended Products */}
      <section className="pb-16 sm:pb-24">
        <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#032b82] tracking-tight">Recommended Products</h2>
          <button className="text-[10px] sm:text-xs font-bold text-[#032b82] tracking-widest uppercase hover:text-blue-500 transition-colors">Explore More</button>
        </div>
        <ShowcaseGrid items={recommendedItems} />
      </section>
    </main>
  );
}
