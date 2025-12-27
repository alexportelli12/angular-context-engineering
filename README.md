# Angular Context Engineering

A starter template for Angular 21 projects optimized for AI-assisted development with Claude Code. Fork this repository to get a pre-configured environment with structured context, architectural guardrails, and a repeatable workflow for building features.

## What This Repository Does

This is not a standard Angular starter kit. It is a structured environment that gives Claude Code the context it needs to produce consistent, architecture-compliant code. The key innovation is the **PRP (Product Requirement Prompt)** workflow, which separates planning from implementation to reduce AI hallucinations and enforce coding standards.

## Tech Stack

- **Framework:** Angular 21 (Signals, Standalone Components, Control Flow Syntax)
- **Styling:** Tailwind CSS 4
- **Testing:** Vitest
- **AI Tooling:** Claude Code with custom slash commands

---

## How the Workflow Works

The development flow has two phases: **Generate** and **Execute**.

```
[Your Feature Idea]
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

### Step 1: Generate a PRP

When you have a feature to build, run the `/prp.generate` command with a description:

```
/prp.generate user-dashboard
```

The agent will:

1. Read the project state from `.ai/memory/project-state.md`
2. Analyze existing code patterns in `src/app/`
3. Reference architectural rules in `.ai/context/core/`
4. Ask clarifying questions if needed
5. Output a complete PRP to `.ai/planning/prp/user-dashboard.md`

The PRP contains everything needed to implement the feature: requirements, file structure, code patterns, integration points, and validation steps.

### Step 2: Execute the PRP

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

Two custom slash commands are defined in `.claude/commands/`:

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

---

## The Architect Agent

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
│   ├── decisions-log.md         # Architectural Decision Records (ADRs)
│   └── progress.md              # Session progress tracking
└── planning/
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
├── .claude/
│   ├── agents/
│   │   └── architect.md         # Architect agent persona
│   └── commands/
│       ├── prp.generate.md      # Generate PRP command
│       └── prp.execute.md       # Execute PRP command
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
2. Install dependencies: `npm install`
3. Open in Claude Code
4. Describe your first feature and run `/prp.generate {feature-name}`
5. Review the generated PRP
6. Run `/prp.execute {feature-name}` to implement

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
