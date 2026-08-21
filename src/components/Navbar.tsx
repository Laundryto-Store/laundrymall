"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu, LogOut, Package } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { setIsOpen, itemCount } = useCartStore();
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  const isDark = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 pointer-events-none">
      <nav className={`pointer-events-auto max-w-6xl mx-auto backdrop-blur-2xl border shadow-2xl rounded-full px-6 py-3 flex items-center justify-between transition-colors duration-500 ${isDark ? 'bg-black/40 border-white/10 text-white shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : 'bg-white/80 border-gray-200 shadow-[0_8px_32px_rgba(0,0,0,0.06)]'}`}>
        
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.4)]'} group-hover:scale-105`}>
              <Package className={`w-4 h-4 ${isDark ? 'text-black' : 'text-white'}`} />
            </div>
            <span className={`text-xl font-black tracking-tighter transition-colors ${isDark ? 'text-white group-hover:text-gray-300' : 'text-gray-900 group-hover:text-blue-600'}`}>
              Laundry<span className={isDark ? 'text-gray-400' : 'text-blue-600'}>Mall</span>
            </span>
          </Link>
          
          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-6 text-sm font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <Link href="/products" className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Shop</Link>
            <Link href={'/products?category=Machinery'} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Machinery</Link>
            <Link href={'/products?category=Detergent%20Chemicals'} className={`transition-colors ${isDark ? 'hover:text-white' : 'hover:text-gray-900'}`}>Chemicals</Link>
          </div>
        </div>

        {/* Center: Search */}
        <div className="hidden lg:block flex-1 max-w-sm mx-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const search = formData.get("search");
              if (search && typeof search === 'string' && search.trim()) window.location.href = '/products?search=' + encodeURIComponent(search.trim());
            }}
            className="relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-4 w-4 transition-colors ${isDark ? 'text-gray-400 group-focus-within:text-white' : 'text-gray-400 group-focus-within:text-blue-500'}`} />
            </div>
            <input
              name="search"
              type="text"
              className={`block w-full pl-10 pr-3 py-2 rounded-full leading-5 focus:outline-none transition-all sm:text-sm font-medium ${isDark ? 'bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:bg-white/10 focus:border-white/30' : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500'}`}
              placeholder="Search products..."
            />
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href={mounted && user ? "/account" : "/login"} 
            className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-sm font-bold ${isDark ? 'hover:bg-white/10 text-gray-300 hover:text-white' : 'hover:bg-gray-100 text-gray-700'}`}
          >
            <User className="w-4 h-4" />
            <span>{mounted && user ? user.first_name : "Sign In"}</span>
          </Link>
          
          <button 
            onClick={() => setIsOpen(true)}
            className={`relative p-2.5 rounded-full transition-transform hover:scale-105 active:scale-95 flex items-center justify-center ${isDark ? 'bg-white text-black hover:bg-gray-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]' : 'bg-gray-900 text-white hover:bg-gray-800 shadow-[0_4px_14px_rgba(0,0,0,0.15)]'}`}
          >
            <ShoppingCart className="w-4 h-4" />
            {mounted && itemCount() > 0 && (
              <span className={`absolute -top-1 -right-1 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 ${isDark ? 'bg-red-500 text-white border-white' : 'bg-blue-500 text-white border-gray-900'}`}>
                {itemCount()}
              </span>
            )}
          </button>

          <button className={`sm:hidden p-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
