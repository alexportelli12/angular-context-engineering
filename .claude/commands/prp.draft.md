# Draft PRP: $ARGUMENTS

Create initial feature draft using `.ai/planning/drafts/initial_template.md`.

## Process

1. **Parse** `$ARGUMENTS` → feature name (kebab-case), core functionality
2. **Load template** from `.ai/planning/drafts/initial_template.md`
3. **Quick scan** `project-state.md` for existing features/patterns
4. **Fill sections:** Feature description, documentation links, considerations
5. **Clarify** if needed: scope (MVP/full), integration points
6. **Save** to `.ai/planning/drafts/{feature-name}.md`

## Output

Use documentation agent for markdown creation.

**Next step:** `/prp.generate {feature-name}`
