import { medusaClient } from "@/lib/medusa";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Product } from "@/data/products";

// Adapter to convert Medusa API product to our frontend format
function adaptProduct(medusaProduct: any, collections: any[]): Product {
  const price = medusaProduct.variants?.[0]?.calculated_price?.calculated_amount || 0;
  
  // Find collection title by matching collection_id
  const collection = collections.find(c => c.id === medusaProduct.collection_id);
  const categoryName = collection?.title || "Uncategorized";
  
  return {
    id: medusaProduct.id,
    variantId: medusaProduct.variants?.[0]?.id,
    name: medusaProduct.title,
    category: categoryName,
    price: price, 
    image: medusaProduct.thumbnail || "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=600&auto=format&fit=crop", 
    description: medusaProduct.description || "Laundry Mall Product",
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category;
  
  // Fetch region to get correct pricing
  const { regions } = await medusaClient.store.region.list();
  const indiaRegion = regions.find((r: any) => r.currency_code === "inr") || regions[0];

  // Fetch live products from Medusa (V2 SDK structure)
  const { products } = await medusaClient.store.product.list({ 
    limit: 200,
    region_id: indiaRegion?.id 
  });
  const { collections } = await medusaClient.store.collection.list();
  
  const frontendProducts = products.map((p: any) => adaptProduct(p, collections));

  const filteredProducts = selectedCategory
    ? frontendProducts.filter((p: any) => p.category === selectedCategory)
    : frontendProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="font-bold text-lg text-gray-900 mb-4">Categories</h2>
          <ul className="space-y-2 text-sm max-h-[70vh] overflow-y-auto">
            <li>
              <Link 
                href="/products"
                className={`block py-1 ${!selectedCategory ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
              >
                All Products
              </Link>
            </li>
            {collections.map((collection: any) => (
              <li key={collection.id}>
                <Link 
                  href={`/products?category=${encodeURIComponent(collection.title)}`}
                  className={`block py-1 ${selectedCategory === collection.title ? 'text-blue-600 font-semibold' : 'text-gray-600 hover:text-blue-600'}`}
                >
                  {collection.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <div className="mb-6 pb-4 border-b border-gray-200 flex justify-between items-end">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedCategory ? selectedCategory : "All Products"}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Showing {filteredProducts.length} results</p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
            <h3 className="text-lg font-medium text-gray-900">No products found</h3>
            <p className="text-gray-500 mt-1">Try selecting a different category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
