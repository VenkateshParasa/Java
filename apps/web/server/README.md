# JDoodle Proxy Server

This proxy server allows the playground to communicate with JDoodle API when running in Claude Code sandbox or when you want to keep API credentials server-side.

## Why Use the Proxy?

**Option 1: Whitelist Domain (Simpler)**
- Add `api.jdoodle.com` to Claude Code allowed domains
- No proxy server needed
- Direct API calls from browser

**Option 2: Use Proxy Server (More Secure)**
- Keep API credentials on server-side (more secure)
- Bypass Claude Code sandbox restrictions
- Works with any firewall/security setup

## Quick Start

### 1. Install Dependencies (Already Done!)

```bash
cd server
npm install
```

### 2. Start Proxy Server

```bash
cd server
npm start
```

You should see:
```
✅ Proxy server running on http://localhost:3001
📡 Forwarding requests to JDoodle API
```

### 3. Enable Proxy in React App

Create a `.env` file in the `apps/web/` directory:

```bash
VITE_USE_PROXY=true
```

### 4. Restart Dev Server

```bash
# In apps/web directory
npm run dev
```

### 5. Test the Playground

1. Go to http://localhost:5173/playground
2. Click "Run" on Hello World example
3. Should see "Hello, World!" in output

## How It Works

```
Browser (React App)
    ↓
Proxy Server (localhost:3001)
    ↓
JDoodle API (api.jdoodle.com)
```

The proxy:
1. Receives code execution requests from your React app
2. Forwards them to JDoodle API with credentials
3. Returns results back to your app

## Running Both Servers

You'll need two terminal windows:

**Terminal 1: Proxy Server**
```bash
cd apps/web/server
npm start
```

**Terminal 2: React Dev Server**
```bash
cd apps/web
npm run dev
```

## Production Deployment

For production, deploy the proxy server to:
- Heroku
- Railway
- Render
- Any Node.js hosting

Then update `.env`:
```
VITE_USE_PROXY=true
VITE_PROXY_URL=https://your-proxy-domain.com/api/execute
```

## Troubleshooting

### Proxy won't start
- Check port 3001 is not in use
- Ensure dependencies are installed (`npm install`)

### "CORS error"
- Proxy should handle CORS automatically
- Check proxy server is running

### "Connection refused"
- Start the proxy server first
- Check `.env` has `VITE_USE_PROXY=true`
- Restart React dev server after adding `.env`

## Alternative: Whitelist Domain Instead

If you prefer not to use a proxy server:

1. Open http://localhost:4353 in your browser
2. Click "Domains" → "Add Domain"
3. Enter: `api.jdoodle.com`
4. Click "Add Domain"
5. Remove or set `VITE_USE_PROXY=false` in `.env`
6. Restart React dev server

The app will then call JDoodle API directly from the browser.
