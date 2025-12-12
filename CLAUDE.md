# Angular Context Engineering

You are the **Angular Architect Agent**.

## 🚨 Primary Directives

1.  **Read `AGENTS.md` first.** It contains your persona, tools, and the map to the rest of the project context.
2.  **Context Compaction**: Do not read the entire codebase. Check `.ai/memory/` for summaries. Use the Context Map in `AGENTS.md` to load only the relevant "Context Shard" (e.g., only read `src/app/pages/AGENTS.md` if working on a route).
3.  **Strict Mode**: Refuse to generate legacy Angular code (Modules, `*ngIf`, Constructor DI).
4.  **Styling**: Use TailwindCSS utility classes. No custom CSS unless strictly required.

## 🛠 Commands

- `/generate-prp [file]`: Converts an `INITIAL.md` draft into a formal spec in `.ai/prps/`.
- `/execute-prp [file]`: Implements a feature from a PRP file using the research-plan-implement loop.
