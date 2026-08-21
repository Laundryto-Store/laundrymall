import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShieldCheck, Zap, Package } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getCachedFrontendProducts } from "@/lib/medusa-cache";

export default async function Home() {
  const products = await getCachedFrontendProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen pt-24 bg-[#FAFAFA]">
      {/* 2026 Hyper-Modern Hero Section */}
      <section className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 mb-24">
        <div className="relative rounded-[2.5rem] bg-gray-900 overflow-hidden shadow-2xl">
          {/* Abstract glow / Mesh Gradient */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[70%] bg-blue-600/30 blur-[120px] rounded-full mix-blend-screen"></div>
            <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-indigo-500/20 blur-[100px] rounded-full mix-blend-screen"></div>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[600px] p-8 lg:p-16">
            <div className="lg:col-span-6 flex flex-col items-start">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white font-medium px-4 py-2 rounded-full text-xs tracking-wider uppercase mb-8 shadow-xl">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                Next-Gen B2B Platform
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tighter">
                Procure <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">Smarter.</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-10 max-w-lg leading-relaxed font-medium">
                The enterprise standard for wholesale laundry machinery, automated packaging, and sustainable chemical supplies.
              </p>
              
              <div className="flex flex-wrap items-center gap-4">
                <Link 
                  href="/products" 
                  className="bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:scale-105 hover:bg-gray-50 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] flex items-center gap-2 group"
                >
                  Explore Catalog
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/signup" 
                  className="bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold px-8 py-4 rounded-full hover:bg-white/20 transition-all"
                >
                  Apply for Wholesale
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[400px] lg:h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
              <Image
                src="/media_1787203910799.png"
                alt="Modern Laundry Equipment"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                priority
              />
              {/* Glassmorphism Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-900 overflow-hidden relative">
                      <Image src="/media_1787203910799.png" alt="User" fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="text-right">
                  <div className="text-white font-bold text-lg">2,400+</div>
                  <div className="text-gray-300 text-xs font-medium uppercase tracking-wider">Active Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-center items-center text-center group">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Next-Day Freight</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Automated dispatch via our national warehouse network.</p>
          </div>
          
          <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800 shadow-xl flex flex-col justify-center items-center text-center text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Verified Quality</h3>
            <p className="text-gray-400 font-medium leading-relaxed relative z-10">ISO-certified chemicals and heavy-duty machinery.</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-center items-center text-center group">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Package className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Volume Pricing</h3>
            <p className="text-gray-500 font-medium leading-relaxed">Dynamic tiered discounts automatically applied at checkout.</p>
          </div>
        </div>
      </section>

      {/* Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Trending Supplies</h2>
            <p className="text-gray-500 font-medium mt-2">Restock your inventory with our highest-rated equipment.</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group">
            View full catalog <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
