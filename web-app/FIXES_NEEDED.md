# Fixes Needed for Java Learning Platform

## Current Issue

The Vite glob import pattern `'../../**/*.md'` is only finding markdown files within the web-app directory (IMPLEMENTATION.md and README.md), not the actual course content in the parent directory.

## Root Cause

Vite's `import.meta.glob()` has limitations when trying to import files outside the project root. It's designed for security reasons to prevent accessing arbitrary files on the filesystem.

## Solution Options

### Option 1: Copy Content to Public Folder (Recommended for Production)
1. Create a build script that copies all markdown files to `web-app/public/content/`
2. Update the glob pattern to `'/content/**/*.md'`
3. Use fetch API to load markdown files from the public folder

### Option 2: Use Vite's `assetsInclude` Configuration
1. Configure Vite to treat parent directory markdown files as assets
2. This requires updating vite.config.js with proper path resolution

### Option 3: Symbolic Link (Development Only)
1. Create a symbolic link from `web-app/src/content` to the parent directory
2. Update glob pattern to `'./content/**/*.md'`

## Recommended Implementation (Option 1)

### Step 1: Create Build Script
```javascript
// scripts/copyContent.js
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SOURCE_DIR = path.resolve(__dirname, '../../')
const DEST_DIR = path.resolve(__dirname, '../public/content')

// Copy all .md files from parent directory to public/content
```

### Step 2: Update markdownParser.js
```javascript
// Instead of import.meta.glob, use fetch API
export async function loadMarkdownContent(path) {
  const response = await fetch(`/content/${path}.md`)
  const rawContent = await response.text()
  // ... rest of parsing logic
}
```

### Step 3: Update package.json
```json
{
  "scripts": {
    "prebuild": "node scripts/copyContent.js",
    "predev": "node scripts/copyContent.js"
  }
}
```

## Current Status

- ✅ Content index generation working
- ✅ UI components created
- ✅ Error handling implemented
- ✅ Loading states added
- ❌ Markdown file loading not working (glob pattern issue)
- ❌ Need to implement one of the solutions above

## Next Steps

1. Implement Option 1 (copy content script)
2. Update markdownParser.js to use fetch instead of glob
3. Test content loading
4. Verify all routes work correctly