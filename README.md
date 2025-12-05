# 🚀 Angular AI-Native Template (RPI Workflow)

**Stop generating "slop". Start engineering context.**

This is a specialized Angular template configured for the **Research -\> Plan -\> Implement (RPI)** workflow. It comes pre-wired with a "Context Engine" that prevents AI hallucinations and ensures high-quality, architecturally sound code generation using `gemini-cli`.

## 🧠 The Philosophy

Most developers use AI by "chatting" with it, leading to a cycle of bad code and endless corrections. This repository enforces a **Context Engineering** approach:

1.  **Research:** The AI acts as an Architect. It reads your project structure (without reading every file) to understand the "Ground Truth."
2.  **Plan:** The AI acts as a Tech Lead. It generates a strict implementation checklist before a single line of code is written.
3.  **Implement:** The AI acts as a Developer. It executes the plan atomically, ensuring high code quality.

## ✨ Features

- **Modern Angular:** Configured for Standalone Components, Signals, and `OnPush` change detection.
- **Tailwind CSS:** Pre-configured for rapid styling.
- **Context Hygiene:** Strict `.geminiignore` rules to keep the AI focused.
- **Custom AI Commands:** Built-in slash commands (`/research`, `/plan`, `/implement`) to automate the workflow.

---

## 🛠️ Getting Started

### 1\. Prerequisites

- **Node.js** (Latest LTS)
- **Gemini CLI:** You must have the Gemini CLI installed and authenticated.
  ```bash
  npm install -g @google/gemini-cli
  # OR follow official installation docs for your specific OS
  ```

### 2\. Installation

Use this template to start your new project:

```bash
# Clone the repository
git clone https://github.com/your-username/angular-ai-template.git my-new-app

# Install dependencies
cd my-new-app
npm install

# Initialize the AI Context (Generates the map of your app)
node scripts/ai/get-skeleton.js
```

---

## 🤖 The AI Workflow

This repository uses **Custom Slash Commands**. You interact with the AI primarily through these commands to ensure it stays in the "Smart Zone."

### Phase 1: Research 🧐

_Before you build, understand._

Use this command to ask high-level architectural questions. The AI will look at your routes, dependencies, and config **without** reading implementation details.

```bash
gemini /research "I want to add a dashboard with a sidebar navigation."
```

> **Output:** A summary saved to `.ai/context/research_summary.md` detailing where the files should go and potential risks.

### Phase 2: Plan 📋

_Before you code, align._

Convert the research into a checklist. This prevents the "I forgot to import the module" loop.

```bash
gemini /plan "Create the dashboard based on the research."
```

> **Output:** An implementation plan saved to `.ai/plans/current-plan.md`.
>
> **⚠️ CRITICAL:** Open this file\! Read it. If the plan is wrong, the code will be wrong.

### Phase 3: Implement 🏗️

_Execute with precision._

Execute the plan one step at a time. This keeps the context window small and accuracy high.

```bash
gemini /implement src/app/features/dashboard/dashboard.component.ts "Step 1: Create the component structure"
```

> **Output:** The AI will write the actual code to the file using Angular best practices.

### Phase 4: Review 🕵️

_Trust but verify._

```bash
gemini /review:code src/app/features/dashboard/dashboard.component.ts
```

---

## 📂 Project Structure

```text
/
├── .gemini/
│   └── commands/        # Custom Slash Commands definitions (.toml)
├── .ai/
│   ├── prompts/         # System Personas (Architect, Planner, Coder)
│   ├── context/         # Generated Research Summaries
│   └── plans/           # Generated Implementation Plans
├── scripts/
│   └── ai/              # Tools that generate context for the CLI
├── src/                 # Your Angular Source Code
└── CONTRIBUTING_AI.md   # Detailed guide on the RPI workflow
```

## 🧩 Customizing the Brain

You can tweak the "Personas" to fit your team's style by editing the markdown files in `.ai/prompts/`.

- **`researcher.md`**: Controls how strict the architecture analysis is.
- **`implementer.md`**: Controls coding style (e.g., forcing specific linting rules).

## 📄 License

[MIT](https://www.google.com/search?q=LICENSE)
