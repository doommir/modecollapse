# Airtable Setup for Mode Collapse

This guide explains how to set up Airtable as a CMS for managing AI tools data.

## Step 1: Create Airtable Base

1. Go to [Airtable.com](https://airtable.com) and create an account
2. Create a new base called "Mode Collapse AI Tools"
3. Create two tables:

### Table 1: Tools
Create a table called "Tools" with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| Name | Single line text | Primary field |
| Slug | Single line text | Auto-generated from Name |
| Summary | Long text | For card descriptions |
| Description | Long text | Full tool description |
| URL | URL | Tool's website |
| Tags | Multiple select | Create options: Pro, Free, Creative, Coding, Automation, etc. |
| Consciousness Score | Number | 1-5 rating |
| Curator Note | Long text | Editorial note |
| Screenshot URL | URL | Tool screenshot image |
| Pricing Model | Single select | Options: Free, Freemium, Paid, Open Source |
| Date Added | Date | When tool was added |
| Is Curator Pick | Checkbox | Featured tools |
| Featured | Checkbox | Special featured status |
| Upvotes | Number | Vote count |
| Downvotes | Number | Vote count |
| Special Offer Code | Single line text | Promo codes |
| Special Offer Description | Long text | Offer details |
| Special Offer URL | URL | Offer link |
| Special Offer Discount | Single line text | Discount amount (e.g., "50% off") |
| Special Offer Expiry | Date | When offer expires |
| Consciousness Warning Level | Single select | Options: low, medium, high |
| Consciousness Warning Message | Single line text | Warning text |
| Consciousness Warning Reason | Long text | Warning explanation |
| Status | Single select | Options: Published, Draft, Archived |

### Table 2: Prompt Tips
Create a table called "Prompt Tips" with these fields:

| Field Name | Field Type | Options |
|------------|------------|---------|
| Title | Single line text | Primary field |
| Snippet | Long text | The actual prompt |
| Tool Slug | Multiple select | Link to tool slugs |

## Step 2: Get API Credentials

1. Go to [Airtable API page](https://airtable.com/api)
2. Select your base
3. Copy your Base ID (starts with "app...")
4. Go to [Account page](https://airtable.com/account) 
5. Generate a Personal Access Token
6. Copy the token (starts with "pat...")

## Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Add your Airtable credentials to `.env.local`:
```env
AIRTABLE_API_KEY=your_personal_access_token_here
AIRTABLE_BASE_ID=your_base_id_here
```

## Step 4: Add Sample Data

Add some sample tools to test the integration:

### Sample Tool 1:
- **Name**: Claude AI
- **Slug**: claude-ai  
- **Summary**: Constitutional AI that reasons with nuance
- **Description**: Claude is an AI assistant created by Anthropic...
- **URL**: https://claude.ai
- **Tags**: Writing, Analysis, Pro
- **Consciousness Score**: 5
- **Status**: Published

### Sample Tool 2:
- **Name**: Cursor AI
- **Slug**: cursor-ai
- **Summary**: AI-powered code editor that thinks with you  
- **Description**: Cursor AI is a pair-programming tool...
- **URL**: https://cursor.so
- **Tags**: Coding, Automation, Pro
- **Consciousness Score**: 4
- **Status**: Published

## Step 5: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Visit your homepage - it should now load tools from Airtable!

## Features

### ✅ What Works:
- **Dynamic tool loading** from Airtable
- **Fallback to static data** if Airtable is unavailable
- **Advanced sorting options**: Most upvoted, newest, consciousness score, A-Z, etc.
- **Tool count display**: Shows "X of Y tools" with clear filtering feedback
- **Voting system** with localStorage persistence  
- **Search and filtering** across all tool data
- **Prominent "Visit Tool" buttons** on each card
- **Special offers system** with promo codes and exclusive deals
- **Tool submission** (can be configured to add to Airtable)
- **Rich content management** through Airtable's interface
- **Consciousness warnings** for tools that may reduce awareness
- **Mobile-responsive design** optimized for all devices

### 🔄 Vote Sync (Optional):
To sync votes back to Airtable, votes are currently stored locally. You can extend this by:
1. Creating an API route to update Airtable votes
2. Periodically syncing localStorage votes to Airtable
3. Using webhooks to update votes in real-time

### 📝 Content Management:
- Edit tools directly in Airtable
- Changes appear on site immediately
- Use "Status" field to control which tools are published
- Rich text formatting for descriptions
- Image management through URL fields

## Airtable View Configurations

### Recommended Views:
1. **Published Tools** - Filter: Status = "Published"
2. **Draft Tools** - Filter: Status = "Draft"  
3. **Top Rated** - Sort: Consciousness Score (descending)
4. **Most Upvoted** - Sort: Upvotes (descending)
5. **Recently Added** - Sort: Date Added (descending)

## Image Management

The ToolImage component handles multiple fallback options:
1. **Primary**: Screenshot URL from Airtable
2. **Secondary**: Tool's favicon (auto-extracted from URL)
3. **Tertiary**: Generated placeholder with tool name
4. **Final**: Default placeholder

You can store screenshots in:
- Airtable attachments (get public URLs)
- External image hosting (imgur, cloudinary, etc.)
- Your own `/public/screenshots/` directory

## Troubleshooting

### Tools not loading from Airtable:
1. Check your API key and Base ID in `.env.local`
2. Verify table names match: "Tools" and "Prompt Tips"
3. Ensure at least one tool has Status = "Published"
4. Check browser console for error messages

### Images not displaying:
1. Verify Screenshot URL is publicly accessible
2. Check that images are properly formatted URLs
3. The system will automatically fall back to generated placeholders

### Performance:
- Airtable has rate limits (5 requests/second)
- Consider caching with Redis or similar for production
- Static data fallback ensures site always works