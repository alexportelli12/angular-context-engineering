# Context Shard: Smart Components (Pages)

**Scope:** This folder contains **Smart/Container Components** representing Routes.

## Rules

1.  **Role**: Orchestrate data and logic.
2.  **Dependencies**: You MAY inject Services, Stores, and Routers here.
3.  **Templates**: Must use `templateUrl`.
4.  **Children**: Use Dumb components for UI. Do not write complex HTML here; delegate to Dumb components.
5.  **State**: Manage local state with `signal()` or `computed()`.
