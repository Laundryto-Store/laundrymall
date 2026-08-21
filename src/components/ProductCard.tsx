import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  const price = product.price;

  return (
    <div className="group flex flex-col bg-white rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] overflow-hidden">
      <Link href={'/products/' + product.id} className="relative aspect-square w-full bg-[#f4f4f5] overflow-hidden rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.category && (
          <div className="absolute top-4 left-4 z-20">
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm tracking-wide uppercase">
              {product.category}
            </span>
          </div>
        )}
      </Link>
      
      <div className="p-6 flex flex-col flex-1 border border-t-0 border-gray-100 rounded-b-3xl">
        <div className="flex justify-between items-start mb-3 gap-2">
          <Link href={'/products/' + product.id} className="group-hover:text-blue-600 transition-colors">
            <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2">{product.name}</h3>
          </Link>
          <span className="text-lg font-black text-gray-900 tracking-tight shrink-0">
            ₹{price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-6 font-medium leading-relaxed">
          {product.description}
        </p>
        
        <div className="mt-auto pt-4 border-t border-gray-50">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
