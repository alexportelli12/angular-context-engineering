# Architecture Decision Records

Tracks major architectural decisions using ADR format.

---

## How to Use

When making significant architectural decision:

1. Add new ADR entry using template below
2. Increment ADR number sequentially
3. Include date, status, context, decision, consequences, alternatives
4. Link to relevant PRPs, commits, documentation

---

## ADR Template

```markdown
## ADR-XXX: [Title]

**Date:** YYYY-MM-DD
**Status:** Accepted | Proposed | Deprecated | Superseded

**Context:** Issue being addressed, constraints

**Decision:** Change being made, pattern adopted

**Consequences:**
- Positive: Benefits
- Negative: Trade-offs, limitations
- Neutral: Other impacts

**Alternatives Considered:**
1. Option A - Why rejected
2. Option B - Why rejected

**Related:**
- PRP: `.ai/planning/prp/[feature].md`
- Commit: [hash]
- Docs: [link]

---
```

---

## Decision Log

_Architect Agent populates this as decisions are made._

---
