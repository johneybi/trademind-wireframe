# AGENTS.md

## 1. Read First

Use these documents in this order when working on the repo.

1. Primary product spec: `docs/TRADEMIND_PRD_v1.2.md`
2. Flow/background context: `docs/trademind-plan-v0.7.md`
3. UX writing rules: `docs/ux-writing.md`
4. LLM contract notes: `docs/llm-prompt-design-v0.3.md`
5. Schema interpretation notes: `docs/database-schema-v1.1.md`
6. Component split rules: `docs/component-boundaries.md`
7. Internal preview rules: `docs/development-preview-navigation.md`

Rules:
- Before changing any screen, read the relevant part of the PRD first.
- If existing UI conflicts with the PRD, follow the PRD unless the user says otherwise.
- If copy conflicts with `docs/ux-writing.md`, follow the UX writing guide.
- If AI chat rendering conflicts with old notes, follow `docs/llm-prompt-design-v0.3.md`.

## 2. Product Truth

This project is not a generic finance UI.

- Product: AI-based investor mental care service
- Service name: `TRADEMIND`
- Core value: help users check whether a decision is rational or emotionally driven
- Core promise: pause, label emotion, review reasoning, then decide

Always preserve these truths:

- This service does not recommend stocks.
- This service does not optimize for trade execution.
- This service is a judgment-check tool, not a brokerage app.
- The user should feel guided to reflect, not evaluated or sold to.

## 3. Current Product Shape

Current MVP information architecture:

- Bottom tabs: `홈 / 대화하기 / 내 기록`
- `홈`: market emotion summary, emotion board preview, main entry
- `대화하기`: input step flow -> AI chat -> result
- `내 기록`: mental calendar only

Important:
- Emotion board belongs to `홈`, not `내 기록`.
- `내 기록` is not a social/community screen.
- `설정` is not part of the current bottom-tab MVP.

## 4. Stack

- React
- Vite
- Tailwind CSS v4
- shadcn/ui
- Motion for React
- Recharts

## 5. Working Style

- Build screens fast and keep them readable.
- Prefer direct implementation over abstraction.
- Prefer simple local state over new state libraries.
- Refactor after repetition becomes clear.
- Keep page files thin when a screen has multiple states.
- Treat screens as prototypes first, not production systems.

## 6. Screen Inventory

Current full-screen prototypes live in `src/pages/screens`.

- `main-screen.tsx`
- `input-entry-screen.tsx`
- `input-flow-screen.tsx`
- `input-screen.tsx`
- `chat-screen.tsx`
- `result-screen.tsx`
- `insights-screen.tsx`
- `assets-preview-screen.tsx`

Current flow component groups live in `src/components`.

- `main-flow`
- `input-flow`
- `chat-flow`
- `result-flow`
- `insights-flow`
- `ui`

## 7. Flow Rules

### 7.1 Input

Input is a step flow, not a long form.

- `0depth` entry and `1depth+` step flow are different screen types.
- `0depth` is an app entry screen with bottom tabs.
- `1depth+` uses step header, back navigation, and bottom CTA.
- Show one decision block at a time.

### 7.2 Chat

Chat uses one shared shell with pre/post variants.

- Flow control: `mode + stage`
- Question contract: `question_type`
- User should understand that the first user message came from the input screen context

### 7.3 Result

Result is one shared screen with pre/post variants.

- `pre`: final decision confirmation
- `post`: saved review record and next move

Do not treat `pre` and `post` as separate products.

### 7.4 Records

Mental calendar is a records screen, not a scoring screen.

- Heatmap meaning: days the user returned to look again
- The heatmap is not a correctness score
- The heatmap is not an emotion category map
- Detail cards below the heatmap carry emotion, distortion, and summary

## 8. UX Writing Rules

Use Korean by default unless asked otherwise.

Tone should be:

- concise
- calm
- operational
- emotionally aware
- non-preachy

Avoid:

- marketing slogans
- hype language
- decorative filler
- expert/financial guru tone
- system-heavy wording when user language is possible

Core writing rules:

- Ask, do not command.
- Use everyday language, not clinical terms.
- Keep helper copy to one or two short lines.
- Avoid words like `입력`, `기록`, `분석`, `왜곡` in top-level UI unless necessary.
- Prefer user-state language like `마음`, `생각`, `다시 돌아봄`, `걸리는 순간`.

Typography rules:

- `sans` for labels, buttons, tabs, stats, inputs
- `serif` only for short supporting copy, AI empathy, and reflective helper lines

## 9. Mental Calendar Rules

Treat the mental calendar carefully.

Do:

- Use the heatmap to show when the user came back to look again
- Let stronger shade mean more than one record on the same day if needed
- Put emotion/distortion/summary in lower detail sections

Do not:

- Color the calendar by `관망 / 진행 / 기록`
- Treat `관망 / 진행 / 기록` as one user-facing category set
- Turn the calendar into a correctness/performance dashboard

Preferred section framing under the heatmap:

- `자주 걸리는 생각`
- `마음이 남았던 순간들`

## 10. shadcn/ui Usage

Use shadcn/ui when it improves speed, accessibility, or interaction quality.

Current repo direction:

- Keep appearance stable
- Prefer swapping internals to shadcn primitives when possible
- Preserve the visual result unless the user asks for redesign

Good candidates for shadcn:

- dialog / sheet
- input / textarea
- button
- command-based search

Do not force every custom visual element through shadcn if plain Tailwind is simpler.

## 11. Home Index Rules

`src/pages/home-page.tsx` is an internal development index.

- Keep text dry and short.
- Do not turn it into a landing page.
- Use it to inspect screens and internal preview states.
- If a screen has multiple meaningful states, expose them through `src/pages/screen-registry.tsx`.

## 12. Internal Preview Rules

For development preview states:

- Register them in `src/pages/screen-registry.tsx`
- Keep labels short and ordered
- Use preview states for internal visibility only
- Do not add real routing just to inspect prototype states

## 13. Implementation Preferences

- Reuse existing spacing and primitives first.
- Keep components flat and readable.
- Split by edit boundary before splitting by reuse.
- Keep the page container thin when a flow has many steps.
- Avoid global state unless clearly needed.
- Avoid tests, Storybook, or extra tooling unless requested.
- Avoid unnecessary dependencies.

## 14. AI-Friendly Component Boundaries

Good default structure for a multi-state screen:

- page container: state and transitions only
- entry view
- per-step or per-stage views
- shared shell/header/footer

Split smaller only when:

- a block is edited often on its own
- a repeated pattern has stabilized
- a smaller boundary will help localized AI-assisted edits

## 15. Definition Of Done

A screen task is usually done when:

- the intended flow matches `docs/TRADEMIND_PRD_v1.2.md`
- the screen feels like TRADEMIND, not a generic finance app
- the screen is implemented
- the screen is registered in the home index if it is full-page
- `npm.cmd run build` succeeds

## 16. What To Avoid

- Do not redesign the whole project structure.
- Do not replace the home index with a marketing page.
- Do not add verbose placeholder copy.
- Do not frame the service as a stock picker.
- Do not imply guaranteed outcomes or investment advice.
- Do not treat mental calendar data like a performance grade.
