# Installation Guide for Client Machines

This guide provides multiple installation methods optimized for slow networks and DNS issues.

## Prerequisites

- Node.js 18+ installed
- Internet connection (optimized configurations included for slow networks)

## Configuration Files

This project includes two configuration files for optimized dependency installation:

- **`.npmrc`** - Configuration for npm (default package manager)
- **`.pnpmrc`** - Configuration for pnpm (faster alternative)

Both files include:
- Extended timeouts (120 seconds)
- Automatic retries (10 attempts)
- Offline-first approach
- Network optimization settings

---

## Method 1: Using npm (Default)

The `.npmrc` file is automatically used by npm.

### Standard Installation
```bash
npm install
```

### With Additional Safety (Recommended for Slow Networks)
```bash
npm install --prefer-offline
```

### Clean Install (Faster, uses package-lock.json)
```bash
npm ci
```

---

## Method 2: Using pnpm (Recommended for Faster Installs)

pnpm is significantly faster than npm and uses less disk space through content-addressable storage.

### Step 1: Install pnpm Globally
```bash
npm install -g pnpm
```

### Step 2: Install Dependencies
```bash
pnpm install
```

The `.pnpmrc` file will be automatically used by pnpm.

### Benefits of pnpm:
- ⚡ **3x faster** than npm
- 💾 **Saves disk space** (shared store across projects)
- 🔒 **More secure** (strict dependency resolution)
- 🎯 **Better monorepo support**

---

## Method 3: Offline Installation (Best for Restricted Networks)

### On Machine with Good Internet:

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Create a tarball:
```bash
# For npm
tar -czf node_modules.tar.gz node_modules/ package-lock.json

# For pnpm
tar -czf node_modules.tar.gz node_modules/ pnpm-lock.yaml
```

### On Client Machine:

1. Extract the tarball:
```bash
tar -xzf node_modules.tar.gz
```

2. Verify installation:
```bash
npm run dev
# or
pnpm dev
```

---

## Troubleshooting

### Issue: Installation Still Slow

**Solution 1: Increase Timeout Further**
```bash
# For npm
npm install --fetch-timeout=300000

# For pnpm
pnpm install --fetch-timeout=300000
```

**Solution 2: Use Different DNS**
```bash
# Use Google DNS (8.8.8.8) or Cloudflare (1.1.1.1)
# Configure in your system's network settings
```

**Solution 3: Clear Cache and Retry**
```bash
# For npm
npm cache clean --force
npm install

# For pnpm
pnpm store prune
pnpm install
```

### Issue: Corporate Proxy/Firewall

Add proxy settings to `.npmrc` or `.pnpmrc`:
```ini
proxy=http://proxy.company.com:8080
https-proxy=http://proxy.company.com:8080
strict-ssl=false
```

### Issue: ENOTFOUND or DNS Errors

1. Check internet connection
2. Try using mobile hotspot temporarily
3. Configure alternative DNS servers
4. Use offline installation method (Method 3)

---

## Comparison: npm vs pnpm

| Feature | npm | pnpm |
|---------|-----|------|
| Speed | Standard | 3x Faster |
| Disk Space | More | Less (shared store) |
| Configuration | `.npmrc` | `.pnpmrc` |
| Lock File | `package-lock.json` | `pnpm-lock.yaml` |
| Compatibility | Universal | Excellent |

---

## Recommended Approach

### For Development Teams:
**Use pnpm** - Faster installs, better for monorepos, saves disk space

```bash
# One-time setup
npm install -g pnpm

# Daily usage
pnpm install
pnpm dev
pnpm build
```

### For Client Machines with Network Issues:
**Use offline installation** (Method 3) - Most reliable for restricted networks

### For CI/CD Pipelines:
**Use npm ci or pnpm install --frozen-lockfile** - Fastest and most reliable

```bash
# npm
npm ci

# pnpm
pnpm install --frozen-lockfile
```

---

## Scripts Available

After installation, you can use these scripts:

```bash
# Development server (with npm)
npm run dev

# Development server (with pnpm)
pnpm dev

# Production build (with npm)
npm run build

# Production build (with pnpm)
pnpm build
```

---

## Additional Tips

1. **Commit Lock Files**: Always commit `package-lock.json` or `pnpm-lock.yaml` to git
2. **Use Same Package Manager**: Stick to either npm or pnpm across the team
3. **Update Regularly**: Keep dependencies updated for security patches
4. **Cache Dependencies**: Use CI/CD caching for faster builds

---

## Support

If you encounter issues not covered here:

1. Check the verbose output:
   ```bash
   npm install --verbose
   # or
   pnpm install --reporter=append-only
   ```

2. Check network connectivity:
   ```bash
   ping registry.npmjs.org
   ```

3. Verify Node.js version:
   ```bash
   node --version  # Should be 18+
   ```

For project-specific issues, contact the development team.