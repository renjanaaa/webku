# Environment Variables Setup

For your "Between Us" Q&A website to work with Google Sheets, you need to add one environment variable:

## Required Variable

### NEXT_PUBLIC_GAS_URL
- **Where to get it**: From your Google Apps Script deployment (Step 3 in SETUP_INSTRUCTIONS.md)
- **Format**: `https://script.google.com/macros/d/[ID]/usercopy`
- **Why NEXT_PUBLIC?**: Makes it accessible from the frontend (it's a public URL anyway)

## How to Add It

### Option 1: In v0 Dashboard
1. Open the project sidebar
2. Click **Vars**
3. Click **Add Variable**
4. Enter:
   - Name: `NEXT_PUBLIC_GAS_URL`
   - Value: `https://script.google.com/macros/d/YOUR_ID_HERE/usercopy`
5. Click **Add**

### Option 2: After Downloaded/Local
If you download the project, create a `.env.local` file:
\`\`\`
NEXT_PUBLIC_GAS_URL=https://script.google.com/macros/d/YOUR_ID_HERE/usercopy
\`\`\`

---

## Verification

After adding the variable:
1. Restart your development server
2. Go through the Q&A and try saving
3. Check your Google Sheet for the response row

If it doesn't work, check:
- Variable name is exactly `NEXT_PUBLIC_GAS_URL`
- URL is copied correctly from Google Apps Script
- Google Apps Script is deployed with "Anyone" access
