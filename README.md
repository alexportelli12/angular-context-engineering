# Angular Context Engineering

A high-performance Angular repository template designed specifically for **AI-Assisted Engineering**.

This repository implements **Context Engineering** principles—specifically the **PRP (Product Requirement Prompt)** method and **Context Sharding**—to allow AI agents (like Claude Code) to build high-quality, architectural-compliant features with minimal hallucinations.

## 🚀 Tech Stack

- **Framework**: Angular 21+ (Signals, Standalone, Control Flow)
- **Styling**: TailwindCSS
- **Architecture**: Smart (Page) vs. Dumb (UI) Components
- **Tooling**: Claude Code (primary agent), Angular MCP

## 🧠 Core Concepts

This is not a standard starter kit. It is a "Software Factory" designed for AI agents.

1.  **PRP Method**: We never code directly from a rough idea. We use a **Research → Plan → Implement** lifecycle.
2.  **Context Sharding**: To prevent AI "context overflow," architectural rules are placed in local `AGENTS.md` files (e.g., inside `src/app/pages/`). The agent only reads them when necessary.
3.  **Strict Guardrails**: The AI is forbidden from using legacy patterns (Modules, `*ngIf`, Constructor DI).

## 📂 Repository Structure

```text
├── .ai/                       # The AI "Brain"
│   ├── commands/              # Prompts for /generate-prp, /execute-prp
│   ├── examples/              # "Gold Standard" code (Source of Truth)
│   ├── memory/                # Context compaction & session summaries
│   └── templates/             # prp_base.md blueprint
├── .claude/
│   └── commands/              # Custom Slash Commands definitions
├── src/
│   └── app/
│       ├── pages/             # Smart Components (AGENTS.md rules applied)
│       └── components/        # Dumb Components (AGENTS.md rules applied)
├── AGENTS.md                  # Root Manifesto & Context Map
├── CLAUDE.md                  # System Prompt
├── INITIAL.md                 # Feature Request Entry Point
└── README.md                  # This file
```

## ⚡️ Development Workflow

We use **Custom Slash Commands** to drive development. Do not ask the AI to "just write code." Follow this loop:

### 1\. Bootstrap (`/initial`)

Tell the agent what you want in natural language. It will research documentation, find internal examples, and populate the `INITIAL.md` file.

```bash
> /initial "Create a User Dashboard with a data table and a search filter"
```

### 2\. Architect (`/generate-prp`)

The agent reads `INITIAL.md`, checks the "Gold Standard" examples, and creates a formal **Product Requirement Prompt (PRP)** in `.ai/prps/`. This includes a validation plan and file structure.

```bash
> /generate-prp INITIAL.md
```

### 3\. Build (`/execute-prp`)

The agent reads the generated PRP and implements it. It automatically adheres to the "Smart vs. Dumb" architecture by reading the local `AGENTS.md` files in the target directories.

```bash
> /execute-prp .ai/prps/001-user-dashboard.md
```

## 🏛 Architecture Rules

### Smart Components (`src/app/pages/`)

- **Role**: Route handlers, data fetching, logic orchestration.
- **Allowed**: Service Injection (`inject()`), Signal Stores.
- **Constraint**: Must use `templateUrl` (no inline).

### Dumb Components (`src/app/components/`)

- **Role**: Pure UI presentation.
- **Allowed**: `input()` signals, `output()` functions.
- **Forbidden**: Service Injection.
- **Constraint**: `ChangeDetectionStrategy.OnPush` is mandatory.

## 🛠 Setup & Requirements

1.  **Install Claude Code**: Follow the official Anthropic documentation.
2.  **Angular MCP**: Ensure you have the Angular Model Context Protocol server configured.
3.  **Node/NPM**: standard Angular requirements.

## 📚 References

- **Context Engineering**: [Context Engineering 101 (Video)](https://www.youtube.com/watch?v=Mk87sFlUG28)
- **Context Compaction**: [No Vibes Allowed (Video)](https://www.youtube.com/watch?v=rmvDxxNubIg)
- **Angular MCP**: [Official Documentation](https://angular.dev/ai/mcp)

---
