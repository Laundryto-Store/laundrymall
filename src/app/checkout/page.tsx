"use client";

import { useCartStore } from "@/store/cartStore";
import { useEffect, useState } from "react";
import { medusaClient } from "@/lib/medusa";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { processCheckoutOnServer } from "@/app/actions";

export default function CheckoutPage() {
  const { items, cartTotal, clearCart } = useCartStore();
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
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

  // Hydration fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");
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
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-blue-600 hover:underline">
          Return to shop
        </Link>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-8 text-lg">Thank you for your purchase. We have received your order.</p>
        <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column - Form */}
        <div className="lg:w-2/3">
          <form onSubmit={handleCheckout} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Contact Information</h2>
            <div className="mb-8">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                id="email" name="email" required type="email" 
                value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <h2 className="text-xl font-semibold mb-6 pb-2 border-b">Shipping Address</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div>
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input id="first_name" name="first_name" required type="text" value={form.first_name} onChange={e => setForm({...form, first_name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input id="last_name" name="last_name" required type="text" value={form.last_name} onChange={e => setForm({...form, last_name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address_1" className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input id="address_1" name="address_1" required type="text" value={form.address_1} onChange={e => setForm({...form, address_1: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input id="city" name="city" required type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">State / Province</label>
                <input id="province" name="province" required type="text" value={form.province} onChange={e => setForm({...form, province: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input id="postal_code" name="postal_code" required type="text" value={form.postal_code} onChange={e => setForm({...form, postal_code: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input id="phone" name="phone" required type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
            </div>

            {errorMessage && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
                {errorMessage}
              </div>
            )}

            <button 
              type="submit" 
              disabled={status === "processing"}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20"
            >
              {status === "processing" ? (
                <><Loader2 className="w-6 h-6 animate-spin mr-2" /> Processing Order...</>
              ) : (
                <>Place Test Order <ArrowRight className="w-5 h-5 ml-2" /></>
              )}
            </button>
          </form>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-8 rounded-2xl sticky top-8 border border-gray-200">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 relative bg-white rounded-md border flex-shrink-0 overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold whitespace-nowrap">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>Rs. {cartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated next step</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-end">
              <span className="font-semibold text-lg">Total</span>
              <span className="text-2xl font-bold text-blue-600">Rs. {cartTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
