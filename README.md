# ACE (Angular Context Engineering)

A starter template for Angular 21 projects optimized for AI-assisted development with Claude Code. Fork this repository to get a pre-configured environment with structured context, architectural guardrails, and a repeatable workflow for building features.

## What This Repository Does

This is not a standard Angular starter kit. It is a structured environment that gives Claude Code the context it needs to produce consistent, architecture-compliant code. The key innovation is the **PRP (Product Requirement Prompt)** workflow, which separates planning from implementation to reduce AI hallucinations and enforce coding standards.

## Tech Stack

- **Framework:** Angular 21 (Signals, Standalone Components, Control Flow Syntax)
- **Styling:** Tailwind CSS 4
- **Testing:** Vitest
- **AI Tooling:** Claude Code & GitHub Copilot (shared commands via symlinks)

---

## Multi-Tool Support (Claude Code & GitHub Copilot)

This repository supports both **Claude Code** and **GitHub Copilot** using a single set of command/prompt files.

### How It Works

Commands and agents are defined once in `.github/` and symlinked to `.claude/`:

```
.github/prompts/*.prompt.md  →  .claude/commands/*.md
.github/agents/*.agent.md    →  .claude/agents/*.md
```

### Syncing Commands

After cloning or adding new prompts, run:

```bash
npm run sync:prompts
```

This creates symlinks so both tools use the same source files.

### File Naming Conventions

| Location            | Naming                | Used By        |
| ------------------- | --------------------- | -------------- |
| `.github/prompts/`  | `{name}.prompt.md`    | GitHub Copilot |
| `.github/agents/`   | `{name}.agent.md`     | GitHub Copilot |
| `.claude/commands/` | `{name}.md` (symlink) | Claude Code    |
| `.claude/agents/`   | `{name}.md` (symlink) | Claude Code    |

### YAML Frontmatter

All prompt/command files include YAML frontmatter for GitHub Copilot compatibility:

```yaml
---
mode: agent
description: Brief description of what the command does
---
```

Claude Code ignores this frontmatter, so the same file works for both tools.

---

## How the Workflow Works

The development flow has two paths: **Full PRP Workflow** (for complex features) and **Quick Task** (for simple changes).

### Full PRP Workflow

For complex features requiring planning and architectural decisions:

```
[Complex Feature Idea]
        |
        v
  /prp.draft     -->  Creates initial draft from prompt
        |
        v
  /prp.generate  -->  Creates a detailed PRP file
        |
        v
  /prp.execute   -->  Implements the feature from the PRP
        |
        v
  Architect Review  -->  Validates architectural compliance
        |
        v
  [Complete Feature]
```

### Quick Task Workflow

For simple, well-understood tasks:

```
[Simple Task]
        |
        v
  /quick.task    -->  Implements directly with validation
        |
        v
  [Complete Task]
```

### Step 1: Draft the Feature (Optional but Recommended)

When you have a feature idea, start by creating a draft:

```
/prp.draft user dashboard with profile info and activity feed
```

The agent will:

1. Parse your feature prompt
2. Quick scan the project state and architecture
3. Create a structured draft with the feature description, required documentation, and key considerations
4. Save to `.ai/planning/drafts/user-dashboard.md`

You can review and edit this draft before generating the full PRP.

### Step 2: Generate a PRP

Once you have a draft (or if you're confident in your requirements), run the `/prp.generate` command:

```
/prp.generate user-dashboard
```

The agent will:

1. Read the project state from `.ai/memory/project-state.md`
2. Load the draft from `.ai/planning/drafts/` if it exists
3. Analyze existing code patterns in `src/app/`
4. Reference architectural rules in `.ai/context/core/`
5. Ask clarifying questions if needed
6. Output a complete PRP to `.ai/planning/prp/user-dashboard.md`

The PRP contains everything needed to implement the feature: requirements, file structure, code patterns, integration points, and validation steps.

### Step 3: Execute the PRP

Once you have a PRP, run the `/prp.execute` command:

```
/prp.execute user-dashboard
```

The agent will:

1. Load the PRP and project state
2. Break the work into tracked subtasks
3. Create models, services, and components in order
4. Follow Angular 21 conventions (signals, inject(), @if/@for)
5. Run validation (build, lint)
6. Invoke the Architect Agent for review
7. Update `.ai/memory/project-state.md` with the new feature

---

## Slash Commands

Six custom slash commands are defined in `.claude/commands/`:

### /project.init

**Purpose:** Initialize a new project by removing placeholder content and configuring your project name.

**What it does:**

- Removes placeholder components (IntroductionComponent, CodeBlockComponent)
- Prompts for project name and description
- Updates all configuration files (package.json, angular.json, etc.)
- Creates a minimal HomeComponent as a starting point
- Optionally sets up additional technologies (Firebase, NgRx Signal Store, Storybook)
- Updates project documentation

**Important:** Run this command ONLY ONCE when setting up a new project from this template.

**Usage:** `/project.init`

### /project.align

**Purpose:** Analyze the existing codebase and align context documentation to match actual implementation.

**What it does:**

- Analyzes the Angular project structure and patterns
- Discovers tech stack, architecture, and coding standards from actual code
- Generates or updates `.ai/context/` files to reflect reality
- Updates `.ai/memory/project-state.md` with all features, routes, and services
- Creates alignment report with recommendations
- Identifies pattern inconsistencies and documentation drift

**Use Cases:**

- Adopting PRP workflow in an existing Angular project
- Context drift after multiple changes or refactoring
- Onboarding Claude Code to a legacy codebase
- Periodic maintenance (every 3-6 months)

**Usage:** `/project.align`

### /prp.draft

**Purpose:** Create a structured draft from a feature prompt before full PRP generation.

**What it does:**

- Parses your feature description into a structured format
- Quick scans the project state and architecture
- Identifies relevant documentation and resources
- Captures Angular 21 gotchas and considerations

**Output:** `.ai/planning/drafts/{feature-name}.md`

### /prp.generate

**Purpose:** Create a detailed implementation specification before writing any code.

**What it does:**

- Loads current project state to avoid conflicts
- Researches the codebase for similar patterns
- References architecture and coding standards
- Produces a PRP file with requirements, file structure, pseudocode, and validation criteria

**Output:** `.ai/planning/prp/{feature-name}.md`

### /prp.execute

**Purpose:** Implement a feature from an existing PRP.

**What it does:**

- Loads the PRP and project state
- Creates files in the correct order (models, services, components, routes, tests)
- Enforces Angular 21 patterns (no legacy syntax)
- Runs validation commands (build, lint)
- Triggers architectural review
- Updates project state documentation

**Input:** The feature name that matches a PRP file

### /quick.task

**Purpose:** Implement small features or fixes without the full PRP workflow.

**What it does:**

- Loads project state and architectural context
- Plans and implements simple tasks efficiently
- Follows all Angular 21 conventions and coding standards
- Runs validation (build, lint)
- Updates project state if needed (new routes, services, or features)

**Use cases:**

- Simple bug fixes
- New shared UI components
- Small enhancements to existing features
- Single or few-file changes
- Well-understood requirements

**When NOT to use:**

- Tasks requiring architectural decisions
- Features affecting multiple parts of the application
- Complex state management or integrations
- Unclear requirements needing exploration

**Usage:** `/quick.task add loading spinner component to shared/ui`

**Output:** Direct implementation with validation, bypassing PRP generation

---

## AI Agents

This repository includes specialized AI agents that assist with specific tasks.

### The Architect Agent

The Architect Agent (`.claude/agents/architect.md`) is a specialized reviewer that validates implementations against architectural rules. It is invoked automatically at the end of `/prp.execute`.

**What it checks:**

- Module boundaries (no cross-feature imports)
- State management (signals, not BehaviorSubject)
- Zoneless compliance (OnPush change detection)
- Smart/Dumb component separation
- Template syntax (@if/@for, not *ngIf/*ngFor)
- Barrel exports (index.ts in every directory)

**Possible outcomes:**

- **PASS:** Implementation approved, proceed to documentation
- **FAIL:** Specific violations listed with file paths and fix instructions

The agent does not write code. It reviews and enforces standards.

### The Documentation Agent

The Documentation Agent (`.claude/agents/documentation.md`) writes dense, token-efficient markdown documentation optimized for AI agent consumption.

**What it does:**

- Creates or updates all markdown documentation files
- Maximizes information density per token (50-70% reduction from verbose drafts)
- Ensures consistency across repository documentation
- Uses structured format: front-loaded critical info, bullet points, minimal whitespace
- Focuses on technical precision without verbosity

**When invoked:**

- Creating or updating files in `.ai/` directory
- Writing architectural documentation
- Updating project state or decision logs
- Creating feature PRPs or drafts
- Any markdown file that will be consumed by AI agents

**Key principles:**

- Active voice, imperative mood
- Zero filler or meta-commentary
- Hierarchical organization (most important first)
- Code examples only when demonstrating non-obvious patterns
- Consistent terminology throughout repository

**Note:** This agent is automatically used by the PRP workflow commands for documentation updates.

---

## The .ai/ Folder Structure

The `.ai/` folder contains all context that Claude Code uses to understand your project.

```
.ai/
├── context/
│   └── core/
│       ├── architecture.md      # Directory structure, layer responsibilities
│       ├── coding-standards.md  # Angular 21 patterns and anti-patterns
│       └── tech-stack.md        # Framework versions and dependencies
├── memory/
│   ├── project-state.md         # Current features, routes, services
│   └── decisions-log.md         # Architectural Decision Records (ADRs)
└── planning/
    ├── drafts/
    │   └── initial_template.md  # Template for feature drafts
    ├── templates/
    │   └── feature-prp.md       # Base template for PRPs
    └── prp/                     # Generated PRPs live here
```

### Key Files Explained

**`.ai/context/core/architecture.md`**
Defines the directory structure and what belongs in each layer. Pages are smart components (inject services, manage state). Shared/ui components are dumb (input/output only). Every directory needs an index.ts barrel export.

**`.ai/context/core/coding-standards.md`**
Specifies Angular 21 syntax requirements. No @Input/@Output decorators (use input()/output()). No *ngIf/*ngFor (use @if/@for). No constructor injection (use inject()). No BehaviorSubject for state (use signals).

**`.ai/memory/project-state.md`**
A living document that tracks what has been built. Lists implemented features, active routes, services, and models. Updated after each feature completion to provide context for future work.

**`.ai/planning/drafts/initial_template.md`**
The template used by `/prp.draft` to create initial feature drafts. Provides a structured format for capturing feature requirements, documentation references, and Angular 21 considerations before full PRP generation.

**`.ai/planning/templates/feature-prp.md`**
The template used by `/prp.generate` to create PRPs. Contains sections for requirements, file structure, pseudocode, integration points, and validation checklists.

---

## Customizing the Context

You can modify the `.ai/` folder to match your project needs:

**To change architectural rules:**
Edit `.ai/context/core/architecture.md` to define your directory structure and layer responsibilities.

**To change coding standards:**
Edit `.ai/context/core/coding-standards.md` to specify which patterns are allowed or forbidden.

**To change the PRP template:**
Edit `.ai/planning/templates/feature-prp.md` to adjust what information PRPs should contain.

**To change the Architect review criteria:**
Edit `.claude/agents/architect.md` to modify what the review checks for.

---

## Repository Structure

```
.
├── .ai/                         # AI context and memory
│   ├── context/core/            # Architecture and coding standards
│   ├── memory/                  # Project state and decisions
│   └── planning/                # PRP templates and generated PRPs
├── .github/
│   ├── prompts/                 # Source files for slash commands (Copilot format)
│   │   ├── project.init.prompt.md
│   │   ├── project.align.prompt.md
│   │   ├── prp.draft.prompt.md
│   │   ├── prp.generate.prompt.md
│   │   ├── prp.execute.prompt.md
│   │   └── quick.task.prompt.md
│   └── agents/                  # Source files for agents (Copilot format)
│       ├── architect.agent.md
│       └── documentation.agent.md
├── .claude/
│   ├── agents/                  # Symlinks to .github/agents/
│   │   ├── architect.md         → .github/agents/architect.agent.md
│   │   └── documentation.md     → .github/agents/documentation.agent.md
│   └── commands/                # Symlinks to .github/prompts/
│       ├── project.init.md      → .github/prompts/project.init.prompt.md
│       ├── project.align.md     → .github/prompts/project.align.prompt.md
│       ├── prp.draft.md         → .github/prompts/prp.draft.prompt.md
│       ├── prp.generate.md      → .github/prompts/prp.generate.prompt.md
│       ├── prp.execute.md       → .github/prompts/prp.execute.prompt.md
│       └── quick.task.md        → .github/prompts/quick.task.prompt.md
├── src/app/
│   ├── core/                    # Guards, interceptors, error handlers
│   ├── models/                  # TypeScript interfaces and types
│   ├── pages/                   # Smart components (feature pages)
│   ├── services/                # Global services
│   └── shared/ui/               # Dumb components (presentational)
└── README.md
```

---

## Getting Started

1. Fork this repository
2. Clone it to your local machine
3. Install dependencies: `npm install`
4. **Sync commands (required):** `npm run sync:prompts`
   - Creates symlinks from `.github/` to `.claude/` for both tools to work
5. **Initialize your project (first time only):** `/project.init`
   - This removes placeholder content and configures your project name
   - Optionally sets up additional technologies (Firebase, NgRx Signal Store, Storybook)
6. Open in Claude Code or VS Code with GitHub Copilot
7. Choose your workflow based on task complexity:

**For complex features (Full PRP Workflow):**

- Draft your feature: `/prp.draft your feature description here`
- Review and refine the draft in `.ai/planning/drafts/`
- Generate the full PRP: `/prp.generate {feature-name}`
- Review the generated PRP in `.ai/planning/prp/`
- Implement the feature: `/prp.execute {feature-name}`

**For simple tasks (Quick Task Workflow):**

- Implement directly: `/quick.task add loading spinner to shared/ui`

---

## Architecture Rules Summary

**Pages (src/app/pages/):**

- Smart components that handle routing and data fetching
- May inject services using `inject()`
- Manage state with signals
- Must use external template files

**Shared UI (src/app/shared/ui/):**

- Dumb components for pure presentation
- Communicate via `input()` and `output()` only
- No service injection allowed
- OnPush change detection required

**Services (src/app/services/):**

- Provided in root
- Use signals for synchronous state
- Use RxJS only for async operations (HTTP, WebSockets)

**Models (src/app/models/):**

- TypeScript interfaces and types only
- No implementation logic
- Barrel exports required

---

## References

- Context Engineering 101 - The Simple Strategy to 100x AI Coding: https://www.youtube.com/watch?v=Mk87sFlUG28
- Are Agent Harnesses Bringing Back Vibe Coding?: https://www.youtube.com/watch?v=13HP_bSeNjU
- No Vibes Allowed: Solving Hard Problems in Complex Codebases – Dex Horthy, HumanLayer: https://www.youtube.com/watch?v=rmvDxxNubIg&t=1s

---

## Author

Created by **Alex Portelli**

- 🌐 Website: [alexportelli.com](https://alexportelli.com)
- 💼 LinkedIn: [linkedin.com/in/portellialex](https://www.linkedin.com/in/portellialex/)
- ✍️ Medium: [@alexportelli12](https://medium.com/@alexportelli12)
- 💻 GitHub: [alexportelli12](https://github.com/alexportelli12)
