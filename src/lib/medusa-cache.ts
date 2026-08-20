import { medusaClient } from "./medusa";
import { unstable_cache } from "next/cache";

export const getCachedRegions = unstable_cache(
  async () => {
    const { regions } = await medusaClient.store.region.list();
    return regions;
  },
  ['medusa-regions'],
  { revalidate: 3600 }
);

export const getCachedCollections = unstable_cache(
  async () => {
    const { collections } = await medusaClient.store.collection.list();
    return collections;
  },
  ['medusa-collections'],
  { revalidate: 3600 }
);

export const getCachedProducts = unstable_cache(
  async (regionId: string) => {
    const { products } = await medusaClient.store.product.list({ 
      limit: 200,
      region_id: regionId 
    });
    return products;
  },
  ['medusa-products'],
  { revalidate: 60 }
);
