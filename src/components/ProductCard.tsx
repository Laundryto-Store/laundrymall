"use client";

import { Product } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to the product page
    addItem(product, 1);
  };

  return (
    <Link href={`/products/${product.id}`} className="group bg-white rounded-2xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-blue-100 relative">
      <div className="relative aspect-[4/3] bg-gray-50 overflow-hidden p-4 flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full z-20 shadow-sm">
            Sale
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow bg-white z-20">
        <div className="flex justify-between items-start mb-2">
          <div className="text-[10px] text-blue-600 font-bold tracking-widest uppercase bg-blue-50 px-2 py-1 rounded-md">{product.category}</div>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors text-lg">{product.name}</h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">Rs. {product.originalPrice.toFixed(2)}</span>
            )}
            <span className="text-xl font-black text-gray-900">₹{product.price.toFixed(2)}</span>
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-gray-50 hover:bg-blue-600 hover:text-white text-gray-900 p-3 rounded-xl transition-all duration-300 shadow-sm hover:shadow-blue-600/30 group-hover:rotate-12"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
