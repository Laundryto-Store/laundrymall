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
    <Link href={`/products/${product.id}`} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {product.originalPrice && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full z-10 shadow-sm">
            SALE
          </div>
        )}
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-blue-600 font-bold tracking-wider uppercase mb-1.5">{product.category}</div>
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">{product.name}</h3>
        <div className="mt-auto pt-4 flex items-end justify-between">
          <div>
            <span className="text-xl font-black text-gray-900">Rs. {product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">Rs. {product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button 
            onClick={handleAddToCart}
            className="bg-gray-100 hover:bg-blue-600 hover:text-white text-gray-900 p-2.5 rounded-full transition-colors shadow-sm"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </Link>
  );
}
