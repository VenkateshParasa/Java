# Webpack Migration Guide

## Overview
This project has been migrated from Vite (with esbuild) to Webpack 5 to avoid esbuild restrictions on client machines.

## What Changed

### Build Tool
- **Before**: Vite 6.0.3 with esbuild
- **After**: Webpack 5.105.2 with Babel

### Configuration Files

#### New Files Created
1. **webpack.config.js** - Main webpack configuration
   - Development and production modes
   - Dev server on port 3000
   - Hot module replacement (HMR)
   - Code splitting for vendors
   - Source maps for debugging

2. **.babelrc** - Babel configuration
   - @babel/preset-env for modern JavaScript
   - @babel/preset-react with automatic JSX runtime

3. **tailwind.config.js** - Tailwind CSS configuration
   - Content paths for purging unused styles

4. **postcss.config.js** - PostCSS configuration
   - Tailwind CSS processing
   - Autoprefixer for browser compatibility

#### Removed Files
- `vite.config.js` - No longer needed

### Package.json Changes

#### Scripts Updated
```json
{
  "dev": "webpack serve --mode development",
  "build": "webpack --mode production",
  "preview": "webpack serve --mode production"
}
```

#### Dependencies Added
- webpack: ^5.105.2
- webpack-cli: ^6.0.1
- webpack-dev-server: ^5.2.3
- html-webpack-plugin: ^5.6.6
- babel-loader: ^9.2.1
- @babel/core: ^7.29.0
- @babel/preset-env: ^7.29.0
- @babel/preset-react: ^7.28.5
- css-loader: ^7.1.3
- style-loader: ^4.0.0
- postcss-loader: ^8.2.0

#### Dependencies Removed
- vite: ^6.0.3
- @vitejs/plugin-react: ^4.3.4

## Usage

### Development
```bash
npm run dev
```
Starts webpack dev server on http://localhost:3000 with hot reload.

### Production Build
```bash
npm run build
```
Creates optimized production build in `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

## Key Features

### Code Splitting
- Vendor code is automatically split into a separate bundle
- Improves caching and load times

### Performance Optimization
- Minification in production mode
- Source maps for debugging
- Content hashing for cache busting

### Development Experience
- Hot Module Replacement (HMR)
- Fast refresh for React components
- Source maps for easier debugging

## Build Output

The build creates the following in the `dist/` directory:
- `index.html` - Main HTML file
- `main.[hash].js` - Application code
- `vendors.[hash].js` - Third-party dependencies
- Source maps for debugging

## Performance Notes

The build shows warnings about bundle size (2.18 MiB total):
- `main.js`: 1.27 MiB
- `vendors.js`: 933 KiB

These are expected for a React application with routing, markdown rendering, and syntax highlighting. Consider implementing lazy loading for routes if bundle size becomes a concern.

## Troubleshooting

### Build Fails
1. Clear node_modules and reinstall: `rm -rf node_modules && npm install`
2. Clear webpack cache: `rm -rf node_modules/.cache`

### Dev Server Issues
1. Check if port 3000 is available
2. Try a different port in webpack.config.js

### Styling Issues
1. Ensure tailwind.config.js has correct content paths
2. Verify postcss.config.js is properly configured

## Migration Benefits

1. **No esbuild restrictions** - Works on all client machines
2. **Mature ecosystem** - Webpack has extensive plugin support
3. **Better control** - More configuration options for complex builds
4. **Industry standard** - Widely used and well-documented

## Next Steps

Consider implementing:
1. Route-based code splitting for better performance
2. Progressive Web App (PWA) features
3. Bundle analysis with webpack-bundle-analyzer
4. Environment-specific configurations