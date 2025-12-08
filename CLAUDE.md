# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Talmud study application focused on the Megillah tractate. Interactive learning platform featuring Gemara text summaries with Rashi and Tosafot commentaries, study questions with reveal-able answers, and "Ein Bein" comparisons.

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript (strict mode)
- Tailwind CSS 4
- Jest + React Testing Library

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm lint         # Run ESLint on src/
pnpm lint:fix     # Auto-fix linting issues
pnpm test         # Run tests
pnpm test:watch   # Run tests in watch mode
pnpm test -- src/__tests__/file.test.ts  # Run single test
```

## Architecture

### Data Structure (`src/lib/data/`)

Data is split into separate files for easy maintenance:

- `pages.ts` - Page metadata and content resolver functions
- `study-topics.ts` - Gemara sections with commentaries
- `comparison-items.ts` - "Ein Bein" halachic differences
- `index.ts` - Re-exports all data

### Adding New Pages

1. Add page metadata to `src/lib/data/pages.ts`:
```typescript
{
  id: "page_new",
  title: "Page Title",
  description: "Page description",
  icon: "material_icon_name",
  type: "study" | "comparison",
}
```

2. Add content to appropriate file:
   - For study pages: add StudyTopic to `study-topics.ts`
   - For comparison pages: add items to `comparison-items.ts`

3. Update `pageToTopicMap` in `pages.ts` to link page to content

### API Endpoints

- `GET /api/pages` - List all pages (metadata only)
- `GET /api/pages/[id]` - Get full page content
- `GET /api/images/[id]` - Serve images by ID (tiberias, ptolemy, ahasuerus, beit-midrash)

### Component Structure

- `HomePage` (`src/app/page.tsx`) - Fetches pages list, loads content on demand
- `WelcomePage` - Landing page with page selection grid
- `StudyCard` - Displays Gemara section with commentaries and Q&A
- `ComparisonView` - Interactive "Ein Bein" comparisons grid
- `CommentaryBox` - Toggleable Rashi/Tosafot display
- `PageNavigation` - Previous/next page navigation
- `Header` / `MobileNav` - Navigation components

### Images API (`/api/images/[id]`)

Images are served through an API endpoint, stored in `src/assets/images/`.

Available image IDs:
- `beit-midrash` - Scholars studying (intro banner)
- `tiberias` - Ancient Tiberias by the sea
- `ptolemy` - Ptolemy with the 72 elders
- `ahasuerus` - King's feast

To add new images:
1. Add the image file to `src/assets/images/`
2. Register the ID mapping in `src/app/api/images/[id]/route.ts`
3. Reference as `/api/images/[id]` in study-topics or components

### Types (`src/types/`)

- `PageInfo` - Page metadata for navigation
- `PageContent` - Full page with content
- `StudyTopic` - Gemara section data
- `ComparisonItem` - Ein Bein comparison

## Code Conventions

- Path alias: `@/*` maps to `./src/*`
- ESLint enforces explicit return types and disallows `any`
- Unused vars with `_` prefix are allowed
- Hebrew content throughout (RTL layout)
- Uses Material Symbols icons
