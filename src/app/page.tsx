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

  const { products } = await medusaClient.store.product.list({ limit: 8, region_id: indiaRegion?.id });
  const { collections } = await medusaClient.store.collection.list();
  
  const frontendProducts = products.map((p: any) => adaptProduct(p, collections));

  const newArrivals = frontendProducts.slice(0, 4);
  const specialDeals = frontendProducts.slice(4, 8);

  return (
    <div className="flex flex-col gap-16 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 z-10">
            <div className="inline-block bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs tracking-wider uppercase mb-6">
              Official Store
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-tight mb-6 tracking-tight">
              Premium <span className="text-blue-600">Laundry</span> & Dry Cleaning Supplies
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              Equip your business with the best hangers, chemicals, accessories, and machinery. Fast shipping and wholesale pricing available.
            </p>
            <div className="flex gap-4">
              <Link href="/products" className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-600/30">
                Shop Now
              </Link>
              <Link href="/contact" className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-full font-bold hover:border-gray-300 hover:bg-gray-50 transition">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 relative h-72 md:h-[500px] w-full">
            <div className="absolute inset-0 bg-blue-600 rounded-[2rem] transform rotate-3 opacity-10"></div>
            <Image
              src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&q=80"
              alt="Laundry Supplies"
              fill
              className="object-cover rounded-[2rem] shadow-2xl relative z-10"
              priority
            />
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
