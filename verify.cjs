const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 } // iPhone X viewport
  });

  await page.goto('http://localhost:4173');

  // Wait for the hero image to load
  await page.waitForLoadState('networkidle');

  await page.screenshot({ path: '/app/mobile_home.png', fullPage: true });

  // Open search overlay
  await page.click('nav.fixed.bottom-0 button');
  await page.waitForTimeout(500); // Wait for animation

  await page.screenshot({ path: '/app/mobile_search.png' });

  await browser.close();
  console.log("Screenshots captured successfully.");
})();
