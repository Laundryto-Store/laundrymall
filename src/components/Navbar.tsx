"use client";

import Link from "next/link";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { setIsOpen, itemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      {/* Top bar */}
      <div className="bg-blue-600 text-white text-sm py-2 px-4 flex justify-between items-center">
        <div className="font-medium tracking-wide">Welcome to Laundry Mall &nbsp;&nbsp;|&nbsp;&nbsp; <span className="text-blue-200">A LaundryTO Company</span></div>
        <div className="flex gap-4 font-medium">
          <Link href="/login" className="hover:text-blue-100 transition">Login</Link>
          <Link href="/signup" className="hover:text-blue-100 transition">Signup</Link>
        </div>
      </div>
      
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <button className="sm:hidden text-gray-500 hover:text-blue-600 transition">
              <Menu className="w-6 h-6" />
            </button>
            <Link href="/" className="text-2xl font-black tracking-tighter flex items-center gap-1">
              <span className="text-gray-900">LAUNDRY</span>
              <span className="text-blue-600">MALL</span>
            </Link>
          </div>
          
          {/* Desktop Search */}
          <div className="hidden sm:flex flex-1 max-w-xl px-12">
            <div className="relative w-full group">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full border-2 border-gray-200 rounded-full py-2.5 px-6 focus:outline-none focus:border-blue-500 transition shadow-sm"
              />
              <button className="absolute right-2 top-1.5 bottom-1.5 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <button className="text-gray-600 hover:text-blue-600 flex flex-col items-center gap-1 transition">
              <User className="w-6 h-6" />
              <span className="text-xs font-medium hidden sm:block">Account</span>
            </button>
            <button 
              onClick={() => setIsOpen(true)}
              className="text-gray-600 hover:text-blue-600 flex flex-col items-center gap-1 transition relative group"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium hidden sm:block">Cart</span>
              {mounted && itemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white">
                  {itemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Categories Bar */}
      <div className="hidden sm:block border-t border-gray-100 bg-gray-50/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex space-x-8 py-3 text-sm font-semibold text-gray-600">
            <li><Link href="/" className="hover:text-blue-600 transition">About Us</Link></li>
            <li><Link href="/products" className="hover:text-blue-600 transition">All Products</Link></li>
            <li><Link href="/products?category=COVID-19" className="hover:text-blue-600 transition">COVID-19</Link></li>
            <li><Link href="/products?category=Hangers" className="hover:text-blue-600 transition">Hangers</Link></li>
            <li><Link href="/products?category=Chemicals" className="hover:text-blue-600 transition">Chemicals</Link></li>
            <li><Link href="/products?category=Accessories" className="hover:text-blue-600 transition">Accessories</Link></li>
            <li><Link href="/products?category=Machinery" className="hover:text-blue-600 transition">Machinery</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
