# Designer-focused Prompt — Visual Spec & Tokens

Use this prompt when you want visual mockups, tokens, or a design system spec for implementers.

You are a senior product designer. Produce a visual spec and component tokens for a learning site:

- Layout: responsive two-panel (sidebar + content) for desktop, single-column collapsible nav for mobile.
- Breakpoints: sm ≤ 640px, md ≤ 1024px, lg > 1024px.
- Palette: neutral background (#FAFBFC), surface (#FFFFFF), text primary (#0F1724), accent (#2563EB or #059669). Provide hover/focus states and accessible contrast checks.
- Typography: scale (16px base, 20px h2, 18px h3), font stack, line-height 1.6.
- Spacing system: 4px base grid, tokens for small/medium/large padding.
- Components: navigation, cards, code blocks, admonitions, buttons, inputs, search results.
- Provide Figma-ready tokens and CSS variable examples, and a small set of accessible interactions (keyboard nav, aria roles).

Ask for mockups at 3 breakpoints and provide a simple HTML/CSS example using Tailwind utility classes for each component.