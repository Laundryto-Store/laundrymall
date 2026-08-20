import { medusaClient } from "@/lib/medusa";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, ShieldCheck, Truck } from "lucide-react";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { Product } from "@/data/products";

// Adapter to convert Medusa API product to our frontend format
function adaptProduct(medusaProduct: any, collections: any[]): Product {
  const price = medusaProduct.variants?.[0]?.calculated_price?.calculated_amount || 0;
  
  const collection = collections.find(c => c.id === medusaProduct.collection_id);
  
  return {
    id: medusaProduct.id,
    variantId: medusaProduct.variants?.[0]?.id,
    name: medusaProduct.title,
    category: collection?.title || "Uncategorized",
    price: price, 
    image: medusaProduct.thumbnail || "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=600&auto=format&fit=crop",
    description: medusaProduct.description || "Laundry Mall Product",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  let medusaProduct;
  try {
    const { regions } = await medusaClient.store.region.list();
    const indiaRegion = regions.find((r: any) => r.currency_code === "inr") || regions[0];
    
    const response = await medusaClient.store.product.retrieve(params.id, {
      region_id: indiaRegion?.id
    });
    medusaProduct = response.product;
  } catch (error) {
    notFound();
  }

  if (!medusaProduct) {
    notFound();
  }

  const { collections } = await medusaClient.store.collection.list();
  const product = adaptProduct(medusaProduct, collections);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm mb-6 flex text-gray-500">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <span className="mx-2">/</span>
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-blue-600">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">{product.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-12 bg-white p-6 md:p-8 border border-gray-200 rounded-xl">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="text-sm text-blue-600 font-bold tracking-wide uppercase mb-2">
            {product.category}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {product.name}
          </h1>
          
          <div className="flex items-end gap-4 mb-6 pb-6 border-b border-gray-200">
            <span className="text-4xl font-extrabold text-blue-900">
              Rs. {product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-gray-500 line-through mb-1">
                Rs. {product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.originalPrice && (
              <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full mb-2">
                Save Rs. {(product.originalPrice - product.price).toFixed(2)}
              </span>
            )}
          </div>

          <div className="prose prose-sm text-gray-600 mb-8">
            <p className="text-lg">{product.description}</p>
          </div>

          <AddToCartButton product={product} />

          {/* Value Props */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-gray-200 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" /> In Stock & Ready to Ship
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" /> Premium Quality Guaranteed
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-gray-500" /> Fast Delivery Available
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
