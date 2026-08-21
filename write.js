const fs = require('fs');

const code = 
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
      <nav className={\pointer-events-auto max-w-6xl mx-auto backdrop-blur-2xl border shadow-2xl rounded-full px-6 py-3 flex items-center justify-between transition-colors duration-500 \\}>
        
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className={\w-8 h-8 rounded-full flex items-center justify-center transition-all \ group-hover:scale-105\}>
              <Package className={\w-4 h-4 \\} />
            </div>
            <span className={\	ext-xl font-black tracking-tighter transition-colors \\}>
              Laundry<span className={isDark ? 'text-gray-400' : 'text-blue-600'}>Mall</span>
            </span>
          </Link>
          
          {/* Desktop Links */}
          <div className={\hidden md:flex items-center gap-6 text-sm font-bold \\}>
            <Link href="/products" className={\	ransition-colors \\}>Shop</Link>
            <Link href={'/products?category=Machinery'} className={\	ransition-colors \\}>Machinery</Link>
            <Link href={'/products?category=Detergent%20Chemicals'} className={\	ransition-colors \\}>Chemicals</Link>
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
              <Search className={\h-4 w-4 transition-colors \\} />
            </div>
            <input
              name="search"
              type="text"
              className={\lock w-full pl-10 pr-3 py-2 rounded-full leading-5 focus:outline-none transition-all sm:text-sm font-medium \\}
              placeholder="Search products..."
            />
          </form>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <Link 
            href={mounted && user ? "/account" : "/login"} 
            className={\hidden sm:flex items-center gap-2 px-4 py-2 rounded-full transition-colors text-sm font-bold \\}
          >
            <User className="w-4 h-4" />
            <span>{mounted && user ? user.first_name : "Sign In"}</span>
          </Link>
          
          <button 
            onClick={() => setIsOpen(true)}
            className={\elative p-2.5 rounded-full transition-transform hover:scale-105 active:scale-95 flex items-center justify-center \\}
          >
            <ShoppingCart className="w-4 h-4" />
            {mounted && itemCount() > 0 && (
              <span className={\bsolute -top-1 -right-1 text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold border-2 \\}>
                {itemCount()}
              </span>
            )}
          </button>

          <button className={\sm:hidden p-2 \\}>
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>
    </header>
  );
}
;

fs.writeFileSync('src/components/Navbar.tsx', code);
