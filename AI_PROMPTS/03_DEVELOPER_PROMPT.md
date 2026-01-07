# Developer-focused Prompt — File & Code Generation

Use this prompt when asking the LLM to generate files, components, routing, and tests.

You are an experienced full-stack frontend developer. Scaffold a repo implementing a static, markdown-driven learning site:

- Use: React + Vite + MDX + Tailwind; TypeScript optional.
- Create: content loader that traverses the repo structure and exposes metadata (title, path, order, tags).
- Implement: file-based routes, Sidebar component with nested nav, ContentRenderer (MDX), LessonCard, Exercise component with show/hide solution, Search (fuse.js or simple index), Progress store (localStorage).
- Add: unit tests (Vitest + Testing Library), ESLint/Prettier config, CI workflow (GitHub Actions) for build/test.
- Include: 2 converted pages from your repo, README with setup, code comments, and a verification checklist.

Be explicit about file names and sample content for the generated files. When requesting files, prefer the pattern:

1) Ask for a file manifest + package.json
2) Then request batches of files (core layout -> components -> utilities -> tests)
3) When creating a single file, request "Return only the file contents for `path/to/file`"

Example small request to paste after this prompt:
"Create `src/components/Sidebar.jsx` that accepts `nav: Array` and renders a collapsible tree with Tailwind classes. Return only the file contents."