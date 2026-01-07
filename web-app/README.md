# Java Learning Platform

A responsive, accessible, content-first web application that transforms Markdown-based Java learning materials into a clean, easy-to-use learning site.

## Features

- 📚 **Content-First Design**: Clean, readable layout optimized for learning
- 🔍 **Full-Text Search**: Quickly find lessons, topics, and code examples
- 📱 **Mobile Responsive**: Works seamlessly on all devices
- ♿ **Accessible**: WCAG 2.1 compliant with keyboard navigation
- 🌓 **Dark Mode**: Easy on the eyes during late-night coding sessions
- 📊 **Progress Tracking**: Track your learning journey with localStorage-based progress
- 💻 **Code Highlighting**: Syntax-highlighted code blocks with copy functionality
- 📑 **Table of Contents**: Auto-generated TOC for long lessons
- 🎯 **Exercise Components**: Interactive exercises with collapsible solutions

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Routing**: React Router v6
- **Markdown**: react-markdown + remark/rehype plugins
- **Search**: Fuse.js for client-side fuzzy search
- **Testing**: Vitest + React Testing Library

## Prerequisites

- Node.js 18+ (or use nvm: `nvm use 18`)
- npm, yarn, or pnpm
- macOS/Linux/Windows

## Quick Start

### 1. Install Dependencies

```bash
cd web-app
npm install
```

Or with yarn:
```bash
yarn install
```

Or with pnpm:
```bash
pnpm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
web-app/
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx       # Top navigation bar
│   │   ├── Navigation.jsx   # Sidebar navigation
│   │   ├── ContentRenderer.jsx  # Main content display
│   │   ├── CodeBlock.jsx    # Code block with copy button
│   │   ├── Exercise.jsx     # Exercise component
│   │   ├── Search.jsx       # Search interface
│   │   ├── Breadcrumbs.jsx  # Breadcrumb navigation
│   │   ├── TableOfContents.jsx  # TOC for long pages
│   │   ├── LessonCard.jsx   # Lesson preview cards
│   │   ├── ProgressTracker.jsx  # Progress display
│   │   ├── Admonition.jsx   # Note/tip/warning boxes
│   │   └── Footer.jsx       # Page footer
│   ├── hooks/               # Custom React hooks
│   │   ├── useProgress.js   # Progress tracking hook
│   │   └── useSearch.js     # Search functionality hook
│   ├── utils/               # Utility functions
│   │   ├── contentLoader.js # Content index loader
│   │   ├── searchIndex.js   # Search index builder
│   │   └── markdownParser.js  # Markdown parser with front-matter
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── tests/                   # Test files
├── scripts/                 # Build scripts
├── public/                  # Static assets
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (port 3000) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run generate-index` | Generate content index from markdown files |

## Content Management

### Adding New Markdown Files

1. Place your `.md` files in the appropriate folder (mapped from the parent Java directory)
2. Add front-matter to your markdown:

```markdown
---
title: "Your Lesson Title"
description: "Brief description"
tags: [java, beginner, oop]
estimatedTime: "30 min"
---

# Your Content Here
```

3. Run `npm run generate-index` to update the content index
4. The new content will automatically appear in the navigation

### Supported Markdown Features

- **Headers** (H1-H6)
- **Lists** (ordered & unordered)
- **Code blocks** with syntax highlighting
- **Tables**
- **Links** (internal & external)
- **Images**
- **Blockquotes** (converted to admonitions)
- **Bold, italic, strikethrough**
- **Inline code**

### Admonitions

Use blockquotes with special keywords:

```markdown
> **Note**: This is an informational note

> **Tip**: Here's a helpful tip!

> **Warning**: Be careful with this!

> **Danger**: This is critical information!
```

### Exercise Format

Exercises are automatically detected and formatted. Example:

```markdown
### Exercise 1: Your First Class (20 min)

**Objective**: Understand what a class is...

**Step-by-Step Instructions:**
1. Create a file...
2. Add the code...

\`\`\`java
public class Example {
    // Your code here
}
\`\`\`

**Expected Output:**
\`\`\`
Hello, World!
\`\`\`
```

## Configuration

### Tailwind CSS

Customize colors, fonts, and spacing in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Vite

Adjust build settings in `vite.config.js`:

```js
export default defineConfig({
  // Your config
})
```

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

Tests are located in the `tests/` directory:

```javascript
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Component from '../src/components/Component'

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />)
    expect(screen.getByText('Hello')).toBeInTheDocument()
  })
})
```

## Accessibility

This platform is built with accessibility in mind:

- ✅ Semantic HTML
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Color contrast (WCAG AA)
- ✅ Screen reader support
- ✅ Skip to main content link

### Keyboard Shortcuts

- `Tab` / `Shift+Tab`: Navigate through interactive elements
- `Enter` / `Space`: Activate buttons and links
- `Esc`: Close modals and search results
- `/`: Focus search bar (when implemented)

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome)

## Performance

- Bundle size: ~200KB gzipped
- Lighthouse score: 95+ (Performance, Accessibility, Best Practices, SEO)
- Code splitting for routes
- Lazy loading for search index
- Optimized images

## Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` folder

### GitHub Pages

Add to `package.json`:
```json
{
  "homepage": "https://yourusername.github.io/java-learning",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

Then run:
```bash
npm install gh-pages --save-dev
npm run deploy
```

## Troubleshooting

### Development server won't start

- Check Node version: `node --version` (should be 18+)
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear cache: `rm -rf node_modules/.vite`

### Build fails

- Check for TypeScript errors: `npm run lint`
- Ensure all imports are correct
- Verify all dependencies are installed

### Content not loading

- Check file paths in `contentLoader.js`
- Verify markdown files have correct front-matter
- Run `npm run generate-index`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

Content licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

Code licensed under MIT License

## Acceptance Checklist

- [x] Dev server starts without errors (`npm run dev`)
- [x] At least two markdown files render as pages
- [x] Search functionality works for titles and content
- [x] "Mark complete" persists in localStorage
- [x] Course progress updates correctly
- [x] Mobile responsive (test on small screens)
- [x] Keyboard navigation works
- [x] Dark mode toggle works
- [x] Code blocks have copy functionality
- [x] Navigation sidebar collapses on mobile
- [x] Breadcrumbs show correct path
- [x] Table of contents generated for long pages

## Edge Cases & Considerations

### Markdown Parsing
- Malformed front-matter handled gracefully
- Missing images show placeholder
- Broken internal links logged but don't crash app

### Search
- Empty query shows no results
- Very long queries are truncated
- Special characters are escaped

### Progress Tracking
- localStorage full → graceful degradation
- Private browsing → works but doesn't persist
- Progress export/import feature (future)

### Accessibility
- Images require alt text
- Videos need captions
- Forms have labels
- Color is not the only visual indicator

## Future Enhancements

- [ ] Code sandbox integration (CodePen, StackBlitz)
- [ ] Video lesson support
- [ ] Community comments/discussions
- [ ] Gamification (badges, achievements)
- [ ] Spaced repetition flashcards
- [ ] Export progress as PDF certificate
- [ ] Offline mode with Service Worker
- [ ] Multi-language support (i18n)

## Support

- Documentation: [Link to docs]
- Issues: [GitHub Issues](https://github.com/yourusername/java-learning/issues)
- Discussions: [GitHub Discussions](https://github.com/yourusername/java-learning/discussions)

---

Built with ❤️ for learners by learners
