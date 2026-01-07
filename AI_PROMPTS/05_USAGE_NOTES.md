# Usage Notes — Which prompt to send and how

This file explains which prompt file to give to an LLM and suggested stepwise workflows.

Quick mapping
- Full scaffold / plan → `01_COMPREHENSIVE_PROMPT.md`
- Short experiments → `02_CONCISE_PROMPT.md`
- File-by-file code generation → `03_DEVELOPER_PROMPT.md`
- Visual design and tokens → `04_DESIGNER_PROMPT.md`

Stepwise workflow (recommended)
1. Provide repo context: one-paragraph summary + list of top-level folders (`00_Getting_Started`, `01_Core_Courses`, ...). Attach 1–3 sample markdown files.
2. Start with `01_COMPREHENSIVE_PROMPT.md` and ask for a file manifest + `package.json`.
3. Use `03_DEVELOPER_PROMPT.md` to request core files in batches (layout -> components -> utilities -> tests).
4. Use `04_DESIGNER_PROMPT.md` to request Tailwind tokens and component examples.
5. Iterate: request single-file edits with "Return only the file contents for `path`" to minimize token noise.

Metadata & machine-friendly usage
- Add YAML frontmatter to the top of each prompt file when feeding programmatically, e.g.:

---
name: comprehensive
stack: react-vite-mdx-tailwind
intent: scaffold
---

- Or create a `prompts.json` manifest mapping short keys to filenames and small descriptions.

Example `prompts.json` (create in `AI_PROMPTS/`):
{
  "comprehensive": "01_COMPREHENSIVE_PROMPT.md",
  "concise": "02_CONCISE_PROMPT.md",
  "developer": "03_DEVELOPER_PROMPT.md",
  "designer": "04_DESIGNER_PROMPT.md",
  "usage": "05_USAGE_NOTES.md"
}

Tips for token limits
- Send at most 2-3 markdown files per request.
- Ask for file manifests first.
- Request files one at a time or in small batches.

If you want, I can create `prompts.json` and add YAML frontmatter to each prompt file for programmatic use.