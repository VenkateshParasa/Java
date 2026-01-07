# Responsive Learning UI — Comprehensive Prompt

Use this file as the primary AI prompt to generate a responsive, accessible learning site that converts the Markdown-based Java repository into a clean web application.

## Goal
Generate a responsive, accessible, content-first web application that turns a Markdown-based Java learning repository into a clean, easy-to-use learning site. The app should be developer-friendly, mobile-first, and optimized for learning.

## Prompt (comprehensive)

You are an expert frontend engineer and UX designer. Build a responsive, accessible, content-first web application that turns a Markdown-based Java learning repository into a clean, easy-to-use learning site. Requirements and constraints:

1. Content & mapping
- Source content is Markdown files (top-level files and folders such as `00_Getting_Started`, `01_Core_Courses`, `02_Detailed_Topics`, `03_BEGINNER_FRIENDLY_Exercises`, `04_Assessments`, etc.). Treat each Markdown file as a page or content node; preserve headings, code blocks, tables, and internal links.
- Create a content index/collector that programmatically reads the repo structure and generates site navigation and metadata (title, description, tags, path, last-updated).
- Keep the existing folder structure semantics: overview pages, courses, week/day exercises, and assessments.

2. Tech stack (recommended, but support alternatives)
- Primary recommendation: React + Vite + MDX + Tailwind CSS (or a comparable utility-first CSS system). Use file-based routing (Vite + React Router or a minimal router).
- Optionally provide a variant using Next.js (static export) if SSR/SEO is required.
- Provide build scripts, dev server, and a small test harness (Jest or Vitest + React Testing Library).

3. UX & design system
- Clean, minimal, learning-focused layout: left or top navigation (collapsible on small screens), content area with readable typography, sticky progress/TOC on wider screens.
- Mobile-first, responsive breakpoints: small (≤640px), medium (641–1024px), large (>1024px).
- Accessible color contrast, keyboard navigation, proper semantic HTML, aria attributes where appropriate.
- Include: a global search (client-side index searchable by title/tags/content), breadcrumbs, table of contents for long pages, code block styling with copy-to-clipboard and language labels, and collapsible exercise solutions (hidden by default).
- Include a lightweight progress tracker per user (localStorage) that can mark lessons/exercises complete and visually indicate progress on course pages.

4. Components required
- Header with project title and quick links (Search, Progress, GitHub link).
- Responsive navigation (collapsible sidebar with nested sections).
- Content renderer (MDX-aware): headings, paragraphs, code blocks, admonitions (note/tip/warning), images, callouts, tables.
- Lesson cards for course overviews (title, short summary, progress).
- Exercise component: instructions, inline runnable code sandbox placeholder (optional), "Show solution" toggle.
- Footer with licensing and repo links.

5. Developer ergonomics & acceptance criteria
- Provide CLI scripts: start, build, preview, lint, test.
- Provide automated mapping of markdown to routes; confirm that navigating to a route renders the matching markdown page.
- Provide two example pages converted from the repo (choose representative pages: one course overview, one exercise).
- Include minimal tests: render a content page, verify nav lists pages, snapshot for a component.
- Ensure the project starts with no build errors and dev server runs.

6. Visual & interaction details
- Typography: readable system stack with good leading (line-height). Provide suggested font scale.
- Spacing: consistent 4px or 8px base rhythm.
- Color palette: neutral base, one accent color (calm blue/green) used for links and CTAs, subtle elevation for cards.
- Dark mode: optional but recommended; provide CSS variables for easy theming.

7. Deliverables
- Project scaffold with components, routes, content loader, styles, and example pages.
- README with setup, build, and content-authoring instructions (how to add new markdown).
- Short verification checklist and a set of unit tests.

8. Non-functional constraints
- Avoid heavy bundling or runtime dependencies; prefer client-side static export compatibility.
- Keep bundle size small; lazy-load code-heavy features like search indexing or code sandboxes.
- Ensure compatibility with macOS developer environment and zsh.

9. Acceptance tests (minimal)
- Dev server starts (npm/yarn/pnpm start) and shows the homepage.
- At least two markdown files render as pages.
- Search returns results for titles and first paragraph text.
- "Mark complete" persists in localStorage and updates course progress.

Finish by outputting:
- A file-by-file plan to implement the scaffold (list of files and purpose).
- The exact CLI commands to run the dev server, build, test.
- A short list of edge cases and accessibility checks.

---

## Concise prompt — copy-paste friendly

You are an expert frontend engineer. Convert a Markdown-based Java learning repo into a responsive, accessible learning site. Use React + Vite + MDX + Tailwind (or similar), programmatically map markdown files to routes, provide a collapsible responsive sidebar, TOC, searchable index, code blocks with copy, and a simple localStorage progress tracker. Deliver a scaffold with start/build/test scripts, two example rendered pages from the repo, a README, and minimal tests. Prefer mobile-first design and accessible semantics.


## Developer-focused prompt — for code-generation emphasis

You are an experienced full-stack frontend developer. Scaffold a repo implementing a static, markdown-driven learning site:

- Use: React + Vite + MDX + Tailwind; TypeScript optional.
- Create: content loader that traverses the repo structure and exposes metadata (title, path, order, tags).
- Implement: file-based routes, Sidebar component with nested nav, ContentRenderer (MDX), LessonCard, Exercise component with show/hide solution, Search (fuse.js or simple index), Progress store (localStorage).
- Add: unit tests (Vitest + Testing Library), ESLint/Prettier config, CI workflow (GitHub Actions) for build/test.
- Include: 2 converted pages from your repo, README with setup, code comments, and a verification checklist.

Be explicit about file names and sample content for the generated files.


## Designer-focused prompt — visual spec for mockups/implementers

You are a senior product designer. Produce a visual spec and component tokens for a learning site:

- Layout: responsive two-panel (sidebar + content) for desktop, single-column collapsible nav for mobile.
- Breakpoints: sm ≤ 640px, md ≤ 1024px, lg > 1024px.
- Palette: neutral background (#FAFBFC), surface (#FFFFFF), text primary (#0F1724), accent (#2563EB or #059669). Provide hover/focus states and accessible contrast checks.
- Typography: scale (16px base, 20px h2, 18px h3), font stack, line-height 1.6.
- Spacing system: 4px base grid, tokens for small/medium/large padding.
- Components: navigation, cards, code blocks, admonitions, buttons, inputs, search results.
- Provide Figma-ready tokens and CSS variable examples, and a small set of accessible interactions (keyboard nav, aria roles).


## Usage notes — how to use these prompts

- For end-to-end code generation: paste the comprehensive (first) prompt into an LLM with code-generation capability and ask for a file-by-file scaffold. Ask for stepwise output (create project -> add components -> wire content).
- For quick boilerplate: use the concise prompt.
- For visual mockups only: use the designer prompt.
- For CI + tests: use the developer prompt.

Example instruction to the model after pasting prompt: "Start by outputting a file manifest and package.json, then generate core components (Header, Sidebar, ContentRenderer). After that, create a content loader that maps local Markdown files. Finally, add 2 example pages pulled from the repository and a README with setup commands."


## Next steps (suggested)

1. I can scaffold the project in this workspace (React + Vite + Tailwind + MDX) and add two example pages from the repo.
2. I can create a minimal prototype with search and progress tracking.
3. I can refine the prompt for Next.js/SSR or Astro if you prefer server-side rendering.

Pick one option or ask for a custom change and I will implement it.

---

_File created automatically by the assistant._
