import { getCachedCollections, getCachedFrontendProducts } from "@/lib/medusa-cache";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const selectedCategory = params.category;
  const searchQuery = params.search;
  
  // Fetch live products from Data Access Layer
  const frontendProducts = await getCachedFrontendProducts();
  const collections = await getCachedCollections();
  
  let filteredProducts = frontendProducts;
  
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  }
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter((p) => 
      p.name.toLowerCase().includes(query) || 
      (p.category && p.category.toLowerCase().includes(query))
    );
  }

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
            {collections.map((collection) => (
              <li key={collection.id}>
                <Link 
                  href={`/products?category=` + encodeURIComponent(collection.title)}
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
              {searchQuery ? `Search results for "${searchQuery}"` : (selectedCategory ? selectedCategory : "All Products")}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Showing {filteredProducts.length} results</p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
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
