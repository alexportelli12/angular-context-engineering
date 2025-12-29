# Tech Stack

| Technology       | Version | Notes                                                 |
|------------------|---------|-------------------------------------------------------|
| **Angular**      | ^21.0.0 | Zoneless, SSR, standalone only                        |
| **TypeScript**   | ~5.9.2  | Strict mode                                           |
| **Tailwind CSS** | ^4.1.12 | Uses @theme in CSS (NOT tailwind.config.js)           |
| **Vitest**       | ^4.0.8  | jsdom environment, vi.mock() syntax                   |
| **ESLint**       | ^9.39.1 | Flat config, Angular ESLint 21.1.0                    |
| **Prettier**     | ^3.6.2  | Print width 100, single quotes, Angular HTML parser   |
| **Express**      | ^5.1.0  | SSR server with hydration                             |
| **RxJS**         | ~7.8.0  | Async operations only (NOT state management)          |
| **npm**          | 11.5.1  | Enforced via packageManager                           |

## Angular 21 Features

- **Zoneless:** No Zone.js, OnPush change detection required
- **SSR:** Server-side rendering with @angular/ssr
- **Standalone:** All components standalone (no NgModules)
- **Control Flow:** @if, @for, @switch syntax
- **Signals:** Primary state management

## Tailwind 4 Configuration

Configuration in CSS, NOT JavaScript.

```css
/* ✅ Use @theme in CSS files */
@theme {
  --color-primary: #3b82f6;
}

/* ❌ Do NOT create tailwind.config.js */
```

## Vitest Syntax

```typescript
import { describe, it, expect, vi } from 'vitest';
// Use vi.mock(), not jasmine.createSpy()
```
