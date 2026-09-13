import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 375, height: 812 }, // iPhone X viewport
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
  });
  const page = await context.newPage();

  console.log("Navigating to preview server...");
  await page.goto('http://localhost:4173');

  console.log("Taking screenshot of Home Page...");
  await page.screenshot({ path: 'home-mobile.png', fullPage: true });

  console.log("Testing search overlay...");
  // Click on the mobile search button in bottom nav
  await page.locator('nav.fixed.bottom-0 button').filter({ hasText: 'Search' }).click();
  await page.waitForTimeout(1000); // Wait for animation

  console.log("Taking screenshot of Search Overlay...");
  await page.screenshot({ path: 'search-mobile.png' });

  // Type something
  await page.keyboard.type('bicep');
  await page.waitForTimeout(1000); // Wait for suggestions

  // Close search
  await page.locator('.fixed.inset-0 button').filter({ hasText: '' }).first().click();
  await page.waitForTimeout(1000);

  // Navigate to an exercise detail page (assuming the first link is an exercise)
  console.log("Navigating to Exercise Detail...");
  await page.locator('a[href^="/exercise/"]').first().click();
  await page.waitForTimeout(2000); // Wait for data and animations

  console.log("Taking screenshot of Exercise Detail...");
  await page.screenshot({ path: 'exercise-detail-mobile.png', fullPage: true });

  await browser.close();
  console.log("Verification complete.");
})();
