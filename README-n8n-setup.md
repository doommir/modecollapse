# N8N Screenshot Automation Setup

This guide will help you set up the automated screenshot capture workflow for AI tools using n8n and Puppeteer.

## 📋 Prerequisites

1. **n8n installed locally**
   ```bash
   npm install -g n8n
   ```

2. **Puppeteer dependencies**
   ```bash
   npm install puppeteer
   ```

3. **Airtable API access**
   - API Key: `patWfLPuYaxElIicK.e045d53bb30110d8c1b38d086b6a26da304d946db3fb484cc637ad7506b507a2`
   - Base ID: `app5uaiaf6Kyced64`

## 🚀 Setup Instructions

### Step 1: Start n8n
```bash
n8n start
```
Access n8n at: http://localhost:5678

### Step 2: Import Workflow
1. In n8n, go to **Workflows** → **Import from file**
2. Upload `n8n-screenshot-workflow.json`
3. The workflow will be imported with all nodes configured

### Step 3: Configure Credentials

#### Airtable API Token
1. Go to **Credentials** → **Add credential**
2. Select **Airtable Token API**
3. Enter your API token: `patWfLPuYaxElIicK.e045d53bb30110d8c1b38d086b6a26da304d946db3fb484cc637ad7506b507a2`
4. Save as "Airtable API Token"

### Step 4: Add screenshotUrl Field to Airtable
1. Open your Airtable base: https://airtable.com/app5uaiaf6Kyced64
2. Go to "Mode Collapse Tools" table
3. Add a new field:
   - **Name**: `screenshotUrl`
   - **Type**: Single line text
   - **Description**: "URL path to tool screenshot image"

### Step 5: Test the Workflow

#### Option A: Manual Test
1. In n8n, open the imported workflow
2. Click the **Manual Trigger** node
3. Click **Execute Workflow**
4. Monitor the execution in real-time

#### Option B: Standalone Test (Recommended First)
```bash
# Install Puppeteer if not already installed
npm install puppeteer

# Run the standalone test script
node standalone-screenshot-test.js
```

This will test screenshot capture for Claude, ChatGPT, and Cursor.

## 🔧 Workflow Components

### 1. Schedule Trigger
- **Frequency**: Every 24 hours (configurable)
- **Time**: Can be set to run at specific times (e.g., 2 AM)

### 2. Airtable - Get Tools Without Screenshots
- **Operation**: List records
- **Filter**: `IF({screenshotUrl} = BLANK(), TRUE(), FALSE())`
- **Purpose**: Only processes tools missing screenshots

### 3. Code Node - Capture Screenshots
- **Technology**: Puppeteer
- **Viewport**: 1280x720
- **Features**:
  - Cookie banner removal
  - Timeout handling (15s)
  - Error handling
  - Slug generation from tool names
  - Duplicate detection

### 4. Filter Successful Screenshots
- **Purpose**: Only pass through successful captures
- **Condition**: `status = "success"`

### 5. Airtable - Update Screenshot URLs
- **Operation**: Update records
- **Field**: `screenshotUrl`
- **Value**: `/screenshots/{slug}.png`

### 6. Notification Webhook (Optional)
- **URL**: `http://localhost:5678/webhook/screenshot-complete`
- **Purpose**: Notify when automation completes

## 📁 File Structure

```
/Users/dada/Desktop/modecollapse-new/
├── public/screenshots/           # Screenshot storage
│   ├── .gitkeep
│   ├── claude.png               # Generated screenshots
│   ├── chatgpt.png
│   └── cursor.png
├── n8n-screenshot-workflow.json # n8n workflow
├── standalone-screenshot-test.js # Test script
└── README-n8n-setup.md         # This file
```

## 🌐 Frontend Integration

Screenshots will be accessible at:
```
https://modecollapse.io/screenshots/{slug}.png
```

In your React components:
```jsx
<img 
  src={tool.screenshotUrl} 
  alt={`${tool.name} screenshot`}
  className="w-full h-48 object-cover rounded-lg"
/>
```

## ⚙️ Configuration Options

### Modify Screenshot Settings
Edit the Code node to change:
- **Viewport size**: `width: 1280, height: 720`
- **Timeout**: `timeout: 15000` (15 seconds)
- **Image quality**: `quality: 90`
- **Full page**: `fullPage: false`

### Schedule Settings
- **Daily**: `interval: [{ field: "hours", hoursInterval: 24 }]`
- **Weekly**: `interval: [{ field: "days", daysInterval: 7 }]`
- **Custom time**: Add `time` parameter

### Error Handling
The workflow includes:
- ✅ Network timeout handling
- ✅ Cookie banner removal
- ✅ Duplicate screenshot detection
- ✅ Graceful error logging
- ✅ Retry-friendly design

## 🚨 Troubleshooting

### Common Issues

1. **Puppeteer fails to launch**
   ```bash
   # Install Chrome dependencies (Linux)
   sudo apt-get install -y chromium-browser
   
   # Or use bundled Chromium
   npm install puppeteer --unsafe-perm=true
   ```

2. **Screenshots are blank**
   - Increase `waitForTimeout` to 5000ms
   - Check if the site blocks automation
   - Verify the URL is accessible

3. **Airtable authentication fails**
   - Verify API token in n8n credentials
   - Check base ID matches your Airtable base
   - Ensure `screenshotUrl` field exists

4. **Permission errors**
   ```bash
   # Ensure screenshots directory is writable
   chmod 755 public/screenshots
   ```

## 📊 Monitoring

### View Execution History
1. In n8n, go to **Executions**
2. Filter by workflow name: "AI Tools Screenshot Automation"
3. Click any execution to see detailed logs

### Check Screenshot Files
```bash
ls -la public/screenshots/
```

### Verify Airtable Updates
Check your Airtable base to confirm `screenshotUrl` fields are populated.

## 🔄 Advanced Features

### Add Retry Logic
Modify the Code node to retry failed screenshots:
```javascript
const maxRetries = 3;
for (let attempt = 1; attempt <= maxRetries; attempt++) {
  try {
    // Screenshot code here
    break; // Success, exit retry loop
  } catch (error) {
    if (attempt === maxRetries) throw error;
    await new Promise(r => setTimeout(r, 5000)); // Wait 5s before retry
  }
}
```

### Multiple Screenshot Sizes
Capture different viewport sizes:
```javascript
const viewports = [
  { width: 1280, height: 720, suffix: '' },
  { width: 768, height: 432, suffix: '-mobile' }
];
```

### Upload to CDN
Replace local file saving with Cloudinary/Supabase upload for production use.

## ✅ Success Indicators

Your workflow is working correctly when:
- ✅ Screenshots appear in `public/screenshots/`
- ✅ Airtable records have populated `screenshotUrl` fields
- ✅ Images are accessible at `https://modecollapse.io/screenshots/{slug}.png`
- ✅ n8n execution history shows successful runs
- ✅ No error logs in n8n console

---

**Next Steps**: Once verified, enable the schedule trigger for automated daily screenshot updates!