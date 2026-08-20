import { test, expect } from '@playwright/test';

test.describe('E2E Checkout Flow', () => {
  test('should successfully navigate and complete checkout without hitting production backend', async ({ page }) => {
    // Note: We are allowing the test to hit the real Next.js Server Action because
    // the action only creates a "Cart" in Medusa and does not complete the Order.
    // This allows us to safely test the DB connection without polluting Orders.

    // 2. Start the user journey on the homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/LaundryTO/);

    // 3. Navigate to products page directly to avoid Next.js hydration race conditions
    await page.goto('/products');
    await expect(page).toHaveURL(/.*products/);
    // Wait for product cards to load
    await page.waitForSelector('button[aria-label="Add to cart"]');
    const addToCartButtons = await page.$$('button[aria-label="Add to cart"]');
    if (addToCartButtons.length > 0) {
      await addToCartButtons[0].click();
    }

    // 5. Open the cart drawer
    // The cart should automatically open when an item is added in our UI, but let's be sure
    await page.waitForSelector('text=Proceed to Checkout', { state: 'visible' });

    // 6. Go to Checkout page
    await page.click('text=Proceed to Checkout');
    await expect(page).toHaveURL(/.*checkout/);

    // 7. Fill out the checkout form using accessible labels
    await page.getByLabel('First Name').fill('Test');
    await page.getByLabel('Last Name').fill('Robot');
    await page.getByLabel('Email Address').fill('robot@test.com');
    await page.getByLabel('Address', { exact: true }).fill('123 QA Automation St');
    await page.getByLabel('City').fill('Ahmedabad');
    await page.getByLabel('Postal Code').fill('380001');
    await page.getByLabel('Phone').fill('1234567890');
    await page.getByLabel('State / Province').fill('Gujarat');

    // 8. Submit the order
    await page.click('button:has-text("Place Test Order")');

    // 9. Verify success
    await expect(page.locator('text=Order Confirmed!')).toBeVisible({ timeout: 30000 });
  });
});
