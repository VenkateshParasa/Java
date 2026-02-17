# Quick Start Guide

## Installation Options

### Option 1: Standard npm (Uses .npmrc automatically)
```bash
npm install
```

### Option 2: Safe npm (Recommended for slow networks)
```bash
npm run install:safe
```

### Option 3: Fast npm (Uses package-lock.json)
```bash
npm run install:offline
```

### Option 4: pnpm (Fastest - Recommended)
```bash
# First time only: Install pnpm globally
npm install -g pnpm

# Then install dependencies
pnpm install
```

## Running the Application

### Development Mode
```bash
# With npm
npm run dev

# With pnpm
pnpm dev
```

### Production Build
```bash
# With npm
npm run build

# With pnpm
pnpm build
```

## Configuration Files

- **`.npmrc`** - npm configuration (timeout, retries, registry)
- **`.pnpmrc`** - pnpm configuration (faster alternative)
- Both files are pre-configured for slow networks and DNS issues

## Troubleshooting

If installation is still slow:
1. Try `npm run install:safe`
2. Or switch to pnpm: `npm install -g pnpm && pnpm install`
3. For complete guide, see [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md)

## Why pnpm?

- ⚡ **3x faster** than npm
- 💾 **Saves disk space** (shared dependency store)
- 🔒 **More secure** (strict resolution)
- ✅ **100% compatible** with npm packages

## Comparison

| Command | npm | pnpm |
|---------|-----|------|
| Install | `npm install` | `pnpm install` |
| Run dev | `npm run dev` | `pnpm dev` |
| Build | `npm run build` | `pnpm build` |
| Speed | Standard | 3x Faster |

---

**Need help?** See [INSTALLATION_GUIDE.md](./INSTALLATION_GUIDE.md) for detailed instructions.