import Image from "next/image";
import Link from "next/link";
import { Check, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getCachedFrontendProduct } from "@/lib/medusa-cache";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = await getCachedFrontendProduct(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6 flex text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=` + encodeURIComponent(product.category)} className="hover:text-blue-600">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 bg-white p-6 md:p-8 border border-gray-200 rounded-xl">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 p-8">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-8 hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="text-[10px] text-blue-600 font-bold tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-md self-start mb-4">
            {product.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-100">
            <span className="text-4xl font-black text-blue-600">
              ?{product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-400 line-through mb-1">
                ?{product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-bold tracking-wider px-3 py-1 rounded-full mb-2 uppercase">
                Sale
              </span>
            )}
          </div>

          <div className="prose prose-sm text-gray-500 mb-8">
            <p className="text-lg leading-relaxed">{product.description}</p>
          </div>

          <AddToCartButton product={product} />

          {/* Value Props */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-100 text-sm text-gray-600 font-medium">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 p-2 rounded-full"><Check className="w-4 h-4 text-emerald-600" /></div> In Stock
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2 rounded-full"><ShieldCheck className="w-4 h-4 text-blue-600" /></div> LaundryMall Quality
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-gray-50 p-2 rounded-full"><Truck className="w-4 h-4 text-gray-600" /></div> Dispatch in 48h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
