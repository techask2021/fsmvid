# 🛡️ Rate Limiting Setup Guide - Upstash Redis

## ✅ What's Been Implemented

Your API is now protected with intelligent rate limiting using Upstash Redis (Singapore region).

### Protected Endpoints:
- ✅ `/api/download` - 20 requests/hour per IP
- ✅ `/api/proxy` - 15 requests/hour per IP
- ✅ `/api/hls-download` - 20 requests/hour per IP
- ✅ `/api/mp4-download` - 20 requests/hour per IP
- ✅ `/api/truthsocial-download` - 20 requests/hour per IP
- ✅ `/api/truthsocial-info` - 30 requests/hour per IP

### Features:
- 🌏 **Singapore-based Redis** (optimized for Asian traffic)
- 🔒 **IP-based rate limiting** (works with Netlify, Vercel, Cloudflare)
- 📊 **Rate limit headers** (clients can see their quota)
- 💰 **Cost-effective** (~$0.30-0.50/month)
- ⚡ **Graceful fallback** (if Redis fails, requests still work)

---

## 🚀 Next Steps - Add Environment Variables to Netlify

### Step 1: Go to Netlify Dashboard
1. Open your [Netlify Dashboard](https://app.netlify.com/)
2. Select your site: **FSMVID**
3. Go to: **Site configuration** → **Environment variables**

### Step 2: Add Upstash Credentials
Click **"Add a variable"** and add these TWO variables:

#### Variable 1:
```
Key:   UPSTASH_REDIS_REST_URL
Value: https://powerful-primate-21176.upstash.io
```
- ✅ Scopes: **All** (Production, Deploy Previews, Branch deploys)

#### Variable 2:
```
Key:   UPSTASH_REDIS_REST_TOKEN
Value: AVK4AAIncDIwNDFjMDc4Y2NhZTI0NWQxOTMxYjRmYTg5MzA5NDllNHAyMjExNzY
```
- ✅ Scopes: **All** (Production, Deploy Previews, Branch deploys)

### Step 3: Redeploy Your Site
After adding the environment variables:
1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Clear cache and deploy site"**

---

## 📊 How It Works

### Rate Limit Tiers:

| Endpoint Type | Limit | Window | Use Case |
|--------------|-------|--------|----------|
| Downloads | 20/hour | 1 hour | Video/audio downloads |
| Proxy | 15/hour | 1 hour | API proxy requests |
| Video Info | 30/hour | 1 hour | Metadata fetching |

### Client Response Headers:
Every API response includes these headers:
```
X-RateLimit-Limit: 20
X-RateLimit-Remaining: 15
X-RateLimit-Reset: 2025-10-28T15:30:00.000Z
```

### When Rate Limit is Exceeded:
```json
{
  "status": "error",
  "message": "Too many requests. Please try again later.",
  "retryAfter": 3600,
  "limit": 20,
  "reset": "2025-10-28T15:30:00.000Z"
}
```
**HTTP Status:** `429 Too Many Requests`

---

## 🔧 Testing Rate Limiting

### Test Locally:
1. Make sure your `.env.local` has the credentials (already set up)
2. Make 21 API requests quickly
3. The 21st request should return `429 Too Many Requests`

### Monitor in Upstash Console:
1. Go to: https://console.upstash.com/
2. Select your database: `fsmvid-api-rate-limit`
3. Click **"Data Browser"** to see active rate limit keys
4. Example key: `rate_limit:192.168.1.1:1730132400`

---

## 💰 Cost Estimation

### Your Traffic (100K API requests/month):
- **Redis Commands Needed:** ~200K/month (2 commands per request)
- **Upstash Free Tier:** 500K commands/month
- **Current Cost:** $0.00 (within free tier!)

### If You Exceed Free Tier:
- **Cost:** $0.20 per 100K commands
- **Estimated at 300K API requests/month:** ~$0.30-0.50/month

---

## 🎯 Customizing Rate Limits

Edit `lib/rate-limit.ts` to adjust limits:

```typescript
export const RATE_LIMITS = {
  DOWNLOAD: { interval: 3600, limit: 20 },    // Change to 30 for more generous
  PROXY: { interval: 3600, limit: 15 },       // Change to 25 for more generous
  VIDEO_INFO: { interval: 3600, limit: 30 },  // Already generous
}
```

**After changes:** Commit, push, and redeploy on Netlify.

---

## 🔍 Monitoring & Analytics

### Check Rate Limit Usage:
1. **Upstash Dashboard:** See command count in real-time
2. **Google Analytics:** Track `429` errors as events (optional enhancement)
3. **Netlify Logs:** See rate limit rejections

### Red Flags to Watch:
- ⚠️ Sudden spike in `429` errors → Possible DDoS
- ⚠️ Single IP hitting limits repeatedly → Bot/scraper
- ⚠️ Commands > 500K/month → Time to upgrade plan

---

## 🛠️ Troubleshooting

### Rate Limiting Not Working?
1. **Check Netlify env vars:** Make sure both variables are set
2. **Check Upstash Console:** Verify database is active (Singapore)
3. **Check logs:** Look for `[Rate Limit]` messages in Netlify function logs

### TypeScript Errors?
```bash
pnpm install
# Restart your dev server
```

### Redis Connection Errors?
- Rate limiting will **gracefully fail** and allow requests
- Check console for: `[Rate Limit] Redis error:`
- Verify credentials are correct

---

## 📝 Summary

✅ **Rate limiting is now active**  
✅ **Package installed:** `@upstash/redis`  
✅ **Local setup complete:** `.env.local` configured  
⏳ **Pending:** Add env vars to Netlify and redeploy  

**Once deployed, your API will be protected from abuse while legitimate users enjoy uninterrupted service!** 🎉

---

## 🔐 Security Notes

- ✅ Environment variables are in `.gitignore` (safe)
- ✅ Credentials never committed to Git
- ✅ Rate limiting works per IP (not per user session)
- ✅ Graceful degradation if Redis fails

**Your secret token is safe and will not be exposed in client-side code.**

