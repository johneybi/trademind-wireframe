`src/pages` is for full screens and the dev index.

- Put actual screen files in `src/pages/screens`
- Use `kebab-case` filenames and end them with `-screen.tsx`
- Register each screen in `src/pages/screen-registry.tsx`
- Registry order is implementation priority
- Extract only repeated pieces into `src/components`
- During a hackathon, finish the page first and refactor later
