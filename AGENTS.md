# omancilla.dev — Instructions

> Always respond in Spanish.

## Critical Rules

IMPORTANT: Never create commits, PRs, or push autonomously. Only when explicitly asked.
- NEVER add a `Co-Authored-By` line crediting the agent to commit messages.
- Make minimal changes — do not refactor unrelated code.
- For multi-file or architectural changes, describe the plan and wait for confirmation.
- Reuse existing patterns and components before creating new ones.
- After every code change, run `pnpm lint:fix`, then fix remaining issues manually.

## Out of Scope

- Do not touch `.env` or any files containing credentials.
- Do not modify generated files: `dist/`, `.astro/`, `node_modules/`, `src/assets/img/`.

## Git

- Branches: `feature/`, `fix/`, `chore/`.
- Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`, etc.

## Session Memory

Working memory lives at `.claude/CONTEXT.md` (local, gitignored). Read it at the start if
present; update it after relevant work with progress and decisions. Use absolute dates.

## Package Manager

ALWAYS use **pnpm**. Valid lockfile: `pnpm-lock.yaml`. The `pnpm-workspace.yaml` only
controls native build permissions — this is NOT a monorepo.

## Stack

- **Framework**: Astro 5 (ESM, `"type": "module"`)
- **Styles**: Tailwind CSS v4 via `@tailwindcss/vite` (no `tailwind.config`)
- **Language**: TypeScript strict (`astro/tsconfigs/strict`)
- **Import alias**: `@/*` → `src/*`
- **Analytics**: `@vercel/analytics` (injected in Layout.astro)

## Architecture

```
src/
├── assets/        # SVGs as .astro components + images in img/
├── components/    # Astro UI components (Header, Footer, Projects, etc.)
├── layouts/       # Layout.astro (base wrapper for all pages)
├── lib/           # Static TypeScript data (projects, experience, stack, tags)
├── pages/         # File-based routing — currently only index.astro
├── styles/        # global.css
└── types/         # Shared TypeScript types
```

- Tech icons live in `src/assets/` as `.astro` components.
- Data (projects, experience, stack) is defined in `src/lib/*.ts` and imported in components.

## Commands

| Action | Command |
|--------|---------|
| Dev server | `pnpm dev` |
| Build | `pnpm build` |
| Preview build | `pnpm preview` |
| Lint | `pnpm lint` |
| Lint with autofix | `pnpm lint:fix` |
