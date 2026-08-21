import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Box, Shield, Zap } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getCachedFrontendProducts } from "@/lib/medusa-cache";

export default async function Home() {
  const products = await getCachedFrontendProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white selection:bg-white selection:text-black font-sans overflow-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        {/* Radial Glow */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] opacity-30 blur-[120px] bg-gradient-to-b from-blue-500/40 to-purple-500/10 rounded-full"></div>
      </div>

      {/* Cinematic Hero Section */}
      <section className="relative z-10 w-full min-h-[95vh] flex flex-col items-center justify-center pt-32 pb-16 px-4">
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-12 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
          <Sparkles className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium tracking-wide text-gray-300 uppercase">The New Standard in B2B</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-center tracking-tighter leading-[0.9] mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            Enterprise
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            Equipment.
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl text-center mb-12 font-light tracking-wide leading-relaxed">
          Procure industrial-grade laundry machinery and chemical supplies with zero friction. Built for the modern franchise.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <Link 
            href="/products" 
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black bg-white rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative flex items-center gap-2">
              Explore Catalog <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <Link 
            href="/signup" 
            className="px-8 py-4 font-bold text-white bg-transparent border border-white/20 rounded-full hover:bg-white/10 transition-colors"
          >
            Partner With Us
          </Link>
        </div>

        {/* 4K Cinematic Image Showcase */}
        <div className="w-full max-w-6xl mx-auto mt-24 relative perspective-1000">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.15)] transform rotate-x-2 hover:rotate-x-0 transition-transform duration-1000 ease-out">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
            <Image
              src="/media_1787203910799.png"
              alt="4K Laundry Equipment Showcase"
              fill
              className="object-cover scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
              priority
              quality={100}
            />
          </div>
        </div>
      </section>

      {/* Linear-Style Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 border-t border-white/5">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Precision engineered logistics.</h2>
          <p className="text-xl text-gray-500">Everything you need to scale your operations, delivered instantly.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <Zap className="w-10 h-10 text-blue-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Hyperspeed Delivery</h3>
            <p className="text-gray-400 leading-relaxed font-light">Automated dispatch systems ensure your machinery and chemicals arrive before you ever run out.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <Shield className="w-10 h-10 text-indigo-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">ISO-9001 Certified</h3>
            <p className="text-gray-400 leading-relaxed font-light">Every chemical barrel and heavy-duty machine is rigorously tested for enterprise compliance.</p>
          </div>
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
            <Box className="w-10 h-10 text-purple-400 mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Wholesale Tiering</h3>
            <p className="text-gray-400 leading-relaxed font-light">Dynamic algorithmic pricing guarantees you the absolute lowest cost at maximum volume.</p>
          </div>
        </div>
      </section>

      {/* Dark Mode Product Grid Override */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Trending Supplies</h2>
          <Link href="/products" className="hidden sm:flex items-center gap-2 text-gray-400 font-bold hover:text-white transition-colors group">
            View full catalog <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white/[0.03] border border-white/10 rounded-3xl p-4 hover:bg-white/[0.08] transition-colors duration-500">
              <Link href={/products/ + product.id} className="block relative aspect-square w-full rounded-2xl overflow-hidden mb-6 bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
                  quality={90}
                />
              </Link>
              <div className="px-2 pb-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-light text-gray-300">₹{product.price.toFixed(2)}</span>
                  <Link href={/products/ + product.id} className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
