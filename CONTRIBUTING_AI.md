# AI Development Workflow (RPI Model)

This repository uses a strict **Research -> Plan -> Implement** workflow to ensure high-quality Angular code.

## 🚫 The Golden Rules

1.  **Never code without a Plan.**
2.  **Never plan without Research.**
3.  **Review the Plan, not just the PR.**

## 🛠 The Workflow

### 1. Initialize Context

Before starting a task, refresh the AI's map of the project.

```bash
node scripts/ai/get-skeleton.js
```

### 2. Phase 1: Research (The "Dumb Zone" Prevention)

Ask the AI to analyze the architecture for your feature.

```bash
gemini /research "I want to add a user profile page with a photo upload."
# Output: .ai/context/research_summary.md
```

### 3. Phase 2: Plan (The Mental Alignment)

Generate a checklist of atomic steps.

```bash
gemini /plan "Create the profile page based on the research."
# Output: .ai/plans/current-plan.md
```

🔍 CRITICAL STEP: Read the plan file! If it looks wrong, run /plan again with corrections. Optional: Run gemini /review:plan to get an AI critique.

### 4. Phase 3: Implementation (The Execution)

Execute the plan one file at a time.

```bash
gemini /implement src/app/features/profile/profile.component.ts "Step 1: Scaffolding"
```

### 5. Review

Before committing, check the code quality.

```bash
gemini /review:code src/app/features/profile/profile.component.ts
```

---

### Phase 3 Complete: The Full Picture

You now have a complete **Template Repository** that enforces the behavior described in the talk.

**The Repository Structure:**

```text
/
├── .geminiignore                # Context Firewall
├── CONTRIBUTING_AI.md           # The Manual
├── .gemini/
│   └── commands/
│       ├── research.toml        # The Architect
│       ├── plan.toml            # The Manager
│       ├── implement.toml       # The Worker
│       ├── review-plan.toml     # The Critic
│       └── review-code.toml     # The Critic
├── .ai/
│   ├── prompts/                 # System Personas (Markdown)
│   ├── context/                 # Generated Research
│   └── plans/                   # Generated Plans
└── scripts/
    └── ai/
        ├── get-skeleton.js      # Context Generator
        └── get-deep-dive.js     # Context Generator
```
