# TRADEMIND Component Boundary Guide

This document defines how to split screens when working quickly with AI-assisted edits.

## Goal

Prefer boundaries that make future edits safer and more localized.

- reduce accidental edits across unrelated steps
- keep copy and UI for one step in one place
- make state ownership obvious
- avoid oversized screen files that mix multiple concerns

## Core Rule

Split by edit boundary before splitting by reuse.

That means:

- a piece that will likely be revised on its own should usually be its own component
- a repeated piece should not be extracted if that makes the screen harder to follow
- a page file should stay thin when a screen contains multiple modes, steps, or shells

## Default Pattern For Step Flows

Use this structure by default for a step-based screen:

- container screen
  - owns state
  - owns step transitions
  - owns submit timing
- entry view
  - first landing state before the step flow
- per-step views
  - one question per component
  - one step-specific layout per component
- bridge view
  - transition state before the next page or system action
- shared shell
  - fixed header
  - fixed footer / CTA

## What Belongs In The Container

Keep these in the page container:

- `useState` and derived state
- `goNext`, `goBack`, and submit timing
- data shaping across steps
- top-level screen branching

Do not keep detailed step markup in the container if that markup is likely to change independently.

## What Belongs In A Step Component

Each step component should own:

- its title
- its support copy
- its input elements
- its step-local layout
- only the callbacks it needs

Each step component should avoid:

- unrelated step UI
- global flow logic
- cross-step conditional trees when a parent can decide which step to render

## When To Split Smaller

Go smaller only when one of these is true:

- the block is edited frequently on its own
- the block is repeated with stable behavior
- the block has a clear semantic role such as `SelectedStockCard` or `FlowFooter`
- the smaller boundary will help AI edit one area without touching another

## When Not To Split Smaller

Do not create tiny components just because a section has a few tags or wrappers.

Avoid extracting:

- single-use wrappers with no meaning
- one-off text groups that are easier to read inline
- fragments that make the main step harder to follow

## UX Writing Alignment

Component boundaries should match writing boundaries.

- one step = one main question
- one block = one message
- helper copy should stay near the input it explains
- bridge copy should live in a bridge component, not inside a data-entry step

## Current Input Flow Standard

For the input flow, the preferred split is:

- `InputScreen`
- `InputEntryView`
- `InputFlowHeader`
- `InputStockStep`
- `InputEmotionStep`
- `InputDetailStep`
- `InputBridgeStep`
- `InputFlowFooter`

This is the baseline to follow unless a user explicitly asks for a different structure.

## Current Chat Flow Standard

For the chat flow, prefer a data-driven split instead of separate hardcoded screens.

- `ChatScreen`
- `ChatConversationPreview`
- `ChatHeader`
- `DistortionBanner`
- `ChatMessageList`
- `ChatMessageBubble`
- `ChatFooter`
- `chatScenarios`
- `buildChatViewModel`

Use this pattern when:

- the screen is still a conversation even in preview mode
- later states should include earlier messages
- the UI should be reusable once real AI responses are connected

Keep the chat container thin.

- choose the active scenario
- convert prompt-shaped data into a view model before rendering
- pass the scenario into the conversation preview
- avoid hardcoding one JSX tree per preview state inside the page file

## Current Result Flow Standard

For the result flow, prefer one screen with mode variants instead of separate page files for pre and post.

- `ResultScreen`
- `ResultPreview`
- `ResultHeader`
- `ResultSummaryCard`
- `TogetherPanel`
- `ResultActions`
- `resultScenarios`

Use this pattern when:

- pre and post share the same page shell
- the summary and community sections are structurally similar
- the last action is the main thing that changes between modes

Keep the result container thin.

- choose the active result scenario
- pass mode-specific data into shared sections
- keep pre/post differences in scenario data and action components
- avoid duplicating the whole page just because the CTA differs

## Current Insights Flow Standard

For insights, prefer one screen with internal tabs instead of separate full-page screens for calendar and board.

- `InsightsScreen`
- `InsightsPreview`
- `InsightsHeader`
- `CalendarView`
- `EmotionBoardView`
- shared data module for mock records and stories

Use this pattern when:

- the bottom tab already exposes one broad `insights` destination
- multiple read-only views belong to the same information area
- the user should switch context without leaving the same app section

Keep the insights container thin.

- accept an initial tab for development preview
- own only the active tab state
- render tab-specific content through separate view components

## Development Preview States

When a screen contains multiple meaningful internal states, make those states addressable from the home index.

- register preview states in `src/pages/screen-registry.tsx`
- keep labels short and ordered
- pass an initial preview state into the screen container
- remount the screen when the selected preview state changes
- use a dedicated development preview pattern instead of product-facing fake tabs

See also: `docs/development-preview-navigation.md`

This keeps development navigation lightweight.

- no extra router work
- no fake production tabs inside the app shell
- easy comparison between entry, step, and bridge states
