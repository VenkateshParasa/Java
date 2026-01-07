# Responsive Learning UI — Comprehensive Prompt

Use this prompt when you want a full scaffold and implementation plan for a responsive, accessible learning site that converts the Markdown-based Java repository into a clean web application.

Goal
Generate a responsive, accessible, content-first web application that turns a Markdown-based Java learning repository into a clean, easy-to-use learning site. The app should be developer-friendly, mobile-first, and optimized for learning.

Prompt (comprehensive)

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
