"use server";

import { medusaClient } from "@/lib/medusa";
import { CheckoutForm, MedusaRegion } from "@/types/medusa";
import { Product } from "@/data/products";

// We define a CartItem type for what the frontend passes in
export interface CartItem extends Product {
  quantity: number;
}

export async function processCheckoutOnServer(items: CartItem[], form: CheckoutForm) {
  try {
    // 1. Fetch Region
    const { regions } = await medusaClient.store.region.list() as { regions: MedusaRegion[] };
    const indiaRegion = regions.find((r) => r.currency_code === "inr") || regions[0];

    // 2. Create Cart
    const cartResp = await medusaClient.store.cart.create({ 
      region_id: indiaRegion?.id 
    });
    const cartId = cartResp.cart.id;

    // 3. Add Line Items
    for (const item of items) {
      if (item.variantId) {
        await medusaClient.store.cart.createLineItem(cartId, {
          variant_id: item.variantId,
          quantity: item.quantity
        });
      }
    }

    // 4. Update Cart with Email & Shipping Address
    await medusaClient.store.cart.update(cartId, {
      email: form.email,
      shipping_address: {
        first_name: form.first_name,
        last_name: form.last_name,
        address_1: form.address_1,
        city: form.city,
        province: form.province,
        postal_code: form.postal_code,
        phone: form.phone,
        country_code: "in"
      }
    });

    // Simulate payment completion
    await new Promise(resolve => setTimeout(resolve, 1000));

    return { success: true, cartId };
  } catch (error: unknown) {
    console.error("Server checkout error:", error);
    const msg = error instanceof Error ? error.message : "Failed to process checkout";
    return { success: false, error: msg };
  }
}
