# Playground Quick Start Guide

## 🚨 Fix: "JDoodle API not accessible" Error

You're seeing this error because the Claude Code sandbox blocks external API calls by default. **Choose one solution below:**

---

## ✅ **Solution 1: Whitelist Domain (Easiest - 1 minute)**

### Step 1: Whitelist JDoodle Domain
1. Open your browser: **http://localhost:4353**
2. Click **"Domains"** in the left sidebar
3. Click **"Add Domain"** button
4. Enter: **`api.jdoodle.com`**
5. Click **"Add Domain"**

### Step 2: Test It
1. Go to http://localhost:5173/playground
2. Click **"Run"**
3. You should see "Hello, World!" ✅

**That's it! The playground will now work.**

---

## ✅ **Solution 2: Use Proxy Server (Most Secure - 2 minutes)**

This option keeps your API credentials server-side and bypasses all restrictions.

### Step 1: Enable Proxy Mode

Create `.env` file in `apps/web/` directory:
```bash
echo "VITE_USE_PROXY=true" > .env
```

### Step 2: Start Proxy Server (Terminal 1)

```bash
cd apps/web/server
npm install  # First time only
npm start
```

You'll see:
```
✅ Proxy server running on http://localhost:3001
📡 Forwarding requests to JDoodle API
```

**Keep this terminal running!**

### Step 3: Start React App (Terminal 2)

```bash
cd apps/web
npm run dev
```

### Step 4: Test It

1. Go to http://localhost:5173/playground
2. Click **"Run"**
3. You should see "Hello, World!" ✅

---

## 📋 Comparison

| Feature | Solution 1: Whitelist | Solution 2: Proxy |
|---------|----------------------|-------------------|
| **Setup Time** | 1 minute | 2 minutes |
| **Terminals Needed** | 1 (just React) | 2 (React + Proxy) |
| **Security** | Credentials in browser | Credentials on server ✅ |
| **Simplicity** | Easiest ✅ | Slightly more setup |
| **Production Ready** | Yes | Yes ✅ |

**Recommendation:** Use **Solution 1** (Whitelist) for development, **Solution 2** (Proxy) for production.

---

## 🔧 Get JDoodle Credentials (If Not Done Yet)

1. Visit: https://www.jdoodle.com/compiler-api
2. Click **"Subscribe"** or **"Get API"**
3. Fill in your name and email (free account)
4. Check your email for credentials:
   - **Client ID**
   - **Client Secret**
5. Already added to `CodePlayground.jsx` ✅

---

## 🐛 Troubleshooting

### Still seeing "JDoodle API not accessible"?

**If using Solution 1 (Whitelist):**
- ✅ Verify you added `api.jdoodle.com` to Claude Code domains
- ✅ Restart your browser
- ✅ Try clearing browser cache

**If using Solution 2 (Proxy):**
- ✅ Check proxy server is running (Terminal 1)
- ✅ Check `.env` file exists with `VITE_USE_PROXY=true`
- ✅ Restart React dev server after creating `.env`
- ✅ Make sure port 3001 is available

### "Rate limit exceeded"?
- ✅ You've used 200 requests today (free tier)
- ✅ Wait 24 hours for reset
- ✅ Or upgrade to paid JDoodle plan

### Code runs but no output?
- ✅ Add `System.out.println()` statements
- ✅ Check for compilation errors

---

## 📖 More Help

- Proxy server details: `apps/web/server/README.md`
- Full setup guide: `PLAYGROUND_SETUP.md`
- Implementation: `project/planning/playground-implementation-report.md`

---

**Choose your solution above and get coding! 🚀**
