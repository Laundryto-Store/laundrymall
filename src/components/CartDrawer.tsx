"use client";

import { useCartStore } from "@/store/cartStore";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartDrawer() {
  const { isOpen, setIsOpen, items, removeItem, updateQuantity, cartTotal } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 z-50 transition-opacity backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer */}
      <div 
        className={ixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-50 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.32,0.72,0,1) flex flex-col }
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white z-10">
          <div className="flex items-center gap-3 text-xl font-bold text-gray-900 tracking-tight">
            <div className="bg-blue-50 p-2 rounded-full text-blue-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            Your Cart <span className="text-gray-400 font-medium text-sm ml-1">({items.length} items)</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-xs mx-auto">
              <div className="bg-blue-50 p-6 rounded-full mb-6">
                <ShoppingBag className="w-12 h-12 text-blue-300" />
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Your cart is empty</p>
              <p className="text-gray-500 mb-8">Looks like you haven't added any LaundryMall supplies yet.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-all shadow-[0_8px_30px_rgb(59,130,246,0.2)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.4)] hover:-translate-y-0.5"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {items.map((item) => (
                <div key={item.id} className="flex gap-5 bg-white p-4 rounded-2xl border border-gray-100 relative group shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div className="pr-6">
                      <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">{item.category}</p>
                      <h4 className="font-bold text-gray-900 leading-snug line-clamp-2">{item.name}</h4>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button 
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-1.5 text-gray-500 hover:text-blue-600 hover:bg-white transition-colors font-medium rounded-l-lg"
                        >-</button>
                        <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1.5 text-gray-500 hover:text-blue-600 hover:bg-white transition-colors font-medium rounded-r-lg"
                        >+</button>
                      </div>
                      <div className="font-black text-gray-900 tracking-tight">
                        ?{(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-white z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-end mb-2">
              <span className="text-gray-500 font-medium">Subtotal</span>
              <span className="text-3xl font-black text-gray-900 tracking-tight">?{cartTotal().toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500 mb-6 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
              Taxes & shipping calculated at checkout
            </p>
            <Link 
              href="/checkout"
              onClick={() => setIsOpen(false)}
              className="w-full bg-blue-600 text-white font-bold py-4.5 px-4 rounded-xl hover:bg-blue-700 transition-all shadow-[0_8px_30px_rgb(59,130,246,0.3)] hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 group"
            >
              Secure Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
