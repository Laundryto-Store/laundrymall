import { test, expect } from '@playwright/test';

test.describe('E2E Checkout Flow', () => {
  test('should successfully navigate and complete checkout without hitting production backend', async ({ page }) => {
    // 1. Intercept the checkout Server Action / API call to prevent hitting the real Medusa Backend
    await page.route('**/checkout', async (route) => {
      // Mock a successful JSON response
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Order simulated perfectly' }),
      });
    });

    // We also intercept Medusa API calls if the frontend tries to call it directly from the client
    await page.route('**/store/carts*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ cart: { id: 'mock_cart_123', items: [] } }),
      });
    });

    // 2. Start the user journey on the homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/LaundryTO/);

    // 3. Navigate to products page
    await page.click('text=Shop Now');
    await expect(page).toHaveURL(/.*products/);

    // 4. Add the first product to the cart
    // Wait for product cards to load
    await page.waitForSelector('button:has-text("Add to Cart")');
    const addToCartButtons = await page.$$('button:has-text("Add to Cart")');
    if (addToCartButtons.length > 0) {
      await addToCartButtons[0].click();
    }

    // 5. Open the cart drawer
    // The cart should automatically open when an item is added in our UI, but let's be sure
    await page.waitForSelector('text=Proceed to Checkout', { state: 'visible' });

    // 6. Go to Checkout page
    await page.click('text=Proceed to Checkout');
    await expect(page).toHaveURL(/.*checkout/);

    // 7. Fill out the checkout form
    await page.fill('input[name="first_name"]', 'Test');
    await page.fill('input[name="last_name"]', 'Robot');
    await page.fill('input[name="email"]', 'robot@test.com');
    await page.fill('input[name="address_1"]', '123 QA Automation St');
    await page.fill('input[name="city"]', 'Ahmedabad');
    await page.fill('input[name="postal_code"]', '380001');

    // 8. Submit the order
    await page.click('button:has-text("Place Order")');

    // 9. Verify success
    // Because we mocked the API, it should instantly succeed and show the success message
    await expect(page.locator('text=Order Placed Successfully!')).toBeVisible();
  });
});
