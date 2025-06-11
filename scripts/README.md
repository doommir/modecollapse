# Screenshot Capture Scripts

## Usage

To capture fresh screenshots of all tools:

1. Install puppeteer: `npm install puppeteer --save-dev`
2. Run the capture script: `node scripts/capture-screenshots.js`  
3. Remove puppeteer: `npm uninstall puppeteer`

The script will:
- Create `/public/screenshots/` directory
- Capture 1200x675 screenshots of each tool's landing page
- Save them as PNG files named by tool slug
- Update the tool data to use local screenshots instead of placeholder images

## Adding New Tools

When adding new tools to capture:

1. Add the tool to the `tools` array in `capture-screenshots.js`
2. Run the script to capture the new screenshot
3. Update the tool data in `lib/tools.ts` to use the new screenshot path

## Screenshot Specifications

- **Resolution**: 1200x675 (16:9 aspect ratio)
- **Format**: PNG
- **Viewport**: 1200x800 with top section captured
- **Loading**: 3-second wait for animations/dynamic content