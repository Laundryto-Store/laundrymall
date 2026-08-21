"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu, LogOut, Package } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { setIsOpen, itemCount } = useCartStore();
  const { user } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-6 left-0 right-0 z-50 px-4 pointer-events-none">
      <nav className="pointer-events-auto max-w-6xl mx-auto bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full px-6 py-3 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-all">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter text-gray-900 group-hover:text-blue-600 transition-colors">
              Laundry<span className="text-blue-600">Mall</span>
            </span>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-500">
            <Link href="/products" className="hover:text-gray-900 transition-colors">Shop</Link>
            <Link href="/products?category=Machinery" className="hover:text-gray-900 transition-colors">Machinery</Link>
            <Link href="/products?category=Detergent%20Chemicals" className="hover:text-gray-900 transition-colors">Chemicals</Link>
          </div>
        </div>

        {/* Center: Search (Floating Style) */}
        <div className="hidden lg:block flex-1 max-w-sm mx-8">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const search = formData.get("search") as string;
              if (search.trim()) window.location.href = '/products?search=' + encodeURIComponent(search.trim());
            }}
            className="relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              name="search"
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200/80 rounded-full leading-5 bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
              placeholder="Search products..."
            />
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href={mounted && user ? "/account" : "/login"} 
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors text-sm font-bold text-gray-700"
          >
            <User className="w-4 h-4" />
            <span>{mounted && user ? user.first_name : "Sign In"}</span>
          </Link>
          
          <button 
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-transform hover:scale-105 active:scale-95 flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
          >
            <ShoppingCart className="w-4 h-4" />
            {mounted && itemCount() > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 border-gray-900">
                {itemCount()}
              </span>
            )}
          </button>

          <button className="sm:hidden p-2 text-gray-500 hover:text-gray-900">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
