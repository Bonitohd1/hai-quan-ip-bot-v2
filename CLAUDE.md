---
name: ClaudeKit Project
description: Guidelines for developing the Hai Quan IP Bot dashboard.
---

# 🤖 ClaudeKit Development Guidelines

### Build & Run
- **Dev**: `npm run dev`
- **Build**: `npm run build`
- **Database**: `npx prisma db push`, `npx prisma generate`
- **Lint**: `npm run lint`

### Structure
- `app/`: Next.js App Router (pages and API routes).
- `components/`: Reusable React components.
- `lib/`: Shared utilities (Prisma client, logger).
- `prisma/`: Database schema and migrations.
- `public/`: Assets (PDF documents, icons).

### Code Standards
- **TypeScript**: Always use strict typing.
- **Tailwind CSS**: Use utility classes for styling. Follow premium design rules (gradients, glassmorphism).
- **Hooks**: Use functional components with hooks.
- **Logging**: Use `lib/logger.ts` for all logs.
- **Error Handling**: Use try-catch in API routes and show user-friendly errors in UI.

### Design Principles
- **Aesthetics**: Wows the user at first glance.
- **Animations**: Use smooth transitions and hover effects.
- **Accessibility**: Ensure ARIA tags and semantic HTML.
- **Responsive**: Mobile-first design for all pages.
