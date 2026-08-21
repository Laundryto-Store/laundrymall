"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Package, User, MapPin, Settings, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AccountPage() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (mounted && !user) {
      router.push("/login");
    }
  }, [user, mounted, router]);

  if (!mounted || !user) return null;

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Account</h1>
          <p className="text-gray-500 mt-1">Manage your orders and business details.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="space-y-2">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-3 shadow-sm">
              {user.first_name.charAt(0)}{user.last_name.charAt(0)}
            </div>
            <h2 className="font-bold text-gray-900 text-lg">{user.first_name} {user.last_name}</h2>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
          
          <nav className="flex flex-col space-y-1">
            <Link href="#" className="flex items-center justify-between px-4 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]">
              <div className="flex items-center gap-3"><Package className="w-5 h-5" /> Orders</div>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="#" className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">
              <div className="flex items-center gap-3"><User className="w-5 h-5" /> Profile</div>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="#" className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">
              <div className="flex items-center gap-3"><MapPin className="w-5 h-5" /> Addresses</div>
              <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="#" className="flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition">
              <div className="flex items-center gap-3"><Settings className="w-5 h-5" /> Settings</div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-blue-600" /> Recent Orders
            </h3>
            
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-gray-100">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1">No orders yet</h4>
              <p className="text-gray-500 max-w-sm mx-auto mb-6">Looks like you haven&apos;t placed any wholesale orders with LaundryMall yet.</p>
              <Link href="/products" className="inline-flex bg-blue-600 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-blue-700 transition shadow-sm">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
