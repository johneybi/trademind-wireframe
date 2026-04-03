# TRADEMIND Development Preview Navigation Guide

This document defines how to expose step flows and internal screen states in the development index.

## Goal

Make multi-state screens easy to inspect without adding unnecessary product routing.

- preview each meaningful state directly from the home index
- keep implementation lightweight for hackathon-speed work
- avoid fake production UI added only for review
- let AI-assisted edits target one state at a time

## Use This Pattern When

Apply this pattern when a screen:

- has an entry state and one or more follow-up steps
- has a bridge or transition screen before the next page
- contains multiple meaningful states that should be reviewed independently
- would otherwise require repeated clicking through the same flow during development

Examples:

- input flow
- chat flow with multiple conversation phases
- result flows with different completion states

Good preview labels for chat:

- `1. 사전 - 응답 대기`
- `2. 사전 - 질문`
- `3. 사전 - 핵심 선택`
- `4. 사후 - 질문`
- `5. 사후 - 복기 완료`

Good preview labels for results:

- `1. 사전 - 선택 직전`
- `2. 사후 - 기록 완료`

Good preview labels for insights:

- `1. 멘탈 캘린더`
- `2. 감정 공유 보드`

## Core Rule

Development preview navigation belongs in the home index, not inside the product UI.

That means:

- do not add fake tabs inside the mobile screen just for internal review
- do not split every step into real routes unless the user explicitly wants routing
- keep production-facing navigation separate from development preview navigation

## Standard Pattern

Use this setup by default:

1. Register the full screen in `src/pages/screen-registry.tsx`
2. Add `previewStates` for each meaningful internal state
3. Keep labels short and ordered
4. Let the screen container accept an initial preview state
5. Remount the screen when the selected preview state changes

## Preview State Rules

Preview states should be:

- meaningful
- stable
- easy to scan
- aligned to the actual flow order

Good labels:

- `0. 진입`
- `1. 종목`
- `2. 감정`
- `3. 상황`
- `4. 브릿지`

Avoid:

- vague labels like `화면 A`, `화면 B`
- too many tiny states that only differ by one spacer or one chip
- engineering-only labels that hide the user flow

## What Counts As A Preview State

A preview state is justified when at least one of these is true:

- the copy changes meaningfully
- the layout changes meaningfully
- the shell changes, such as entry vs step vs bridge
- the user is answering a different question
- the state will likely be edited independently later

Do not create preview states for:

- minor visual variants
- tiny validation changes
- one-off hover or pressed states

## Container Responsibilities

The screen container should:

- own the state
- own the step transitions
- accept an initial preview state
- derive initial mock data for that preview state

The container should not:

- duplicate preview navigation UI inside the screen
- depend on router state unless routing is a real product requirement

## Home Index Responsibilities

The home index should:

- show first-level screen navigation
- show second-level preview navigation only when the active screen has preview states
- remount the preview when the state changes
- keep labels operational and compact

The home index should not:

- mimic the final app navigation too closely
- become a full QA dashboard
- hold complex business logic for each screen

## Relationship To Component Boundaries

Preview navigation and component boundaries should work together.

- if a flow has preview states, it should usually have per-step components
- entry, step, bridge, and fixed shell pieces should stay separate
- a thin container makes preview-state injection simple and safe

## TRADEMIND Default

For TRADEMIND, this is the default expectation:

- step flows are previewed from the development index
- internal preview navigation is a dev tool, not a product feature
- routing is optional and should be added only when the user explicitly wants real navigation
