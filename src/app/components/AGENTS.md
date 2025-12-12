# Context Shard: Dumb Components (UI)

**Scope:** This folder contains **Dumb/Presentational Components**.

## Rules

1.  **Role**: Render UI based _only_ on Inputs.
2.  **Dependencies**: **STRICTLY FORBIDDEN** to inject Services (except `ElementRef` or `Renderer2` for visual manipulation).
3.  **Communication**:
    - Data IN: `input()` or `input.required()` signals.
    - Data OUT: `output()` functions.
4.  **Performance**: `ChangeDetectionStrategy.OnPush` is mandatory.
5.  **Templates**: Must use `templateUrl`.
