"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Lock, ShieldCheck, ChevronRight, ShoppingBag, X } from "lucide-react";
import { processCheckoutOnServer } from "../actions";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    address_1: "",
    city: "",
    province: "",
    postal_code: "",
    phone: ""
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await processCheckoutOnServer(items, form);
      
      if (result.success) {
        setStatus("success");
        clearCart();
      } else {
        setErrorMessage(result.error || "Checkout failed");
        setStatus("error");
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(errorMsg);
      setStatus("error");
    }
  };

  if (!isMounted) return null;

  if (items.length === 0 && status !== "success") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="bg-gray-50 p-6 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-gray-300" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Your cart is empty</h1>
        <p className="text-gray-500 mb-8 max-w-sm text-center">Add some premium franchise supplies to your cart to checkout.</p>
        <Link href="/products" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 transition shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:-translate-y-1">
          Return to Shop
        </Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-green-500 blur-2xl opacity-20 rounded-full"></div>
          <CheckCircle className="w-24 h-24 text-green-500 relative z-10" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">Order Confirmed!</h1>
        <p className="text-gray-600 mb-10 text-lg max-w-md font-medium">
          Thank you for choosing LaundryMall. Your enterprise supplies are being prepared for dispatch.
        </p>
        <Link href="/products" className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition shadow-lg hover:-translate-y-1">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Checkout Header */}
      <header className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter text-blue-600">Laundry<span className="text-gray-900">Mall</span></span>
          </Link>
          <div className="flex items-center text-sm font-semibold text-gray-500 gap-2">
            <Lock className="w-4 h-4 text-gray-400" /> SSL SECURE CHECKOUT
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-medium">
          <Link href="/products" className="hover:text-blue-600">Cart</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Information & Shipping</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-400">Payment (Coming Soon)</span>
        </nav>

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl font-medium flex items-center gap-3">
            <div className="bg-red-100 p-1.5 rounded-full"><X className="w-4 h-4" /></div>
            {errorMessage}
          </div>
        )}
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Form */}
          <div className="lg:w-3/5">
            <form onSubmit={handleCheckout} className="bg-white p-8 sm:p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
              
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Contact</h2>
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input 
                    id="email" name="email" required type="email" placeholder="store@laundrymall.com"
                    value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 tracking-tight">Shipping Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-bold text-gray-700 mb-2">First Name</label>
                    <input 
                      id="firstName" name="first_name" required type="text" 
                      value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-bold text-gray-700 mb-2">Last Name</label>
                    <input 
                      id="lastName" name="last_name" required type="text" 
                      value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="address" className="block text-sm font-bold text-gray-700 mb-2">Address</label>
                  <input 
                    id="address" name="address_1" required type="text" placeholder="Store street address"
                    value={form.address_1} onChange={e => setForm({...form, address_1: e.target.value})}
                    className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                  <div className="sm:col-span-2">
                    <label htmlFor="city" className="block text-sm font-bold text-gray-700 mb-2">City</label>
                    <input 
                      id="city" name="city" required type="text" 
                      value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="postal" className="block text-sm font-bold text-gray-700 mb-2">PIN Code</label>
                    <input 
                      id="postal" name="postal_code" required type="text" 
                      value={form.postal_code} onChange={e => setForm({...form, postal_code: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="province" className="block text-sm font-bold text-gray-700 mb-2">State</label>
                    <input 
                      id="province" name="province" required type="text" 
                      value={form.province} onChange={e => setForm({...form, province: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                    <input 
                      id="phone" name="phone" required type="tel" 
                      value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                      className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-medium"
                    />
                  </div>
                </div>
              </div>
              
              <button 
                type="submit" 
                disabled={status === "loading"}
                className={`w-full bg-blue-600 text-white font-bold py-5 rounded-xl transition-all shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 text-lg ${
                  status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Processing Order...
                  </>
                ) : (
                  <>Complete Order (BETA) <Lock className="w-5 h-5" /></>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:w-2/5">
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 tracking-tight">Order Summary</h2>
              
              <div className="max-h-[350px] overflow-y-auto pr-2 mb-6 space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 shrink-0">
                      <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center z-10">
                        {item.quantity}
                      </div>
                      <Image src={item.image} alt={item.name} fill className="object-contain p-1" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className="font-bold text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹{cartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span className="font-medium text-gray-900">Calculated next step</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Taxes</span>
                  <span className="font-medium text-gray-900">Calculated next step</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 flex justify-between items-end">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-3xl font-black text-gray-900 tracking-tight">
                  <span className="text-sm font-medium text-gray-500 mr-2">INR</span>
                  ₹{cartTotal().toFixed(2)}
                </span>
              </div>

              <div className="mt-8 bg-blue-50/50 rounded-xl p-4 flex gap-3 items-start border border-blue-100/50">
                <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-900 text-sm mb-1">LaundryMall Buyer Protection</h4>
                  <p className="text-xs text-blue-800/70 leading-relaxed">
                    Your purchase is secured with enterprise-grade encryption. 
                    Dedicated B2B support for all your operational needs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
