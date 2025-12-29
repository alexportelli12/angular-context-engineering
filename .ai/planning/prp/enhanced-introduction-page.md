# Feature PRP — Enhanced Introduction Page

## Purpose

Transform existing introduction page into comprehensive documentation hub with navigation sidebar, complete slash command reference, agent documentation, and full PRP workflow example. Desktop-optimized layout with minimal vertical scrolling.

---

## Goal

Enhance IntroductionComponent (pages/introduction/) with left sidebar navigation and 6 comprehensive sections: Hero, What is ACE, Slash Commands (6 commands), Agents (2 agents), Full PRP Workflow (complete example), Quick Start Guide.

## Why

- **User Value:** Single-page reference for all ACE features, commands, agents, and workflows
- **Technical Benefit:** Reduces context switching, accelerates onboarding, demonstrates PRP workflow end-to-end
- **Performance/UX:** Desktop-optimized layout with sticky navigation and anchor-based scrolling minimizes vertical scrolling and improves discoverability

## What

**Update existing IntroductionComponent:**
- Add 4 new interfaces: SlashCommand, Agent, NavSection, WorkflowExample
- Add navigation sidebar (sticky, 200-250px fixed width)
- Add Slash Commands section (all 6 commands in 2-column grid)
- Add Agents section (both agents with responsibilities)
- Expand PRP Workflow section (full user-dashboard example: draft → generate → execute)
- Update layout to grid (nav + content)
- Add section anchor IDs and smooth scroll behavior

**No new files needed.** All modifications to pages/introduction/.

### Success Criteria

- [ ] Feature behaves as described with correct UI rendering
- [ ] All state uses signals (not BehaviorSubject)
- [ ] Templates use `@if`/`@for`/`@switch` (not `*ngIf`/`*ngFor`)
- [ ] Components use `inject()`, `input()`, `output()` (not decorators)
- [ ] OnPush change detection compatible (zoneless)
- [ ] Tailwind classes used for styling (custom CSS only when needed)
- [ ] Component filenames without `.component.` (already correct: introduction.ts)
- [ ] Build succeeds: `npm run build`
- [ ] Lint passes: `npm run lint` (all issues fixed, not disabled)
- [ ] Follows architecture in `.ai/context/core/`
- [ ] **Content accuracy:** Command/agent descriptions match CLAUDE.md and .claude/agents/*.md exactly
- [ ] **Desktop-optimized:** Left nav sticky, content max-width 1200px, sections use 2-column grids
- [ ] **Navigation functional:** Clicking nav links scrolls to section with smooth behavior

---

## Context References

### Project State (Baseline Context)

**Read `.ai/memory/project-state.md` first** to understand:

- IntroductionComponent exists at pages/introduction/ (landing page)
- CodeBlockComponent exists at shared/ui/code-block/ (reusable for command syntax)
- Route: `/` → IntroductionComponent
- No services needed (static content)
- Reference implementation for Angular 21 patterns

### Files to Reference

```yaml
- file: .ai/memory/project-state.md
  why: Current project state - IntroductionComponent already exists

- file: src/app/pages/introduction/introduction.ts
  why: Existing component with WorkflowStep/QuickStartStep interfaces, workflowSteps/quickStartSteps arrays

- file: src/app/pages/introduction/introduction.html
  why: Current template structure (Hero, What is ACE, PRP Workflow, Quick Start sections)

- file: src/app/pages/introduction/introduction.css
  why: Currently empty - all Tailwind classes in template

- file: src/app/shared/ui/code-block/code-block.ts
  why: Reusable component for displaying command syntax (input: code, language)

- file: CLAUDE.md
  why: Source for command descriptions (/project.init, /project.align, /prp.draft, /prp.generate, /prp.execute, /quick.task)

- file: .claude/agents/architect.md
  why: Source for architect agent description, responsibilities, trigger point

- file: .claude/agents/documentation.md
  why: Source for documentation agent description, responsibilities, trigger point
```

### Current Structure (pages/introduction/)

```
src/app/pages/introduction/
├── introduction.ts          # Component with WorkflowStep[], QuickStartStep[] arrays, expandedSections signal
├── introduction.html        # 4 sections: Hero, What is ACE, PRP Workflow (3 steps), Quick Start (6 steps)
├── introduction.css         # Empty (all Tailwind)
└── index.ts                 # Barrel export
```

### Desired Structure After

```
src/app/pages/introduction/
├── introduction.ts          # ADD: SlashCommand[], Agent[], NavSection[], WorkflowExample[] interfaces + data
├── introduction.html        # MODIFY: Add left nav, 6 sections with IDs, 2-column grids
├── introduction.css         # ADD: Grid layout (nav + content), sticky nav positioning (if Tailwind insufficient)
└── index.ts                 # No change
```

---

## Angular 21 Gotchas

```typescript
// GOTCHA: Use inject() not constructor DI
private readonly route = inject(ActivatedRoute);

// GOTCHA: Signals for state, NOT BehaviorSubject
activeSection = signal<string>('hero');

// GOTCHA: input()/output() functions, NOT @Input/@Output
// (None needed for this page - no inputs/outputs)

// GOTCHA: Templates use @if/@for, NOT *ngIf/*ngFor
// @for (command of slashCommands(); track command.command) { ... }

// GOTCHA: Components are standalone by default (no need for standalone: true)
@Component({ imports: [...] })

// GOTCHA: OnPush change detection (zoneless compatible)
changeDetection: ChangeDetectionStrategy.OnPush

// GOTCHA: Separate .html and .css files (no inline templates/styles)
templateUrl: './introduction.html'
styleUrl: './introduction.css'

// GOTCHA: Use Tailwind classes first, custom CSS only when needed
// Grid layout: class="grid grid-cols-[250px_1fr]"
// Sticky nav: class="sticky top-0"

// GOTCHA: Component filenames without .component. (already correct: introduction.ts)

// GOTCHA: Fix lint errors, NEVER disable ESLint rules

// GOTCHA: Barrel exports required (already exists: index.ts)
```

---

## Implementation Blueprint

### Files to Create/Modify

```typescript
// MODIFY: pages/introduction/introduction.ts
// - ADD interfaces: SlashCommand, Agent, NavSection, WorkflowExample
// - ADD signal arrays: slashCommands, agents, navSections, workflowExamples
// - KEEP existing: WorkflowStep[], QuickStartStep[], expandedSections signal
// - OPTIONAL: Add activeSection signal if tracking scroll position
// - OPTIONAL: Add inject(ViewportScroller) if programmatic smooth scroll needed

// MODIFY: pages/introduction/introduction.html
// - ADD: Left nav structure (<nav> with links to sections)
// - ADD: Main content wrapper with section IDs
// - ADD: Slash Commands section (2-column grid, @for commands)
// - ADD: Agents section (2-column grid or cards, @for agents)
// - MODIFY: Expand PRP Workflow section with workflowExamples
// - ADD: section IDs (#hero, #what-is-ace, #commands, #agents, #workflow, #quick-start)

// MODIFY: pages/introduction/introduction.css (if needed)
// - ADD: Grid layout (nav + content) if Tailwind insufficient
// - ADD: Sticky nav positioning if Tailwind insufficient
// - OTHERWISE: Keep empty, use Tailwind classes

// NO CHANGES: pages/introduction/index.ts (already exports IntroductionComponent)
```

### Ordered Task List

```yaml
Task 1:
  action: MODIFY pages/introduction/introduction.ts
  details:
    - Add interfaces after existing interfaces (WorkflowStep, QuickStartStep):
      * SlashCommand { command, description, usage, category }
      * Agent { name, file, purpose, responsibilities[], triggerPoint }
      * NavSection { id, label, icon }
      * WorkflowExample { phase, input, output, description }
    - Add signal arrays with data:
      * slashCommands = signal<SlashCommand[]>([6 commands])
      * agents = signal<Agent[]>([2 agents])
      * navSections = signal<NavSection[]>([6 nav items])
      * workflowExamples = signal<WorkflowExample[]>([3 phases])
    - Keep existing: workflowSteps, quickStartSteps, expandedSections
    - Optional: activeSection = signal<string>('hero') if tracking scroll

Task 2:
  action: MODIFY pages/introduction/introduction.html
  details:
    - Wrap entire content in grid container (nav + main)
    - Add left nav:
      * <nav> with sticky positioning
      * @for navSections, render anchor links (#section-id)
    - Add section IDs to all major sections:
      * #hero, #what-is-ace, #commands, #agents, #workflow, #quick-start
    - Add Slash Commands section:
      * 2-column grid
      * @for slashCommands, render cards with command/description/usage
      * Group by category (setup, prp, task) or flat list
    - Add Agents section:
      * 2-column grid or cards
      * @for agents, render name/purpose/responsibilities/triggerPoint
    - Expand PRP Workflow section:
      * @for workflowExamples, render phase/input/output/description
      * Use CodeBlockComponent for input/output snippets

Task 3:
  action: MODIFY pages/introduction/introduction.css (only if needed)
  details:
    - Only create CSS if Tailwind grid/sticky insufficient
    - Otherwise keep empty, use Tailwind classes in template
    - If needed: grid layout (nav 250px + content 1fr)
    - If needed: sticky nav positioning (top-0)

Task 4:
  action: ADD smooth scroll behavior
  details:
    - Option A: CSS scroll-behavior: smooth
    - Option B: Programmatic scrollIntoView with smooth behavior
    - Ensure nav links trigger scroll to section

Task 5:
  action: VALIDATE build and lint
  details:
    - npm run build (must succeed)
    - npm run lint (must pass, fix all issues)
```

### Implementation Pseudocode

```typescript
// pages/introduction/introduction.ts

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../../shared/ui';

// EXISTING INTERFACES
interface WorkflowStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  command: string;
  icon: string;
}

interface QuickStartStep {
  step: number;
  title: string;
  description: string;
  command?: string;
}

// NEW INTERFACES
interface SlashCommand {
  command: string;
  description: string;
  usage: string;
  category: 'setup' | 'prp' | 'task';
}

interface Agent {
  name: string;
  file: string;
  purpose: string;
  responsibilities: string[];
  triggerPoint: string;
}

interface NavSection {
  id: string;
  label: string;
  icon: string;
}

interface WorkflowExample {
  phase: string;
  input: string;
  output: string;
  description: string;
}

@Component({
  selector: 'app-introduction',
  imports: [CommonModule, CodeBlockComponent],
  templateUrl: './introduction.html',
  styleUrl: './introduction.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionComponent {
  // EXISTING STATE
  expandedSections = signal<Set<string>>(new Set(['workflow']));

  protected readonly workflowSteps: WorkflowStep[] = [
    // Keep existing 3 steps (draft, generate, execute)
  ];

  protected readonly quickStartSteps: QuickStartStep[] = [
    // Keep existing 6 steps
  ];

  // NEW STATE
  protected readonly navSections = signal<NavSection[]>([
    { id: 'hero', label: 'Hero', icon: '🚀' },
    { id: 'what-is-ace', label: 'What is ACE', icon: '📘' },
    { id: 'commands', label: 'Slash Commands', icon: '⌨️' },
    { id: 'agents', label: 'Agents', icon: '🤖' },
    { id: 'workflow', label: 'PRP Workflow', icon: '🔄' },
    { id: 'quick-start', label: 'Quick Start', icon: '⚡' },
  ]);

  protected readonly slashCommands = signal<SlashCommand[]>([
    {
      command: '/project.init',
      description: 'Initialize new project from template. Removes placeholder content, configures project name, optionally sets up Firebase/NgRx/Storybook.',
      usage: '/project.init',
      category: 'setup',
    },
    {
      command: '/project.align',
      description: 'Align existing Angular codebase. Analyzes structure, discovers tech stack, generates/updates .ai/context/ files to match reality.',
      usage: '/project.align',
      category: 'setup',
    },
    {
      command: '/prp.draft',
      description: 'Create initial feature draft. Generates structured markdown with requirements, project state scan, documentation references.',
      usage: '/prp.draft [feature description]',
      category: 'prp',
    },
    {
      command: '/prp.generate',
      description: 'Generate complete PRP. Loads project state, analyzes patterns, asks clarifying questions, outputs implementation plan.',
      usage: '/prp.generate [feature-name]',
      category: 'prp',
    },
    {
      command: '/prp.execute',
      description: 'Implement feature from PRP. Breaks into subtasks, implements with Angular 21 conventions, validates build/lint, architect review, updates project state.',
      usage: '/prp.execute [feature-name]',
      category: 'prp',
    },
    {
      command: '/quick.task',
      description: 'Small feature without full PRP. For trivial changes, bug fixes, or quick additions that don\'t justify planning phase.',
      usage: '/quick.task [task description]',
      category: 'task',
    },
  ]);

  protected readonly agents = signal<Agent[]>([
    {
      name: 'Architect',
      file: '.claude/agents/architect.md',
      purpose: 'Enforces Angular 21 architecture standards, reviews implementations post-execution.',
      responsibilities: [
        'Module boundary enforcement (no cross-feature imports)',
        'State strategy validation (signals, not BehaviorSubject)',
        'Zoneless architecture compliance (OnPush change detection)',
        'Smart/Dumb component separation',
        'Template syntax validation (@if/@for, not *ngIf/*ngFor)',
        'Code quality checks (method length, barrel exports, naming)',
      ],
      triggerPoint: 'Step 8 of /prp.execute (post-implementation validation)',
    },
    {
      name: 'Documentation',
      file: '.claude/agents/documentation.md',
      purpose: 'Writes dense, token-efficient markdown documentation for AI agent consumption.',
      responsibilities: [
        'Token economy: every token provides value, zero filler',
        'Consistency: uniform terminology, structure, tone',
        'Clarity: concise, precise language over elaboration',
        'Structure: front-load critical information, hierarchical organization',
        'Active voice, imperative mood, technical shorthand',
        'Code examples only when demonstrating non-obvious patterns',
      ],
      triggerPoint: 'ALL markdown file operations (creating/updating .ai/ files, README, documentation)',
    },
  ]);

  protected readonly workflowExamples = signal<WorkflowExample[]>([
    {
      phase: 'Draft',
      input: '/prp.draft user dashboard with profile info and activity feed',
      output: `# PRP Draft: User Dashboard

## FEATURE:
Create user dashboard page displaying profile information and activity feed.

**Key Components:**
- DashboardComponent (pages/dashboard/)
- ProfileCardComponent (shared/ui/)
- ActivityFeedComponent (shared/ui/)

**Behavior:**
1. Fetch user data on component init
2. Display profile (avatar, name, email, role)
3. Display activity feed (recent actions, timestamps)
4. Responsive layout (grid on desktop, stack on mobile)

**Data Structures:**
interface User { id, name, email, avatar, role }
interface Activity { id, action, timestamp, metadata }`,
      description: 'AI creates structured draft at .ai/planning/drafts/user-dashboard.md with requirements, components, behavior, data structures.',
    },
    {
      phase: 'Generate',
      input: '/prp.generate user-dashboard',
      output: `Analyzing project state...
Loading .ai/planning/drafts/user-dashboard.md...
Searching codebase for similar patterns...

Questions for clarification:
1. Should dashboard be protected route (require authentication)?
2. Activity feed: real-time updates or paginated static list?
3. Profile editing: inline or separate modal?

Generating PRP at .ai/planning/prp/user-dashboard.md...
✓ PRP generated (1,847 tokens)

Structure:
- Goal: User dashboard with profile and activity feed
- Files to create: DashboardComponent, User model, UserService
- Implementation order: models → service → components → routing
- Validation: build, lint, architect review`,
      description: 'AI loads project state, analyzes codebase, asks clarifying questions, generates complete implementation plan.',
    },
    {
      phase: 'Execute',
      input: '/prp.execute user-dashboard',
      output: `Loading PRP: .ai/planning/prp/user-dashboard.md...
Loading project state: .ai/memory/project-state.md...

Task 1/7: Create User model (models/user.model.ts)
✓ Created interface User with id, name, email, avatar, role

Task 2/7: Create UserService (services/user.service.ts)
✓ Created with getUserProfile() method, signal-based state

Task 3/7: Create DashboardComponent (pages/dashboard/)
✓ Created with signals, inject(), OnPush change detection

Task 4/7: Update routing (app.routes.ts)
✓ Added /dashboard route with lazy loading

Task 5/7: Validate build
✓ npm run build: SUCCESS

Task 6/7: Validate lint
✓ npm run lint: PASSED

Task 7/7: Architect review
✓ ARCHITECTURE REVIEW PASSED
  - Module boundaries respected
  - Signals for state (no BehaviorSubject)
  - Zoneless-compliant (OnPush)
  - Smart/Dumb separation maintained

Updating project state (.ai/memory/project-state.md)...
✓ Feature added to project state

Implementation complete. Dashboard accessible at /dashboard.`,
      description: 'AI implements feature, validates build/lint, passes architect review, updates project state.',
    },
  ]);

  // EXISTING METHODS
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

  // OPTIONAL: Smooth scroll method
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
```

```html
<!-- pages/introduction/introduction.html -->

<!-- MODIFY: Wrap in grid container (nav + main) -->
<div class="min-h-screen bg-gradient-to-b from-blue-50 to-white grid grid-cols-[250px_1fr]">
  <!-- ADD: Left Navigation (sticky) -->
  <nav class="sticky top-0 h-screen bg-gray-100 border-r border-gray-200 overflow-y-auto">
    <div class="p-6">
      <h2 class="text-lg font-bold text-gray-900 mb-4">Navigation</h2>
      <ul class="space-y-2">
        @for (section of navSections(); track section.id) {
          <li>
            <a
              [href]="'#' + section.id"
              class="flex items-center gap-2 text-gray-700 hover:text-blue-600 hover:bg-gray-200 px-3 py-2 rounded transition"
            >
              <span>{{ section.icon }}</span>
              <span>{{ section.label }}</span>
            </a>
          </li>
        }
      </ul>
    </div>
  </nav>

  <!-- Main Content Area -->
  <main class="overflow-y-auto">
    <!-- Hero Section -->
    <section id="hero" class="container mx-auto px-4 py-16 text-center max-w-4xl">
      <h1 class="text-5xl font-bold text-gray-900 mb-4">ACE</h1>
      <p class="text-xl text-gray-600 mb-2">Angular Context Engineering</p>
      <p class="text-lg text-gray-500 mb-6">
        An Angular 21 starter template optimized for Claude Code AI agents
      </p>
      <p class="text-lg text-gray-700 max-w-3xl mx-auto">
        Build features faster with the PRP (Product Requirement Prompt) workflow. This template
        provides Claude Code with the context needed to produce consistent, architecture-compliant
        code.
      </p>
    </section>

    <!-- What is ACE Section -->
    <section id="what-is-ace" class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">What is ACE?</h2>
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

    <!-- Slash Commands Section -->
    <section id="commands" class="container mx-auto px-4 py-12 max-w-6xl">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">Slash Commands</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (command of slashCommands(); track command.command) {
          <div class="bg-white rounded-lg shadow-md p-6 border-l-4"
               [ngClass]="{
                 'border-green-500': command.category === 'setup',
                 'border-blue-500': command.category === 'prp',
                 'border-purple-500': command.category === 'task'
               }">
            <div class="text-xs uppercase font-semibold text-gray-500 mb-2">
              {{ command.category }}
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">{{ command.command }}</h3>
            <p class="text-gray-700 mb-3">{{ command.description }}</p>
            <app-code-block language="bash" [code]="command.usage" />
          </div>
        }
      </div>
    </section>

    <!-- Agents Section -->
    <section id="agents" class="container mx-auto px-4 py-12 max-w-6xl">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">AI Agents</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (agent of agents(); track agent.name) {
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ agent.name }}</h3>
            <p class="text-sm text-gray-500 mb-3">{{ agent.file }}</p>
            <p class="text-gray-700 mb-4">{{ agent.purpose }}</p>
            <h4 class="font-semibold text-gray-900 mb-2">Responsibilities:</h4>
            <ul class="list-disc list-inside text-gray-700 text-sm space-y-1 mb-4">
              @for (responsibility of agent.responsibilities; track $index) {
                <li>{{ responsibility }}</li>
              }
            </ul>
            <div class="bg-blue-50 border-l-4 border-blue-500 p-3">
              <p class="text-sm text-gray-800">
                <strong>Trigger:</strong> {{ agent.triggerPoint }}
              </p>
            </div>
          </div>
        }
      </div>
    </section>

    <!-- Full PRP Workflow Section -->
    <section id="workflow" class="container mx-auto px-4 py-12 max-w-6xl">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">The PRP Workflow</h2>
      <p class="text-gray-700 mb-8 max-w-3xl">
        See the complete workflow in action with a realistic "user dashboard" feature example.
        Each phase shows the command, AI output, and what happens behind the scenes.
      </p>

      <!-- Workflow Steps (existing 3-card layout) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        @for (step of workflowSteps; track step.id) {
          <div class="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
            <div class="text-4xl mb-3">{{ step.icon }}</div>
            <div class="text-sm text-gray-500 font-semibold mb-1">{{ step.phase }}</div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ step.title }}</h3>
            <p class="text-gray-700 mb-4">{{ step.description }}</p>
            <app-code-block language="bash" [code]="step.command" />
          </div>
        }
      </div>

      <!-- Workflow Example (detailed 3 phases) -->
      <div class="space-y-6">
        @for (example of workflowExamples(); track example.phase) {
          <div class="bg-white rounded-lg shadow-md p-6">
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Phase {{ $index + 1 }}: {{ example.phase }}
            </h3>
            <p class="text-gray-700 mb-4">{{ example.description }}</p>

            <div class="mb-4">
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Command:</h4>
              <app-code-block language="bash" [code]="example.input" />
            </div>

            <div>
              <h4 class="text-sm font-semibold text-gray-700 mb-2">Output:</h4>
              <app-code-block language="markdown" [code]="example.output" />
            </div>
          </div>
        }
      </div>
    </section>

    <!-- Quick Start Section -->
    <section id="quick-start" class="container mx-auto px-4 py-12 max-w-4xl">
      <div class="bg-white rounded-lg shadow-md p-8">
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
                  <app-code-block language="bash" [code]="item.command" />
                }
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="container mx-auto px-4 py-12 border-t border-gray-200 max-w-4xl">
      <div>
        <h3 class="text-lg font-semibold text-gray-900 mb-3">Created By</h3>
        <p class="text-gray-700 mb-3">This project was created by <strong>Alex Portelli</strong></p>
        <div class="flex flex-wrap gap-4">
          <a
            href="https://alexportelli.com"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
          >
            🌐 Website
          </a>
          <a
            href="https://www.linkedin.com/in/portellialex/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
          >
            💼 LinkedIn
          </a>
          <a
            href="https://medium.com/@alexportelli12"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
          >
            ✍️ Medium
          </a>
          <a
            href="https://github.com/alexportelli12"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:underline"
          >
            💻 GitHub
          </a>
        </div>
      </div>
    </footer>
  </main>
</div>
```

```css
/* pages/introduction/introduction.css */

/* Only add custom CSS if Tailwind grid/sticky insufficient */
/* Otherwise keep empty and use Tailwind classes in template */

/* Example: If Tailwind grid syntax not working */
/* .introduction-container {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
} */

/* Example: If sticky positioning needs adjustment */
/* .introduction-nav {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
} */

/* Add smooth scroll behavior globally if needed */
html {
  scroll-behavior: smooth;
}
```

---

## Integration Points

```yaml
ROUTING:
  - No routing changes (existing route: / → IntroductionComponent)
  - Anchor navigation within page (#section-id)

STATE:
  - Component-level signals (slashCommands, agents, navSections, workflowExamples)
  - No global services needed (static content)

STYLING:
  - Tailwind 4 classes in template (primary approach)
  - Grid layout: grid grid-cols-[250px_1fr]
  - Sticky nav: sticky top-0 h-screen
  - Custom .css only if Tailwind grid/sticky insufficient

COMPONENTS:
  - Reuse CodeBlockComponent (shared/ui/code-block) for command syntax
  - No new components needed
```

---

## Validation Loop

### Level 1: Dev Server

```bash
npm run start
# Visual check at http://localhost:4200
# Test: Click all nav links, verify scroll to sections
# Test: Verify 6 commands displayed in 2-column grid
# Test: Verify 2 agents displayed with responsibilities
# Test: Verify workflow example shows 3 phases (draft, generate, execute)
```

### Level 2: Build & Lint

```bash
npm run build        # Production build must succeed
npm run lint         # No ESLint errors (fix issues, NEVER disable rules)
```

**CRITICAL:** When linting fails, fix the underlying issue. Disabling ESLint rules is NOT acceptable.

### Level 3: Content Accuracy Validation

```yaml
Manual Checks:
  - Command descriptions match CLAUDE.md exactly
  - Command usage syntax correct (/project.init, /prp.draft [feature], etc.)
  - Agent descriptions match .claude/agents/*.md exactly
  - Agent responsibilities accurate per agent files
  - Workflow example reflects actual PRP process from CLAUDE.md
  - File paths accurate (.ai/planning/drafts/, .ai/planning/prp/, .ai/memory/project-state.md)
```

---

## Final Validation Checklist

- [ ] State managed with signals (not BehaviorSubject)
- [ ] DI uses inject() (not constructor)
- [ ] Inputs/outputs use input()/output() functions (none needed for this page)
- [ ] Templates use @if/@for/@switch
- [ ] OnPush change detection set
- [ ] Separate .html file (no inline templates)
- [ ] Separate .css file (only if needed, Tailwind preferred)
- [ ] Tailwind classes used for styling (custom CSS only when needed)
- [ ] Barrel export in index.ts (already exists)
- [ ] File naming: NO .component. in filenames (already correct: introduction.ts)
- [ ] Build passes: `npm run build`
- [ ] Lint passes: `npm run lint` (all issues fixed, NEVER disabled)
- [ ] Follows `.ai/context/core/architecture.md`
- [ ] Follows `.ai/context/core/coding-standards.md`
- [ ] **Content accuracy: Commands/agents match source files exactly**
- [ ] **Navigation functional: Clicking nav links scrolls to sections**
- [ ] **Desktop-optimized: Sticky nav, max-width content, 2-column grids**
- [ ] **`.ai/memory/project-state.md` updated with this feature**

---

## Anti-Patterns to Avoid

- ❌ `@Input()/@Output()` decorators → Use `input()/output()` functions
- ❌ `*ngIf/*ngFor` → Use `@if/@for/@switch`
- ❌ Constructor DI → Use `inject()`
- ❌ BehaviorSubject for state → Use `signal()`
- ❌ NgModules → Use standalone components
- ❌ Zone.js patterns → OnPush + signals (zoneless)
- ❌ Inline templates/styles → Separate .html and .css files
- ❌ Custom CSS before Tailwind → Use Tailwind classes first
- ❌ `.component.` in filenames → Use simple names (introduction.ts)
- ❌ Disabling ESLint rules → Fix the underlying issue
- ❌ Mixing models/enums/constants → Separate files (not applicable here)
- ❌ Missing barrel exports → Always add index.ts (already exists)
- ❌ tailwind.config.js → Use @theme in CSS files (not needed here)
- ❌ Inaccurate content → Verify command/agent descriptions match source files

---

## Content Accuracy Requirements

**CRITICAL:** All command and agent descriptions MUST match source documentation exactly.

### Slash Commands Data Source

**Source:** CLAUDE.md sections "Essential Commands" and "PRP Workflow (Critical)"

| Command | Description Source | Usage Pattern |
|---------|-------------------|---------------|
| /project.init | CLAUDE.md: "First Time Setup" section | `/project.init` (no args) |
| /project.align | CLAUDE.md: "Context Alignment" section | `/project.align` (no args) |
| /prp.draft | CLAUDE.md: "Step 1: Draft" section | `/prp.draft [feature description]` |
| /prp.generate | CLAUDE.md: "Step 2: Generate PRP" section | `/prp.generate [feature-name]` |
| /prp.execute | CLAUDE.md: "Step 3: Execute PRP" section | `/prp.execute [feature-name]` |
| /quick.task | Inferred from project structure | `/quick.task [task description]` |

### Agents Data Source

**Source:** .claude/agents/*.md files

| Agent | File | Purpose Source | Responsibilities Source |
|-------|------|----------------|------------------------|
| Architect | .claude/agents/architect.md | "Role" and "Mission" section | "Prime Directives" section (4 directives) |
| Documentation | .claude/agents/documentation.md | "Mission" section | "Core Principles" and "Writing Rules" sections |

### Workflow Example Data Source

**Source:** CLAUDE.md "PRP Workflow (Critical)" section, realistic user-dashboard scenario

**Example must show:**
1. Draft phase: `/prp.draft user dashboard...` → structured markdown output
2. Generate phase: `/prp.generate user-dashboard` → clarifying questions + PRP structure
3. Execute phase: `/prp.execute user-dashboard` → implementation steps + architect review + project state update

---

## Desktop Layout Specifications

### Navigation Sidebar

```yaml
Width: 250px (fixed)
Position: sticky top-0
Height: 100vh
Background: gray-100 (Tailwind bg-gray-100)
Border: right border, gray-200
Content: 6 nav items (Hero, What is ACE, Commands, Agents, Workflow, Quick Start)
Interaction: Anchor links (#section-id), smooth scroll on click
Icons: Emoji for each nav item
```

### Main Content Area

```yaml
Position: Right of nav (grid-cols-[250px_1fr])
Max-width: 4xl (1200px) for most sections, 6xl (1536px) for grids
Sections: 6 total with IDs (#hero, #what-is-ace, #commands, #agents, #workflow, #quick-start)
Grid sections: Commands (2-col), Agents (2-col)
Vertical spacing: py-12 between sections
```

### Section IDs

```yaml
#hero: Hero section (title, tagline, description)
#what-is-ace: What is ACE explanation
#commands: Slash Commands (6 commands in 2-col grid)
#agents: AI Agents (2 agents in 2-col grid or cards)
#workflow: PRP Workflow (3-step overview + 3-phase detailed example)
#quick-start: Quick Start Guide (6 numbered steps)
```

---

## Implementation Notes

### Smooth Scroll Behavior

**Option A (CSS):** Add to introduction.css:
```css
html {
  scroll-behavior: smooth;
}
```

**Option B (TypeScript):** Add method to component:
```typescript
scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
```

Use Option A (CSS) unless programmatic control needed.

### Grid Layout

Use Tailwind grid syntax in template:
```html
<div class="grid grid-cols-[250px_1fr]">
  <nav>...</nav>
  <main>...</main>
</div>
```

Only add custom CSS if Tailwind syntax fails.

### Code Block Language

Use `language="bash"` for commands, `language="markdown"` for workflow outputs.

---

## Post-Implementation Tasks

1. **Manual Testing:**
   - Click all 6 nav links, verify scroll to correct section
   - Verify all 6 commands displayed with correct descriptions
   - Verify both agents displayed with correct responsibilities
   - Verify workflow example shows 3 phases with realistic content

2. **Content Verification:**
   - Cross-check command descriptions against CLAUDE.md
   - Cross-check agent descriptions against .claude/agents/*.md
   - Verify file paths in workflow example (.ai/planning/drafts/, etc.)

3. **Architect Review:**
   - Verify signals used for state (slashCommands, agents, navSections, workflowExamples)
   - Verify @if/@for in templates (no *ngIf/*ngFor)
   - Verify OnPush change detection
   - Verify Tailwind classes used (minimal custom CSS)
   - Verify no ESLint violations

4. **Project State Update:**
   - Update `.ai/memory/project-state.md` with enhanced introduction page details
   - Note: 6 slash commands documented, 2 agents documented, full PRP workflow example added
   - Reference this PRP: `.ai/planning/prp/enhanced-introduction-page.md`
