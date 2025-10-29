# 📊 How to View Logs in Netlify (Production)

## ✅ Changes Made

We've updated your application to enable **production logging** that will show in Netlify:

### 1. **Updated next.config.mjs**
- Changed console config to keep `console.info()`, `console.warn()`, and `console.error()` in production
- Only `console.log()` and `console.debug()` are removed (these are development-only)

### 2. **Updated API Routes with console.info()**
We added structured logging to track:
- ✅ API requests (`/api/proxy`, `/api/download`)
- ✅ Rate limiting events
- ✅ Download success/failures
- ✅ Platform usage statistics

---

## 🔍 How to View Logs in Netlify

### **Step 1: Go to Netlify Dashboard**
1. Open [app.netlify.com](https://app.netlify.com)
2. Select your site: **FSMVID-final-code-netlify**

### **Step 2: Deploy Your Changes**
```bash
# Commit the changes
git add .
git commit -m "Enable production logging"
git push origin main
```

Wait for Netlify to finish deploying (2-3 minutes)

### **Step 3: Access Function Logs**
1. In Netlify dashboard, click **"Functions"** tab (left sidebar)
2. You'll see all your serverless functions
3. Click on any function (e.g., `___netlify-handler`)
4. Click **"Function log"** button at the top

### **Step 4: View Real-Time Logs**
- Logs appear with a **15-30 second delay** (this is normal for Netlify)
- Each log entry shows:
  - Timestamp
  - Log level (INFO, ERROR, WARN)
  - Message content

### **Step 5: Filter Logs**
You can filter by:
- **Time range**: Last 1 hour, 24 hours, 7 days
- **Log level**: All, Errors only, Warnings, Info
- **Search**: Type keywords to find specific logs

---

## 📋 What Logs You'll See

### **When Users Make Requests:**
```
[PROXY] Request for youtube - Homepage: false
```

### **When Downloads Start:**
```
[DOWNLOAD] Starting download - Platform: tiktok, Filename: video.mp4
```

### **When Downloads Succeed:**
```
[DOWNLOAD] Success - Platform: tiktok, Size: 5242880
```

### **When Rate Limits Are Hit:**
```
[RATE LIMIT] IP 123.45.67.89 exceeded limit (200 req/hour)
```

### **When Rate Limit is Getting Close:**
```
[RATE LIMIT] IP 123.45.67.89 has 5 requests remaining
```

### **Debug Mode (if enabled):**
```
Making POST request to: https://api.example.com (Attempt 1/5)
ZM API Status: 200
ZM API Response: {"status":"success","medias":[...]}
✓ Success on attempt 1
```

---

## 🔧 Enable Debug Mode (Optional)

To see **detailed debug logs**, add this environment variable in Netlify:

1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Set:
   - **Key**: `DEBUG_MODE`
   - **Value**: `true`
4. Click **"Save"**
5. Redeploy your site

⚠️ **Warning**: Debug mode creates MANY logs. Use only for troubleshooting, then set to `false`.

---

## 📊 Alternative: Real-Time Logging Dashboard

For better real-time monitoring, you can use external services:

### **Option 1: Netlify CLI (Local Terminal)**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Watch logs in real-time
netlify dev --live
```

### **Option 2: Third-Party Services**
- **Logtail** (Free tier available)
- **Datadog** (Enterprise)
- **Better Stack** (Developer-friendly)

---

## 🎯 Quick Reference

| Log Type | What It Tracks | When You'll See It |
|----------|----------------|-------------------|
| `[PROXY]` | Video info requests | Every time someone pastes a URL |
| `[DOWNLOAD]` | File downloads | When user clicks "Download" |
| `[RATE LIMIT]` | API abuse prevention | When limits are exceeded |
| Errors | Failed requests | When something goes wrong |

---

## ✅ Verify Logging Works

1. **Deploy your changes to Netlify**
2. **Visit your website** (production URL)
3. **Download a video** from any platform
4. **Wait 30 seconds**
5. **Check Netlify Function logs** → You should see:
   ```
   [PROXY] Request for youtube - Homepage: false
   [DOWNLOAD] Starting download - Platform: youtube, Filename: video.mp4
   [DOWNLOAD] Success - Platform: youtube, Size: 10485760
   ```

---

## 🐛 Troubleshooting

### **"I still don't see logs"**
- Wait 30-60 seconds after making a request
- Make sure you deployed the changes
- Check you're looking at the right function (try `___netlify-handler`)
- Verify the deployment completed successfully

### **"Logs are cut off or incomplete"**
- Netlify has a log size limit per request
- Long logs are truncated
- Use external logging service for full logs

### **"I see old logs but not new ones"**
- Clear your browser cache
- Hard refresh the Netlify dashboard (Ctrl+Shift+R)
- Check if the site is actually receiving traffic

---

## 📞 Need Help?

- Check Netlify docs: [netlify.com/docs/functions](https://docs.netlify.com/functions/logs/)
- Netlify support: [support.netlify.com](https://www.netlify.com/support/)

---

**🎉 You're all set! Your logs will now appear in Netlify production.**

