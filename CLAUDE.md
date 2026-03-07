# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
deno task start      # Dev server with hot reload (watches static/, routes/)
deno task build      # Build for production
deno task preview    # Preview production build

# Testing
deno task test                                      # Run all tests
deno test --allow-read --allow-write --allow-env --allow-net path/to/file_test.ts  # Run single test file

# Linting (built-in deno lint)
deno lint
deno fmt
```

## Architecture

This is a **Deno + Fresh** (Preact-based SSR framework) portfolio site.

### Directory Structure

- `routes/` — Fresh file-based routing. Each route file exports a `handler` and a default component. Routes delegate to domain handlers/components.
- `domains/` — Domain-driven modules, each owning its page handler, page component, and page-specific resources.
  - `home/`, `post/`, `og/`, `privacy/`, `sitemap/`
- `shared/` — Cross-domain utilities and UI primitives.
- `islands/` — Fresh islands (client-side interactive components, e.g., `Highlight.tsx`).
- `core/` — Low-level utilities (e.g., CSS normalization).

### Path Aliases (defined in `deno.jsonc`)

| Alias | Path |
|---|---|
| `@core/` | `./core/` |
| `@shared/` | `./shared/` |
| `@home/` | `./domains/home/` |
| `@post/` | `./domains/post/` |
| `@og/` | `./domains/og/` |
| `@privacy/` | `./domains/privacy/` |
| `@sitemap/` | `./domains/sitemap/` |
| `@islands/` | `./islands/` |

### Key Patterns

**Route → Domain separation**: Routes are thin — they import and re-export the handler and component from the corresponding domain. Business logic lives in `domains/`.

**Handler pattern**: Each page has a `*.handler.ts` exporting a Fresh `Handlers<Data>` object and a `Data` type. The handler fetches data (from MicroCMS or GitHub API) and calls `ctx.render(data)`.

**Caching**: `shared/cache/` provides an `InstantCache` abstraction with memory and local (file) backends. Handlers wrap fetch functions with `createInstantCache(key)(fn)` when `APP_ENV !== "prod"` (controlled by `shared/env/mod.ts`).

**Styling**: Stitches (`@stitches/core`) is used for CSS-in-JS via `shared/styles/`. Use `css()` from `@shared/styles/css.ts` for component styles; theme tokens (e.g., `$text`, `$2xl`) are defined in `shared/styles/_theme.ts`.

**Content source**: Blog posts come from **MicroCMS** via `shared/micro_cms/`. GitHub repository data is fetched via Octokit (`shared/github/`).

**OG image generation**: Dynamic OG images are generated server-side using Satori + resvg-wasm in `domains/og/`.

### Environment Variables

| Variable | Purpose |
|---|---|
| `APP_ENV` | Set to `"prod"` for production (enables post filtering, disables MicroCMS cache) |
| `MICROCMS_API_KEY` | MicroCMS API key |
| `GA_TAG_ID` | Google Analytics tag ID |
| `GAD_ID` | Google Ads ID |

### Test Convention

Test files are co-located with source files and named `*_test.ts`. Shared test cases are extracted into `*_test_case.ts` files and reused across implementations (e.g., cache backends).
