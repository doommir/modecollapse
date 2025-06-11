const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Tool URLs and their corresponding names
const tools = [
  { name: 'cursor-ai', url: 'https://www.cursor.so' },
  { name: 'claude-ai', url: 'https://claude.ai' },
  { name: 'midjourney', url: 'https://midjourney.com' },
  { name: 'gemini-ai-mode', url: 'https://gemini.google.com' },
  { name: 'veo-3', url: 'https://deepmind.google/technologies/veo/veo-3/' },
  { name: 'notebooklm-plus', url: 'https://notebooklm.google.com' },
  { name: 'project-mariner', url: 'https://deepmind.google/discover/blog/project-mariner/' }
];

async function captureScreenshots() {
  // Create screenshots directory if it doesn't exist
  const screenshotsDir = path.join(__dirname, '../public/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const tool of tools) {
    try {
      console.log(`Capturing screenshot for ${tool.name}...`);
      
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      
      // Set user agent to avoid bot detection
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      // Navigate to the page
      await page.goto(tool.url, { 
        waitUntil: 'networkidle2',
        timeout: 30000 
      });
      
      // Wait a bit for any animations/loading
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, `${tool.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        clip: {
          x: 0,
          y: 0,
          width: 1200,
          height: 675 // 16:9 aspect ratio
        }
      });
      
      console.log(`✅ Screenshot saved: ${screenshotPath}`);
      await page.close();
      
    } catch (error) {
      console.error(`❌ Failed to capture ${tool.name}:`, error.message);
    }
  }

  await browser.close();
  console.log('🎉 Screenshot capture completed!');
}

captureScreenshots().catch(console.error);