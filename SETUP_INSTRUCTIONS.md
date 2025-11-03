# Between Us - Complete Setup Guide

Step-by-step instructions to deploy your romantic Q&A website with Google Sheets storage.

## What You're Building

A beautiful intimate Q&A experience that saves responses to Google Sheets. The frontend is ready—you just need to set up the backend (5 minutes total).

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Between Us - Responses"
4. Leave it empty (the script will create the structure automatically)

---

## Step 2: Deploy Google Apps Script

### Copy the Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Paste the code from `scripts/google-apps-script.gs`
4. Save (Ctrl+S or Cmd+S)

### Deploy as Web App

1. Click **Deploy** (top right)
2. Select **New Deployment**
3. Click the dropdown and choose **Web app**
4. Configure:
   - **Execute as**: Your Google Account
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Copy the deployment URL** - it looks like: `https://script.google.com/macros/d/[ID]/usercopy`
7. Click outside to close

---

## Step 3: Add Environment Variable

In your v0 project, add the deployment URL as an environment variable:

1. Open the sidebar and click **Vars**
2. Click **Add Variable**
3. Fill in:
   - **Name**: `NEXT_PUBLIC_GAS_URL`
   - **Value**: Paste your deployment URL from Step 2
4. Click **Add**

The variable will be used automatically by the frontend.

---

## Step 4: Test the Integration

1. Open your website preview
2. Click **BEGIN THE CONVERSATION**
3. Answer all 10 questions
4. Click **SAVE RESPONSES**
5. Look for the success message
6. Check your Google Sheet—new responses should appear in a "Responses" sheet!

---

## Troubleshooting

**"Google Apps Script URL not configured"**
- Make sure you added `NEXT_PUBLIC_GAS_URL` in the Vars section
- Restart your preview after adding the variable

**"Connection error"**
- Verify the deployment URL is exactly correct
- Ensure you deployed with "Anyone" access (Step 2)
- Check browser console (F12) for details

**Responses not appearing in Sheet**
- Open Google Apps Script editor
- Manually run the `initializeSheet()` function
- Try saving again

**Want to redeploy or update the script?**
- In Google Apps Script: **Deploy → Manage Deployments**
- Click the pencil icon next to your deployment
- The same URL keeps working

---

## Going Live

When ready to deploy publicly:
1. Deploy your project to Vercel using the "Publish" button
2. Share the live URL with your partner
3. Responses will be saved to your Google Sheet in real-time

---

## Security & Privacy

- Your Google Apps Script URL is public (necessary for the website to access it)
- Your Google Sheet is private (only you can see responses)
- All data is encrypted in transit
- Share your Sheet with your partner if they want to see responses

---

**That's it!** Your romantic Q&A website is now connected to Google Sheets. 💔
