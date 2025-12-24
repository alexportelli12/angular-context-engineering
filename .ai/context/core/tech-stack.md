# Tech Stack

## Framework & Runtime

### Angular 21
- **Version**: ^21.0.0
- **Configuration**:
  - ✅ **Zoneless Mode Enabled**: Application runs without Zone.js for improved performance
  - ✅ **Server-Side Rendering (SSR) Enabled**: Using `@angular/ssr` ^21.0.1
  - ✅ **Standalone Components**: All components use standalone: true
  - ✅ **Modern Control Flow**: Using @if, @for, @switch syntax
  - ✅ **Signal-based Reactivity**: Leveraging Angular Signals for state management

### TypeScript
- **Version**: ~5.9.2
- **Configuration**: Strict mode enabled
- **Key Features**:
  - Strict null checks
  - Strict function types
  - No implicit any
  - Full type safety enforcement

## Styling

### Tailwind CSS 4
- **Version**: ^4.1.12
- **PostCSS Integration**: Using `@tailwindcss/postcss` ^4.1.12
- **Important Notes**:
  - ⚠️ Tailwind 4 uses CSS variables and `@theme` blocks instead of `tailwind.config.js`
  - ⚠️ Configuration is in CSS files, not JavaScript
  - Uses modern CSS features for theming and customization

## Testing

### Vitest
- **Version**: ^4.0.8
- **Environment**: jsdom (^27.1.0)
- **Integration**: Via `@angular/build` ^21.0.1
- **Key Syntax**:
  - `vi.mock()` for mocking
  - `describe()` for test suites
  - `it()` or `test()` for individual tests
  - `expect()` for assertions
  - `beforeEach()`, `afterEach()` for setup/teardown

## Linting & Formatting

### ESLint
- **Version**: ^9.39.1
- **Angular ESLint**: 21.1.0
- **TypeScript ESLint**: 8.47.0
- **Configuration**: ESLint flat config format

### Prettier
- **Version**: ^3.6.2
- **Integration**:
  - `eslint-config-prettier` ^10.1.8
  - `eslint-plugin-prettier` ^5.5.4
- **Configuration**:
  - Print width: 100
  - Single quotes enabled
  - Angular HTML parser for templates

## Server

### Express
- **Version**: ^5.1.0
- **Purpose**: SSR server and API endpoints
- **Usage**: Serves server-side rendered Angular application with hydration support

## Core Libraries

### RxJS
- **Version**: ~7.8.0
- **Usage**: Reactive programming, HTTP requests, async operations

### Node Types
- **Version**: ^20.17.19
- **Purpose**: TypeScript definitions for Node.js APIs

## Package Manager

### npm
- **Version**: 11.5.1 (enforced via packageManager field)

---

## AI Assistant Instructions

### When Writing Components
```typescript
// ✅ Always use standalone components
@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, FormsModule],
  // ...
})

// ✅ Use modern control flow
@if (condition) {
  <div>Content</div>
}

@for (item of items; track item.id) {
  <div>{{ item.name }}</div>
}

// ✅ Assume zoneless configuration
// - No Zone.js patching
// - Use ChangeDetectorRef or signals for change detection
// - Prefer OnPush change detection strategy
```

### When Writing Tests
```typescript
// ✅ Use Vitest syntax, NOT Jasmine
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('MyComponent', () => {
  it('should render', () => {
    expect(component).toBeTruthy();
  });

  // Use vi.mock, NOT jasmine.createSpy
  const mockService = vi.fn();
});
```

### When Writing Styles
```css
/* ✅ Use Tailwind 4 syntax with @theme */
@theme {
  --color-primary: #3b82f6;
  --spacing-custom: 1.5rem;
}

/* ✅ Use CSS variables */
.element {
  color: var(--color-primary);
}

/* ⛔ Do NOT create tailwind.config.js */
/* Configuration is done in CSS files with @theme blocks */
```

### When Writing Server Code
```typescript
// ✅ Express 5 syntax
import express, { Request, Response } from 'express';

const app = express();

app.get('/api/endpoint', (req: Request, res: Response) => {
  res.json({ data: 'value' });
});
```

### General Guidelines
- **Always use standalone components** - No NgModules
- **Prefer signals over observables** for local state
- **Use OnPush change detection** (required for zoneless)
- **Write Vitest tests** - Not Jasmine or Jest
- **Follow strict TypeScript** - No any types, explicit return types
- **Use Tailwind utilities** - Minimal custom CSS
- **Leverage SSR capabilities** - Consider server-side rendering implications
- **Follow ESLint rules** - Run `npm run lint:fix` when making changes
