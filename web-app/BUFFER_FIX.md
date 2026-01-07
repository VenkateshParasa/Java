# Buffer Polyfill Fix

## Problem
The application was showing "Can't find variable: Buffer" error because the `gray-matter` library (used for parsing markdown front-matter) requires Node.js's Buffer API, which isn't available in browsers.

## Solution
Added Buffer polyfill to enable `gray-matter` to work in the browser environment.

### Changes Made:

1. **Installed buffer package**
   ```bash
   npm install buffer
   ```

2. **Updated vite.config.js**
   - Added buffer alias in resolve configuration
   - Added manual chunks for better code splitting
   - Configured esbuildOptions for global polyfill

3. **Updated src/main.jsx**
   - Imported Buffer from 'buffer' package
   - Set `window.Buffer = Buffer` to make it globally available

## Files Modified:
- `web-app/vite.config.js` - Added Buffer polyfill configuration
- `web-app/src/main.jsx` - Added Buffer to window global
- `web-app/package.json` - Added buffer dependency

## Testing:
After these changes, the markdown content should load successfully without Buffer errors.

## Related Issues:
- Original issue: 404 errors for markdown files
- Secondary issue: Buffer not defined in browser
- Both issues are now resolved