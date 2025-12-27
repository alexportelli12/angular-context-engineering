# PRP: Template Introduction Page

## Purpose

Create a modern, visually appealing welcome page that serves as the landing page for developers who fork and run this Angular 21 template repository. The page educates users about the repository's purpose, the PRP workflow, and provides a quick start guide for building their first feature.

---

## Goal

Build a comprehensive introduction page at the root route (`/`) that explains:

- The repository's purpose as an Angular 21 starter template optimized for Claude Code AI agents
- The PRP (Product Requirement Prompt) workflow: Draft → Generate → Execute
- Quick start guide with step-by-step instructions
- Links to documentation in the `.ai/` directory

## Why

- **Developer Onboarding:** New users forking the template need clear guidance on how to leverage the PRP workflow
- **Framework Demonstration:** Showcases Angular 21 patterns (signals, @if/@for, inject(), Tailwind CSS) as a reference implementation
- **Workflow Adoption:** Reduces friction in understanding the Draft → Generate → Execute pipeline for feature development
- **UX Excellence:** Professional, modern design establishes credibility and developer confidence

## What

Create a **static, page-level component** with:

- Hero section explaining the repository's value proposition
- PRP workflow visualization (Draft, Generate, Execute phases)
- Interactive collapsible sections for the quick start guide
- Code snippets showing PRP commands
- Footer with links to `.ai/context/` documentation
- Responsive, desktop-first layout optimized for 1024px+ viewports

### Success Criteria

- [ ] Introduction page renders at root route (`/`)
- [ ] Content is visually clear with modern design using Tailwind CSS
- [ ] PRP workflow is explained with visual hierarchy
- [ ] Code snippets are properly formatted and styled
- [ ] All state uses signals (for collapsible sections)
- [ ] Templates use `@if`/`@for` (not `*ngIf`/`*ngFor`)
- [ ] Component uses `inject()` (if any services needed)
- [ ] OnPush change detection enabled
- [ ] Separate `.html` and `.css` files
- [ ] Tailwind classes used for styling (custom CSS only when needed)
- [ ] Component filename: `introduction.ts` (NO `.component.` in name)
- [ ] Build succeeds: `npm run build`
- [ ] Lint passes: `npm run lint` (all issues fixed, not disabled)
- [ ] Follows architecture in `.ai/context/core/architecture.md`
- [ ] **`.ai/memory/project-state.md` updated after completion**

---

## Context References

### Project State (Baseline Context)

**Read `.ai/memory/project-state.md` first:**

Current state shows:

- Fresh repository with scaffolding only
- No features implemented yet
- No active routes configured (default route is empty)
- Directory structure in place: `pages/`, `shared/ui/`, `models/`, `services/`, `core/`

This is the **first feature implementation** - it will establish patterns for:

- Page component structure
- Shared UI component creation
- Routing configuration
- Tailwind CSS usage

### Files to Reference

```yaml
- file: .ai/memory/project-state.md
  why: Current project state (fresh repository)

- file: .ai/context/core/architecture.md
  why: Directory structure and layer responsibilities (pages/, shared/ui/)

- file: .ai/context/core/coding-standards.md
  why: Angular 21 syntax requirements (signals, inject(), @if/@for, input()/output())

- file: .ai/context/core/tech-stack.md
  why: Tailwind CSS 4 usage (@theme in CSS, not tailwind.config.js)

- file: CLAUDE.md
  why: PRP workflow documentation to reference in page content

- file: src/app/app.ts
  why: Root component pattern (signals, inject(), standalone)

- file: src/app/app.routes.ts
  why: Routing configuration (currently empty, need to add default route)
```

### Current Structure

```
src/app/
├── core/                    # Empty (guards, interceptors)
├── models/                  # index.ts only
├── pages/                   # index.ts only (will add introduction/)
├── services/                # Empty
├── shared/
│   └── ui/                  # index.ts only (will add code-block/)
├── app.ts                   # Root component
├── app.routes.ts            # Empty routes array
└── app.config.ts            # App configuration
```

### Desired Structure After

```
src/app/
├── pages/
│   └── introduction/
│       ├── introduction.ts            # NEW (page component, NO .component.)
│       ├── introduction.html          # NEW
│       ├── introduction.css           # NEW (only if Tailwind insufficient)
│       └── index.ts                   # NEW (barrel export)
├── shared/
│   └── ui/
│       ├── code-block/
│       │   ├── code-block.ts          # NEW (presentational component)
│       │   ├── code-block.html        # NEW
│       │   ├── code-block.css         # NEW (if needed)
│       │   └── index.ts               # NEW
│       └── index.ts                   # UPDATE (export CodeBlockComponent)
└── app.routes.ts                      # UPDATE (add default route)
```

---

## Angular 21 Gotchas

```typescript
// GOTCHA: Use inject() not constructor DI
private readonly router = inject(Router);

// GOTCHA: Signals for state, NOT BehaviorSubject
isExpanded = signal<boolean>(false);
expandedSections = signal<Set<string>>(new Set());

// GOTCHA: input()/output() functions, NOT @Input/@Output
code = input.required<string>();
language = input<string>('bash');

// GOTCHA: Templates use @if/@for, NOT *ngIf/*ngFor
// @if (isExpanded()) { <div>...</div> }
// @for (step of workflowSteps; track step.id) { ... }

// GOTCHA: Components are standalone by default
@Component({ imports: [CommonModule, CodeBlockComponent] })

// GOTCHA: OnPush change detection (zoneless compatible)
changeDetection: ChangeDetectionStrategy.OnPush

// GOTCHA: Separate .html and .css files (no inline)
templateUrl: './introduction.html'
styleUrl: './introduction.css'

// GOTCHA: Use Tailwind classes first, custom CSS only when needed
// <div class="container mx-auto px-4 py-8">

// GOTCHA: Component filenames without .component.
// ✅ introduction.ts
// ❌ introduction.component.ts

// GOTCHA: Fix lint errors, NEVER disable ESLint rules

// GOTCHA: Barrel exports required
// pages/introduction/index.ts: export * from './introduction';
```

---

## Implementation Blueprint

### Files to Create/Modify

```typescript
// CREATE: pages/introduction/introduction.ts (NO .component.)
// - Standalone page component with OnPush
// - Use signals for collapsible section state
// - No service dependencies (static content)
// - Interface with shared UI components

// CREATE: pages/introduction/introduction.html
// - Use @if/@for/@switch syntax
// - Bind to signals with ()
// - Use Tailwind classes for layout, typography, spacing
// - Semantic HTML5 (section, article, header, footer)

// CREATE: pages/introduction/introduction.css (optional)
// - Only create if Tailwind is insufficient
// - Use @theme for custom colors if needed

// CREATE: pages/introduction/index.ts
// - Barrel export: export * from './introduction';

// CREATE: shared/ui/code-block/code-block.ts
// - Dumb presentational component
// - input() for code and language
// - Displays formatted code snippets

// CREATE: shared/ui/code-block/code-block.html
// - <pre> and <code> elements styled with Tailwind
// - Dark background, monospace font

// CREATE: shared/ui/code-block/code-block.css (optional)
// - Only if needed for syntax highlighting or custom styles

// CREATE: shared/ui/code-block/index.ts
// - Barrel export: export * from './code-block';

// UPDATE: shared/ui/index.ts
// - Add: export * from './code-block';

// UPDATE: pages/index.ts
// - Add: export * from './introduction';

// UPDATE: app.routes.ts
// - Add default route with lazy-loaded introduction component
```

### Ordered Task List

```yaml
Task 1:
  action: CREATE shared/ui/code-block/code-block.ts
  details:
    - Dumb component with input() for code and language
    - OnPush change detection
    - No service dependencies
    - Import CommonModule

Task 2:
  action: CREATE shared/ui/code-block/code-block.html
  details:
    - Use <pre> and <code> elements
    - Tailwind classes: bg-gray-900, text-gray-100, rounded-lg, p-4
    - Monospace font: font-mono
    - Overflow handling: overflow-x-auto

Task 3:
  action: CREATE shared/ui/code-block/code-block.css
  details:
    - ONLY create if Tailwind is insufficient
    - Otherwise, skip this file entirely

Task 4:
  action: CREATE shared/ui/code-block/index.ts
  details:
    - Barrel export: export * from './code-block';

Task 5:
  action: UPDATE shared/ui/index.ts
  details:
    - Add: export * from './code-block';

Task 6:
  action: CREATE pages/introduction/introduction.ts
  details:
    - Standalone page component (filename: introduction.ts, NO .component.)
    - OnPush change detection
    - Import CodeBlockComponent from shared/ui
    - Define signals for collapsible sections state
    - Define workflow steps data structure

Task 7:
  action: CREATE pages/introduction/introduction.html
  details:
    - Hero section with title, tagline, description
    - Section for "What is this repository"
    - Section for PRP workflow with visual cards/steps
    - Section for Quick Start Guide with numbered steps
    - Use app-code-block component for command examples
    - Footer with links to .ai/context/ documentation
    - Use Tailwind classes for all styling

Task 8:
  action: CREATE pages/introduction/introduction.css
  details:
    - ONLY create if Tailwind is insufficient
    - Use @theme for custom theme values if needed
    - Otherwise, skip this file entirely

Task 9:
  action: CREATE pages/introduction/index.ts
  details:
    - Barrel export: export * from './introduction';

Task 10:
  action: UPDATE pages/index.ts
  details:
    - Add: export * from './introduction';

Task 11:
  action: UPDATE app.routes.ts
  details:
    - Add default route with lazy-loaded IntroductionComponent
    - path: ''
    - loadComponent: () => import('./pages/introduction').then(m => m.IntroductionComponent)
```

### Implementation Pseudocode

```typescript
// ===== shared/ui/code-block/code-block.ts =====
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-code-block',
  imports: [CommonModule],
  templateUrl: './code-block.html',
  styleUrl: './code-block.css', // Optional, only if Tailwind insufficient
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  code = input.required<string>();
  language = input<string>('bash');
}
```

```html
<!-- ===== shared/ui/code-block/code-block.html ===== -->
<div class="relative">
  <pre
    class="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto"
  ><code class="font-mono text-sm">{{ code() }}</code></pre>
  @if (language() !== 'bash') {
  <span class="absolute top-2 right-2 text-xs text-gray-400 uppercase">{{ language() }}</span>
  }
</div>
```

```typescript
// ===== pages/introduction/introduction.ts =====
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../../shared/ui';

interface WorkflowStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  command: string;
  icon: string; // Emoji or icon identifier
}

@Component({
  selector: 'app-introduction',
  imports: [CommonModule, CodeBlockComponent],
  templateUrl: './introduction.html',
  styleUrl: './introduction.css', // Optional
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionComponent {
  // State for collapsible sections (if needed)
  expandedSections = signal<Set<string>>(new Set(['workflow']));

  // PRP Workflow Steps
  protected readonly workflowSteps: WorkflowStep[] = [
    {
      id: 'draft',
      phase: 'Step 1',
      title: 'Draft',
      description:
        'Create initial feature draft with structured requirements and context references.',
      command: '/prp.draft user dashboard with profile info',
      icon: '📝',
    },
    {
      id: 'generate',
      phase: 'Step 2',
      title: 'Generate',
      description:
        'AI researches codebase, analyzes patterns, and generates complete implementation PRP.',
      command: '/prp.generate user-dashboard',
      icon: '🔍',
    },
    {
      id: 'execute',
      phase: 'Step 3',
      title: 'Execute',
      description:
        'AI implements feature following PRP, validates build/lint, and updates project state.',
      command: '/prp.execute user-dashboard',
      icon: '⚡',
    },
  ];

  // Quick Start Steps
  protected readonly quickStartSteps = [
    {
      step: 1,
      title: 'Fork and Clone',
      description: 'Fork this repository and clone it to your local machine.',
    },
    {
      step: 2,
      title: 'Install Dependencies',
      description: 'Run npm install to set up your development environment.',
      command: 'npm install',
    },
    {
      step: 3,
      title: 'Start Dev Server',
      description: 'Launch the development server to verify setup.',
      command: 'npm start',
    },
    {
      step: 4,
      title: 'Draft Your First Feature',
      description: 'Use the PRP workflow to create your first feature.',
      command: '/prp.draft your feature description here',
    },
  ];

  toggleSection(sectionId: string): void {
    const sections = new Set(this.expandedSections());
    if (sections.has(sectionId)) {
      sections.delete(sectionId);
    } else {
      sections.add(sectionId);
    }
    this.expandedSections.set(sections);
  }

  isSectionExpanded(sectionId: string): boolean {
    return this.expandedSections().has(sectionId);
  }
}
```

```html
<!-- ===== pages/introduction/introduction.html ===== -->
<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white">
  <!-- Hero Section -->
  <section class="container mx-auto px-4 py-16 text-center">
    <h1 class="text-5xl font-bold text-gray-900 mb-4">Angular Context Engineering</h1>
    <p class="text-xl text-gray-600 mb-6">
      An Angular 21 starter template optimized for Claude Code AI agents
    </p>
    <p class="text-lg text-gray-700 max-w-3xl mx-auto">
      Build features faster with the PRP (Product Requirement Prompt) workflow. This template
      provides Claude Code with the context needed to produce consistent, architecture-compliant
      code.
    </p>
  </section>

  <!-- What is this repository -->
  <section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-4">What is this repository?</h2>
      <p class="text-gray-700 mb-4">
        This is not a standard Angular starter. It's a structured environment that gives Claude Code
        AI the context needed to produce consistent, architecture-compliant code.
      </p>
      <p class="text-gray-700 mb-4">
        The key innovation is the <strong>PRP (Product Requirement Prompt)</strong> workflow, which
        separates planning from implementation to reduce hallucinations and enforce coding
        standards.
      </p>
      <ul class="list-disc list-inside text-gray-700 space-y-2">
        <li>Angular 21 with Signals, Standalone Components, and Modern Control Flow</li>
        <li>Zoneless architecture with OnPush change detection</li>
        <li>Tailwind CSS 4 for styling</li>
        <li>Structured .ai/ directory with architecture documentation</li>
        <li>Architect Agent for automated code review</li>
      </ul>
    </div>
  </section>

  <!-- PRP Workflow -->
  <section class="container mx-auto px-4 py-12">
    <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">The PRP Workflow</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
      @for (step of workflowSteps; track step.id) {
      <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
        <div class="text-4xl mb-3">{{ step.icon }}</div>
        <div class="text-sm text-gray-500 font-semibold mb-1">{{ step.phase }}</div>
        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ step.title }}</h3>
        <p class="text-gray-700 mb-4">{{ step.description }}</p>
        <app-code-block [code]="step.command" language="bash" />
      </div>
      }
    </div>
  </section>

  <!-- Quick Start Guide -->
  <section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">Quick Start Guide</h2>
      <div class="space-y-6">
        @for (item of quickStartSteps; track item.step) {
        <div class="flex gap-4">
          <div
            class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold"
          >
            {{ item.step }}
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ item.title }}</h3>
            <p class="text-gray-700 mb-2">{{ item.description }}</p>
            @if (item.command) {
            <app-code-block [code]="item.command" language="bash" />
            }
          </div>
        </div>
        }
      </div>
    </div>
  </section>

  <!-- Documentation Links -->
  <footer class="container mx-auto px-4 py-12 border-t border-gray-200">
    <div class="max-w-4xl mx-auto">
      <h3 class="text-2xl font-bold text-gray-900 mb-4">Documentation</h3>
      <p class="text-gray-700 mb-4">
        Explore the `.ai/` directory for comprehensive documentation:
      </p>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <li>
          <a href="#" class="text-blue-600 hover:underline">
            📐 Architecture Guide (.ai/context/core/architecture.md)
          </a>
        </li>
        <li>
          <a href="#" class="text-blue-600 hover:underline">
            ✨ Coding Standards (.ai/context/core/coding-standards.md)
          </a>
        </li>
        <li>
          <a href="#" class="text-blue-600 hover:underline">
            🔧 Tech Stack (.ai/context/core/tech-stack.md)
          </a>
        </li>
        <li>
          <a href="#" class="text-blue-600 hover:underline"> 📖 Full Workflow (CLAUDE.md) </a>
        </li>
      </ul>
    </div>
  </footer>
</div>
```

```typescript
// ===== app.routes.ts UPDATE =====
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/introduction').then((m) => m.IntroductionComponent),
  },
];
```

---

## Integration Points

```yaml
ROUTING:
  - Lazy-loaded via loadComponent in app.routes.ts
  - Default route (path: '')
  - No guards needed (public page)

STATE:
  - Local component signals for collapsible sections (optional)
  - No global state management
  - No external API calls

STYLING:
  - Tailwind 4 classes in templates (primary approach)
  - Gradient background: bg-gradient-to-b from-blue-50 to-white
  - Cards: bg-white rounded-lg shadow-md
  - Typography: text-5xl, text-3xl, text-xl, text-gray-700
  - Spacing: container mx-auto px-4 py-12
  - Grid layout: grid grid-cols-1 md:grid-cols-3 gap-6
  - Custom .css file ONLY if Tailwind is insufficient

COMPONENTS:
  - CodeBlockComponent: Shared UI component for displaying commands
  - IntroductionComponent: Page component with static content
```

---

## Content Guidelines

### Hero Section

- **Title:** "Angular Context Engineering"
- **Tagline:** "An Angular 21 starter template optimized for Claude Code AI agents"
- **Description:** Brief explanation of PRP workflow value proposition

### What is this repository

- Explain it's not a standard Angular starter
- Highlight the .ai/ directory context system
- List key technologies (Angular 21, Signals, Tailwind CSS 4, etc.)

### PRP Workflow Section

- Three cards: Draft, Generate, Execute
- Each card shows: Phase number, title, description, command example
- Visual hierarchy with icons/emojis

### Quick Start Guide

- Numbered steps (1-4)
- Step 1: Fork and Clone
- Step 2: Install Dependencies (npm install)
- Step 3: Start Dev Server (npm start)
- Step 4: Draft Your First Feature (/prp.draft)

### Footer

- Links to .ai/context/core/ documentation files
- Link to CLAUDE.md

---

## Validation Loop

### Level 1: Dev Server

```bash
npm run start
# Navigate to http://localhost:4200
# Verify:
# - Page renders with hero section
# - PRP workflow cards display correctly
# - Code blocks are formatted properly
# - Quick start guide is readable
# - All text is clear and well-spaced
```

### Level 2: Build & Lint

```bash
npm run build        # Production build must succeed
npm run lint         # No ESLint errors (fix issues, NEVER disable rules)
```

**CRITICAL:** When linting fails, fix the underlying issue. Disabling ESLint rules is NOT acceptable.

### Level 3: Visual Check

- Verify responsive layout (desktop-first, 1024px+ optimized)
- Check typography hierarchy (headings, body text)
- Validate color scheme (professional, readable)
- Test collapsible sections (if implemented)
- Ensure semantic HTML (section, article, header, footer)

---

## Final Validation Checklist

- [ ] State managed with signals (for collapsible sections)
- [ ] DI uses inject() (if any services)
- [ ] Components use input()/output() functions (CodeBlockComponent)
- [ ] Templates use @if/@for
- [ ] OnPush change detection set
- [ ] Separate .html files (no inline templates)
- [ ] Separate .css files (only if Tailwind insufficient)
- [ ] Tailwind classes used for styling (bg-gradient, rounded-lg, shadow-md, etc.)
- [ ] Barrel exports in index.ts files
- [ ] File naming: introduction.ts, code-block.ts (NO .component.)
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint` (all issues fixed, NEVER disabled)
- [ ] Follows `.ai/context/core/architecture.md`
- [ ] Follows `.ai/context/core/coding-standards.md`
- [ ] **`.ai/memory/project-state.md` updated with this feature**

---

## Anti-Patterns to Avoid

- ❌ `@Input()/@Output()` decorators → Use `input()/output()` functions
- ❌ `*ngIf/*ngFor` → Use `@if/@for`
- ❌ Constructor DI → Use `inject()`
- ❌ BehaviorSubject for state → Use `signal()`
- ❌ Inline templates/styles → Separate .html and .css files
- ❌ Custom CSS before Tailwind → Use Tailwind classes first
- ❌ `.component.` in filenames → Use simple names (introduction.ts, code-block.ts)
- ❌ Disabling ESLint rules → Fix the underlying issue
- ❌ Missing barrel exports → Always add index.ts
- ❌ Non-semantic HTML → Use section, article, header, footer

---

## Edge Cases & Accessibility

### Edge Cases

- Page should render correctly with or without JavaScript (SSR support)
- External links (documentation links) should open in new tabs (`target="_blank" rel="noopener noreferrer"`)
- Long code snippets should scroll horizontally (overflow-x-auto)

### Accessibility

- Semantic HTML5 elements (section, article, header, footer)
- Proper heading hierarchy (h1, h2, h3)
- Alt text for any images (if added later)
- ARIA labels for interactive elements (if collapsible sections implemented)
- Sufficient color contrast (Tailwind default colors provide good contrast)

---

## Post-Implementation: Project State Update

After successful implementation, **MUST** update `.ai/memory/project-state.md` with:

```markdown
### Feature: Template Introduction Page

- **PRP:** `.ai/planning/prp/template-introduction-page.md`
- **Status:** Complete
- **Components:**
  - `IntroductionComponent` (pages/introduction/)
  - `CodeBlockComponent` (shared/ui/code-block/)
- **Services:** None
- **Models:** None (using inline interfaces for workflow steps)
- **Routes:**
  - `/` → IntroductionComponent (default route)
- **Notes:**
  - First feature implementation establishing patterns
  - Demonstrates Angular 21 syntax (signals, @if/@for, inject())
  - Uses Tailwind CSS 4 for styling
  - Static content, no external API calls
  - SSR-compatible
```

---

## Confidence Rating: 9/10

**Rationale:**

- ✅ All context provided (project state, architecture, coding standards, tech stack)
- ✅ Clear implementation steps with pseudocode
- ✅ Executable validation commands
- ✅ Real Angular 21 patterns referenced
- ✅ Tailwind CSS 4 usage specified
- ✅ Component structure follows architecture.md
- ✅ No external dependencies or unclear requirements
- ⚠️ Minor uncertainty: Content wording might need user preference (but solid structure provided)

**Why not 10/10:**

- Content text (taglines, descriptions) could vary based on user preference
- Could ask user if they want more advanced features (syntax highlighting, animations)

**Expected Outcome:**
AI agent should successfully implement this feature in one pass with minimal clarification needed. The PRP provides sufficient context, code examples, and validation steps for autonomous execution.
