import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../../shared/ui';

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
  // State for collapsible sections (if needed later)
  expandedSections = signal<Set<string>>(new Set(['workflow']));

  // Navigation sections
  protected readonly navSections = signal<NavSection[]>([
    { id: 'hero', label: 'Hero', icon: '🚀' },
    { id: 'what-is-ace', label: 'What is ACE', icon: '📘' },
    { id: 'commands', label: 'Slash Commands', icon: '⌨️' },
    { id: 'agents', label: 'Agents', icon: '🤖' },
    { id: 'workflow', label: 'PRP Workflow', icon: '🔄' },
    { id: 'quick-start', label: 'Quick Start', icon: '⚡' },
  ]);

  // Slash commands
  protected readonly slashCommands = signal<SlashCommand[]>([
    {
      command: '/project.init',
      description:
        'Initialize new project from template. Removes placeholder content, configures project name, optionally sets up Firebase/NgRx/Storybook.',
      usage: '/project.init',
      category: 'setup',
    },
    {
      command: '/project.align',
      description:
        'Align existing Angular codebase. Analyzes structure, discovers tech stack, generates/updates .ai/context/ files to match reality.',
      usage: '/project.align',
      category: 'setup',
    },
    {
      command: '/prp.draft',
      description:
        'Create initial feature draft. Generates structured markdown with requirements, project state scan, documentation references.',
      usage: '/prp.draft [feature description]',
      category: 'prp',
    },
    {
      command: '/prp.generate',
      description:
        'Generate complete PRP. Loads project state, analyzes patterns, asks clarifying questions, outputs implementation plan.',
      usage: '/prp.generate [feature-name]',
      category: 'prp',
    },
    {
      command: '/prp.execute',
      description:
        'Implement feature from PRP. Breaks into subtasks, implements with Angular 21 conventions, validates build/lint, architect review, updates project state.',
      usage: '/prp.execute [feature-name]',
      category: 'prp',
    },
    {
      command: '/quick.task',
      description:
        "Small feature without full PRP. For trivial changes, bug fixes, or quick additions that don't justify planning phase.",
      usage: '/quick.task [task description]',
      category: 'task',
    },
  ]);

  // AI Agents
  protected readonly agents = signal<Agent[]>([
    {
      name: 'Architect',
      file: '.claude/agents/architect.md',
      purpose:
        'Enforces Angular 21 architecture standards, reviews implementations post-execution.',
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
      triggerPoint:
        'ALL markdown file operations (creating/updating .ai/ files, README, documentation)',
    },
  ]);

  // Workflow examples
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
      description:
        'AI creates structured draft at .ai/planning/drafts/user-dashboard.md with requirements, components, behavior, data structures.',
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
      description:
        'AI loads project state, analyzes codebase, asks clarifying questions, generates complete implementation plan.',
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
      description:
        'AI implements feature, validates build/lint, passes architect review, updates project state.',
    },
  ]);

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
  protected readonly quickStartSteps: QuickStartStep[] = [
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
      title: 'Initialize Your Project (First Time Only)',
      description:
        'Remove placeholder content and configure your project name. This also allows you to set up optional technologies like Firebase, NgRx Signal Store, or Storybook.',
      command: '/project.init',
    },
    {
      step: 4,
      title: 'OR: Align Existing Project',
      description:
        'If you want to use PRP workflow in an existing Angular project, run this to analyze your codebase and generate aligned context documentation.',
      command: '/project.align',
    },
    {
      step: 5,
      title: 'Start Dev Server',
      description: 'Launch the development server to verify setup.',
      command: 'npm start',
    },
    {
      step: 6,
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
