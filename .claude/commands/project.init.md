# Initialize Project: $ARGUMENTS

Initialize a new project by removing placeholder content, configuring project name, and optionally setting up additional technologies.

> **IMPORTANT:** This command should only be run ONCE when initializing a fresh clone of the repository. It will remove all placeholder components and reconfigure the project.

---

## Phase 1: Gather Requirements

### Collect Project Information

Use the `AskUserQuestion` tool to gather:

1. **Project Name** (required)
   - Question: "What is your project name?"
   - Header: "Project Name"
   - Validation: Must be kebab-case (lowercase with hyphens)
   - Examples: "my-angular-app", "ecommerce-platform", "portfolio-site"

2. **Project Description** (optional)
   - Question: "Provide a brief description of your project (optional)"
   - Header: "Description"
   - Will be added to package.json

3. **Additional Technologies** (optional, multi-select)
   - Question: "Which additional technologies would you like to set up?"
   - Header: "Technologies"
   - Options:
     - **Firebase** - Backend services (Auth, Firestore, Storage, Hosting)
     - **NgRx Signal Store** - Advanced state management for complex apps
     - **Storybook** - Component documentation and visual testing
     - **None** - Skip additional setup

---

## Phase 2: Remove Placeholder Content

### Delete Placeholder Components

Remove the following template/example components:

```bash
# Remove introduction page (placeholder landing page)
rm -rf src/app/pages/introduction/

# Remove code-block component (example shared UI component)
rm -rf src/app/shared/ui/code-block/
```

### Update Barrel Exports

After removing components, update barrel exports:

**`src/app/pages/index.ts`:**
```typescript
// Empty - ready for your first page component
```

**`src/app/shared/ui/index.ts`:**
```typescript
// Empty - ready for your first shared UI component
```

### Create Default Home Route

Create a minimal placeholder home component:

**`src/app/pages/home/home.ts`:**
```typescript
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly projectName = signal('{user-provided-project-name}');
}
```

**`src/app/pages/home/home.html`:**
```html
<div class="flex min-h-screen items-center justify-center">
  <div class="text-center">
    <h1 class="mb-4 text-4xl font-bold">Welcome to {{ projectName() }}</h1>
    <p class="text-gray-600">Your Angular 21 project is ready to go!</p>
    <p class="mt-4 text-sm text-gray-500">Start building by running: <code class="rounded bg-gray-100 px-2 py-1">/prp.draft your feature description</code></p>
  </div>
</div>
```

**`src/app/pages/home/home.css`:**
```css
/* Add custom styles if Tailwind is insufficient */
```

**`src/app/pages/home/index.ts`:**
```typescript
export * from './home';
```

### Update Routes

**`src/app/app.routes.ts`:**
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then((m) => m.HomeComponent),
  },
];
```

---

## Phase 3: Update Configuration Files

### Update package.json

Replace project name and add description:

```json
{
  "name": "{user-provided-project-name}",
  "description": "{user-provided-description}",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "serve:ssr:{user-provided-project-name}": "node dist/{user-provided-project-name}/server/server.mjs",
    "lint": "ng lint",
    "lint:fix": "ng lint --fix"
  },
  // ... rest remains the same
}
```

### Update angular.json

Replace project name in angular.json:

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "projects": {
    "{user-provided-project-name}": {
      "projectType": "application",
      // ... rest of config
    }
  }
}
```

**Search and replace all instances** of "angular-context-engineering" with the user-provided project name.

### Update App Component

**`src/app/app.ts`:**

Update the title signal:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('{user-provided-project-name}');
}
```

### Update App Tests

**`src/app/app.spec.ts`:**

Update test expectations with new project name:

```typescript
import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Hello, {user-provided-project-name}',
    );
  });
});
```

### Update Project State

**`.ai/memory/project-state.md`:**

Update the Application Overview section:

```markdown
## Application Overview

**Name:** {User-provided project name in Title Case}
**Type:** Angular 21 SPA (Single Page Application)
**Stage:** Initialized - ready for feature development

---

## Implemented Features

### Feature: Home Page (Default)

- **PRP:** N/A (initial setup)
- **Status:** Complete
- **Components:**
  - `HomeComponent` (pages/home/)
- **Services:** None
- **Models:** None
- **Routes:**
  - `/` → HomeComponent (default route)
- **Notes:**
  - Minimal placeholder home page
  - Ready to be replaced with actual landing page
  - Follows Angular 21 conventions
```

Update the Recent Changes section:

```markdown
## Recent Changes

| Date       | Change                                 | PRP Reference |
| ---------- | -------------------------------------- | ------------- |
| {today}    | Project initialized with /project.init | N/A           |
```

---

## Phase 4: Optional Technology Setup

### If User Selected: Firebase

1. **Install Firebase dependencies:**
```bash
npm install @angular/fire firebase
```

2. **Create environment files:**

**`src/environments/environment.ts`:**
```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
```

**`src/environments/environment.production.ts`:**
```typescript
export const environment = {
  production: true,
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
};
```

3. **Update app.config.ts:**
```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
```

4. **Inform user:**
```
✅ Firebase setup complete!

Next steps:
1. Create a Firebase project at https://console.firebase.google.com
2. Copy your Firebase config and paste it into src/environments/environment.ts
3. Enable the services you need (Auth, Firestore, etc.) in Firebase Console
```

### If User Selected: NgRx Signal Store

1. **Install NgRx Signal Store:**
```bash
npm install @ngrx/signals
```

2. **Create example store:**

**`src/app/services/example.store.ts`:**
```typescript
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

interface ExampleState {
  items: string[];
  loading: boolean;
}

const initialState: ExampleState = {
  items: [],
  loading: false,
};

export const ExampleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addItem(item: string) {
      patchState(store, (state) => ({
        items: [...state.items, item],
      }));
    },
    setLoading(loading: boolean) {
      patchState(store, { loading });
    },
  }))
);
```

3. **Inform user:**
```
✅ NgRx Signal Store setup complete!

Example store created at: src/app/services/example.store.ts

Usage in components:
  private store = inject(ExampleStore);
  items = this.store.items;  // signal
  loading = this.store.loading;  // signal
  this.store.addItem('new item');
```

### If User Selected: Storybook

1. **Initialize Storybook:**
```bash
npx storybook@latest init --type angular
```

2. **Update package.json scripts (if not auto-added):**
```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
```

3. **Inform user:**
```
✅ Storybook setup complete!

Run Storybook:
  npm run storybook

Create stories for your components in .stories.ts files
Documentation: https://storybook.js.org/docs/angular
```

---

## Phase 5: Validation

### Build and Lint

Run validation to ensure everything is working:

```bash
npm run build
npm run lint
```

If any errors occur:
- Fix TypeScript compilation errors
- Fix ESLint issues
- Re-run validation

---

## Phase 6: Final Summary

Provide a comprehensive summary to the user:

```
🎉 Project initialization complete!

Project Name: {user-provided-project-name}
Description: {user-provided-description}

✅ Removed placeholder components (IntroductionComponent, CodeBlockComponent)
✅ Created minimal HomeComponent at src/app/pages/home/
✅ Updated package.json (name, description, ssr script)
✅ Updated angular.json (project name in all locations)
✅ Updated src/app/app.ts (title signal)
✅ Updated src/app/app.spec.ts (test expectations)
✅ Updated app.routes.ts (default route to HomeComponent)
✅ Updated project state documentation
{list any technologies set up}

Next Steps:
1. Start the dev server: npm start
2. Visit http://localhost:4200 to see your home page
3. Create your first feature: /prp.draft [feature description]

Example:
  /prp.draft user authentication with email and password
  /prp.generate user-authentication
  /prp.execute user-authentication

Documentation:
- Architecture: .ai/context/core/architecture.md
- Coding Standards: .ai/context/core/coding-standards.md
- PRP Workflow: CLAUDE.md
```

---

## Execution Checklist

- [ ] Gathered project name and description from user
- [ ] Gathered technology preferences from user
- [ ] Removed placeholder components (introduction, code-block)
- [ ] Updated barrel exports (pages/index.ts, shared/ui/index.ts)
- [ ] Created minimal HomeComponent with project name
- [ ] Updated app.routes.ts (point to HomeComponent)
- [ ] Updated package.json (name, description, ssr script)
- [ ] Updated angular.json (project name - all instances)
- [ ] Updated src/app/app.ts (title signal)
- [ ] Updated src/app/app.spec.ts (test expectations)
- [ ] Updated project state documentation
- [ ] Set up selected technologies (if any)
- [ ] Ran npm run build successfully
- [ ] Ran npm run lint successfully
- [ ] Provided comprehensive summary to user

---

## Important Notes

- This command is **destructive** - it removes existing template components
- Only run this ONCE on a fresh repository clone
- All configuration changes are permanent
- The project will be ready for feature development after completion
- The home page is minimal and should be replaced with actual content via PRP workflow
