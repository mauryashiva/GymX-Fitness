const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({
    viewport: { width: 375, height: 812 } // Mobile Viewport
  });

  try {
    await page.goto('http://localhost:4173');
    await page.waitForTimeout(1000); // Wait for initial load
    console.log("Successfully loaded the app on mobile viewport");

    // Click search on bottom nav
    await page.click('nav.fixed.bottom-0 button');
    await page.waitForTimeout(500); // Wait for overlay animation
    console.log("Successfully opened mobile search overlay");

    // Type and search
    await page.fill('.fixed.inset-0 input[type="text"]', 'squat');
    await page.waitForTimeout(1000);
    // Click on suggestion to close overlay
    await page.click('.fixed.inset-0 li:first-child');
    await page.waitForTimeout(1000);
    console.log("Successfully selected a suggestion and navigated");

    // Click on an exercise card
    const firstCard = await page.$('a[href^="/exercise/"]');
    if (firstCard) {
      await firstCard.click();
      await page.waitForTimeout(1500);
      console.log("Successfully opened exercise details");
    } else {
      console.error("No exercise card found");
    }

  } catch (error) {
    console.error("Error during E2E test:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();