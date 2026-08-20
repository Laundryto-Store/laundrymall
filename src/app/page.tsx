import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

import { medusaClient } from "@/lib/medusa";
import { Product } from "@/data/products";

// Adapter to convert Medusa API product to our frontend format
function adaptProduct(medusaProduct: any, collections: any[]): Product {
  const price = medusaProduct.variants?.[0]?.calculated_price?.calculated_amount || 0;
  const collection = collections.find(c => c.id === medusaProduct.collection_id);
  
  return {
    id: medusaProduct.id,
    variantId: medusaProduct.variants?.[0]?.id,
    name: medusaProduct.title,
    category: collection?.title || "Uncategorized",
    price: price, 
    image: medusaProduct.thumbnail || "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=600&auto=format&fit=crop",
    description: medusaProduct.description || "Laundry Mall Product",
  };
}

export default async function Home() {
  const { regions } = await medusaClient.store.region.list();
  const indiaRegion = regions.find((r: any) => r.currency_code === "inr") || regions[0];

  const { products } = await medusaClient.store.product.list({ limit: 8, region_id: indiaRegion?.id }) as { products: any[] };
  const { collections } = await medusaClient.store.collection.list() as { collections: any[] };
  
  const frontendProducts = products.map((p: any) => adaptProduct(p, collections));

  const newArrivals = frontendProducts.slice(0, 4);
  const specialDeals = frontendProducts.slice(4, 8);

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
              India's #1 Laundry Franchise Store
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
              Equip your franchise with enterprise-grade hangers, eco-friendly chemicals, and heavy-duty machinery. Standardized quality for all LaundryTO outlets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="/products" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] hover:-translate-y-1 text-center flex items-center justify-center gap-2">
                Explore Catalog <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact" className="bg-white text-gray-800 border border-gray-200 px-8 py-4 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 transition-all text-center">
                Contact Sales
              </Link>
            </div>
            
            {/* Social Proof */}
            <div className="mt-12 flex items-center gap-6 pt-6 border-t border-gray-100 w-full">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80" alt="Franchise Owner" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" alt="Franchise Owner" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&q=80" alt="Franchise Owner" />
              </div>
              <div className="text-sm">
                <div className="flex text-yellow-400">
                  {"★★★★★"}
                </div>
                <span className="text-gray-500 font-medium">Trusted by 50+ FOCO Outlets</span>
              </div>
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
                <h3 className="text-2xl font-bold">LaundryTO Excellence</h3>
              </div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-100 hidden lg:block z-30 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Fast Delivery</p>
                  <p className="font-bold text-gray-900">24-48 Hour Dispatch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
          <Link href="/products" className="text-blue-600 font-medium hover:underline flex items-center gap-1">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {collections.slice(0, 8).map((collection: any) => (
            <Link 
              key={collection.id} 
              href={`/products?category=${encodeURIComponent(collection.title)}`}
              className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:border-blue-500 hover:shadow-md transition group"
            >
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600">{collection.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Special Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Special Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Special Deals - Another Category Map */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Special Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialDeals.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {newArrivals.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
