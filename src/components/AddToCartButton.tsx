"use client";

import { Product } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="mt-auto flex flex-col sm:flex-row gap-4">
      <div className="flex border border-gray-300 rounded-md bg-white">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-3 text-gray-600 hover:bg-gray-100 font-medium"
        >-</button>
        <input 
          type="text" 
          value={quantity} 
          readOnly 
          className="w-16 text-center border-x border-gray-300 focus:outline-none" 
        />
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-3 text-gray-600 hover:bg-gray-100 font-medium"
        >+</button>
      </div>
      <button 
        onClick={handleAddToCart}
        className="flex-1 bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-sm"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>
    </div>
  );
}
