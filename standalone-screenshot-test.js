#!/usr/bin/env node

/**
 * Standalone Puppeteer Screenshot Test Script
 * Use this to test screenshot functionality outside of n8n
 * 
 * Usage: node standalone-screenshot-test.js
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Test tools data
const testTools = [
  {
    name: "Claude",
    url: "https://claude.ai",
    slug: "claude"
  },
  {
    name: "ChatGPT",
    url: "https://chat.openai.com",
    slug: "chatgpt"
  },
  {
    name: "Cursor",
    url: "https://cursor.sh",
    slug: "cursor"
  }
];

async function captureScreenshot(tool) {
  const { name, url, slug } = tool;
  const screenshotsDir = path.join(__dirname, 'public', 'screenshots');
  const filename = `${slug}.png`;
  const filePath = path.join(screenshotsDir, filename);
  
  console.log(`📸 Capturing screenshot for ${name}...`);
  console.log(`   URL: ${url}`);
  console.log(`   File: ${filename}`);
  
  try {
    // Ensure screenshots directory exists
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    // Launch browser
    const browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });
    
    const page = await browser.newPage();
    
    // Set viewport and user agent
    await page.setViewport({ 
      width: 1280, 
      height: 720,
      deviceScaleFactor: 1
    });
    
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Navigate with timeout
    await page.goto(url, { 
      waitUntil: 'domcontentloaded', 
      timeout: 15000 
    });
    
    // Wait for dynamic content
    await page.waitForTimeout(3000);
    
    // Hide cookie banners and overlays
    await page.evaluate(() => {
      const selectors = [
        '[class*="cookie"]',
        '[class*="banner"]',
        '[class*="popup"]',
        '[class*="modal"]',
        '[id*="cookie"]',
        '[data-testid*="cookie"]'
      ];
      
      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          if (el.style) el.style.display = 'none';
        });
      });
    });
    
    // Take screenshot
    await page.screenshot({ 
      path: filePath,
      fullPage: false,
      type: 'png',
      quality: 90
    });
    
    await browser.close();
    
    console.log(`✅ Screenshot saved: ${filename}`);
    return {
      success: true,
      filename,
      path: filePath,
      url: `/screenshots/${filename}`
    };
    
  } catch (error) {
    console.error(`❌ Failed to screenshot ${name}: ${error.message}`);
    return {
      success: false,
      error: error.message,
      filename,
      name
    };
  }
}

async function main() {
  console.log('🚀 Starting screenshot capture test...\n');
  
  const results = [];
  
  for (const tool of testTools) {
    const result = await captureScreenshot(tool);
    results.push(result);
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(''); // Empty line for readability
  }
  
  console.log('📊 RESULTS SUMMARY:');
  console.log('===================');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful: ${successful.length}`);
  successful.forEach(r => console.log(`   - ${r.filename}`));
  
  console.log(`❌ Failed: ${failed.length}`);
  failed.forEach(r => console.log(`   - ${r.name}: ${r.error}`));
  
  console.log(`\n🎯 Total processed: ${results.length}`);
  console.log('📁 Screenshots saved to: public/screenshots/');
}

// Run the test
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { captureScreenshot };