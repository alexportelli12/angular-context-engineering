# Tech Stack

| Technology       | Version | Notes                                                     |
| ---------------- | ------- | --------------------------------------------------------- |
| **Angular**      | ^21.0.0 | Zoneless, SSR enabled, standalone components only         |
| **TypeScript**   | ~5.9.2  | Strict mode (null checks, no implicit any)                |
| **Tailwind CSS** | ^4.1.12 | ⚠️ Uses `@theme` blocks in CSS (not `tailwind.config.js`) |
| **Vitest**       | ^4.0.8  | jsdom environment, use `vi.mock()` not Jasmine            |
| **ESLint**       | ^9.39.1 | Flat config, Angular ESLint 21.1.0                        |
| **Prettier**     | ^3.6.2  | Print width 100, single quotes, Angular HTML parser       |
| **Express**      | ^5.1.0  | SSR server with hydration support                         |
| **RxJS**         | ~7.8.0  | Async operations only (not state management)              |
| **npm**          | 11.5.1  | Enforced via packageManager field                         |

## Critical Configuration Notes

### Angular 21

- ✅ **Zoneless**: No Zone.js, use OnPush change detection
- ✅ **SSR**: Server-side rendering with `@angular/ssr`
- ✅ **Standalone**: All components use `standalone: true`
- ✅ **Modern Control Flow**: `@if`, `@for`, `@switch` syntax
- ✅ **Signals**: Primary state management mechanism

### Tailwind 4

⚠️ **Breaking Change**: Configuration in CSS, not JavaScript

```css
/* ✅ Correct: Use @theme in CSS files */
@theme {
  --color-primary: #3b82f6;
}

/* ⛔ Do NOT create tailwind.config.js */
```

### Vitest

Use Vitest syntax (not Jasmine/Jest):

```typescript
import { describe, it, expect, vi } from 'vitest';
// Use vi.mock(), not jasmine.createSpy()
```
