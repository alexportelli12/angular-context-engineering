# Research Summary: Dark Mode Settings Page

## 1. Context Analysis

The project is an Angular v21 application using Standalone components and Server-Side Rendering (SSR).

- **Routing:** The `src/app/app.routes.ts` file is currently empty. A new route entry is required.
- **Styling:** Tailwind CSS is installed. The implementation should leverage Tailwind's dark mode capabilities (likely class-based strategy for manual toggling).
- **State:** The application requires a global state for the theme preference that persists across sessions.

## 2. Risk Assessment

- **SSR/Hydration Mismatch:** Accessing `localStorage` or `window` during Server-Side Rendering will cause errors. The implementation **must** explicitly check for the browser platform or use `afterNextRender`.
- **Flash of Unstyled Content (FOUC) / Flash of Wrong Theme:** If the theme is applied only after Angular bootstraps, the user might see a flash of the light theme before dark mode applies. A script in `index.html` is the robust fix, but for this feature request, handling it in a service with proper SSR guards is the primary accepted risk to minimize complexity initially.
- **Tailwind Configuration:** Tailwind v4 (installed) handles dark mode differently than v3. We need to ensure the correct CSS variables or class strategies are used.

## 3. Recommended Strategy

### Architecture

- **Service (`ThemeService`):** A singleton service `providedIn: 'root'`.
  - **State:** Use a `writableSignal<AppTheme>` ('light' | 'dark' | 'system').
  - **Effect:** Use a `constructor`-based or `APP_INITIALIZER`-based logic (wrapped in `afterNextRender` or platform check) to sync the signal value with `localStorage` and the DOM (`document.documentElement.classList`).
- **Component (`SettingsComponent`):**
  - **Type:** Standalone Component.
  - **Loading:** Lazy loaded in `app.routes.ts` via `loadComponent`.
  - **UI:** Uses Tailwind utility classes to style the toggle.

### Implementation Steps

1.  **Generate Service:** `src/app/core/theme/theme.service.ts`.
    - Logic: `updateTheme(theme)` method.
    - Persistence: `localStorage.setItem('theme', ...)` (Browser only).
2.  **Generate Component:** `src/app/features/settings/settings.component.ts`.
    - Inject `ThemeService`.
    - UI: Buttons or select input to change the signal value.
3.  **Update Routes:** Modify `src/app/app.routes.ts`.
    - Add `{ path: 'settings', loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent) }`.
