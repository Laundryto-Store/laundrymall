import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";
import { getCachedCollections, getCachedFrontendProducts } from "@/lib/medusa-cache";

export default async function Home() {
  const products = await getCachedFrontendProducts();
  const collections = await getCachedCollections();
  
  const newArrivals = products.slice(0, 4);
  const specialDeals = products.slice(4, 8);

  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        {/* Decorative Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-50/80 blur-3xl" />
          <div className="absolute top-[40%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/50 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 md:pt-28 md:pb-32 flex flex-col md:flex-row items-center gap-16 relative z-10">
          
          {/* Left Text Content */}
          <div className="md:w-1/2 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 font-bold px-4 py-2 rounded-full text-xs tracking-wider uppercase mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              India&apos;s #1 B2B Laundry Store
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Premium <br />
              <span className="text-blue-600 relative">
                Laundry Care
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-blue-200 -z-10" viewBox="0 0 100 20" preserveAspectRatio="none"><path d="M0 15 Q 50 0 100 15 L 100 20 L 0 20 Z" fill="currentColor"></path></svg>
              </span><br />
              Equipment.
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg leading-relaxed font-light">
              Equip your business with enterprise-grade hangers, eco-friendly chemicals, and heavy-duty machinery. Standardized quality for all your outlets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/products" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] hover:-translate-y-1 text-center flex items-center justify-center gap-2">
                Explore Catalog <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-all text-center">
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Right Image Content */}
          <div className="md:w-1/2 w-full relative">
            <div className="relative h-[400px] md:h-[600px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent z-10"></div>
              <Image
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?q=80&w=1200&auto=format&fit=crop"
                alt="Premium Dry Cleaning Storefront"
                fill
                className="object-cover hover:scale-105 transition-transform duration-1000"
                priority
              />
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/30 inline-block mb-3">
                  <span className="font-semibold tracking-wide">✓ Standardized Quality</span>
                </div>
                <h3 className="text-2xl font-bold">LaundryMall Excellence</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Shop by Category</h2>
            <p className="text-gray-500 mt-2">Explore our premium selection of franchise supplies.</p>
          </div>
          <Link href="/products" className="text-blue-600 font-bold hover:text-blue-700 hover:underline flex items-center gap-1 transition-colors">
            View All Categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collections.slice(0, 8).map((collection) => (
            <Link 
              key={collection.id} 
              href={`/products?category=` + encodeURIComponent(collection.title)}
              className="bg-white border border-gray-100 rounded-2xl p-8 text-center hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(59,130,246,0.12)] hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{collection.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-red-100 text-red-600 p-2 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Best Sellers</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {specialDeals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 pb-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">New Arrivals</h2>
            <p className="text-gray-500 mt-2">The latest equipment added to our catalog.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
