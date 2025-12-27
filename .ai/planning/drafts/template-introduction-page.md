# PRP Draft: Template Introduction Page

## FEATURE:

Create a visually modern welcome page that serves as the landing page for users who fork and run this Angular template repository for the first time. The page should explain:

- **Purpose of this repository:** A structured Angular 21 starter template designed to work with Claude Code AI agents
- **What is the PRP workflow:** Overview of the Draft → Generate → Execute pipeline for feature development
- **Quick Start Guide:** Step-by-step instructions for developers to start building features using the PRP commands
- **Visual hierarchy:** Desktop-optimized layout with modern UI/UX that emphasizes clarity and readability

**Expected Behavior:**

- Default route (`/`) displays this introduction page
- Hero section explains the repository's purpose
- Workflow diagram or visual representation of the PRP lifecycle
- Interactive or collapsible sections for quick start guide
- Links to documentation files in `.ai/` directory
- Call-to-action prompts to run `/prp.draft` for their first feature

**Target Audience:** Developers forking this template who need to understand how to leverage the PRP workflow with Claude Code.

## DOCUMENTATION:

**Angular Resources:**

- Angular Routing: https://angular.dev/guide/routing
- Angular Signals: https://angular.dev/guide/signals
- Angular Components: https://angular.dev/guide/components

**Internal Context:**

- `.ai/context/core/architecture.md` - directory structure for pages/
- `.ai/context/core/coding-standards.md` - Angular 21 syntax requirements (@if/@for, inject(), input/output)
- `.ai/context/core/tech-stack.md` - Tailwind CSS 4 usage
- `CLAUDE.md` - PRP workflow documentation to reference in page content

**External Resources:**

- Tailwind CSS Typography: https://tailwindcss.com/docs/typography-plugin (if needed for prose content)
- Heroicons or Lucide Icons: For visual elements in the guide

## OTHER CONSIDERATIONS:

**Angular 21 Requirements:**

- [x] Use `signal()` for state (not BehaviorSubject)
- [x] Use `inject()` for DI (not constructor)
- [x] Use `@if`/`@for` templates (not `*ngIf`/`*ngFor`)
- [x] Use `input()`/`output()` (not @Input/@Output decorators)
- [x] OnPush change detection
- [x] Component filename without `.component.` (e.g., introduction.ts)
- [x] Use Tailwind classes for styling (custom CSS only when needed)
- [x] Style files as `.css` (not `.scss`)
- [x] Fix lint errors properly (NEVER disable ESLint rules)

**Architecture Constraints:**

- **Directory Placement:** `src/app/pages/introduction/` (routed page component)
- **Route:** Configure as default route (`path: ''`) in `app.routes.ts`
- **Component Type:** Smart component (page-level) with potential child presentational components
- **State Management:** Local component state using signals for any interactive elements (e.g., collapsible sections)

**Content Structure:**

1. Hero section: Repository title, tagline, key value proposition
2. What is this repository: Brief explanation of the template's purpose
3. PRP Workflow section: Visual representation or step-by-step breakdown
   - Draft Phase: `/prp.draft` command
   - Generate Phase: `/prp.generate` command
   - Execute Phase: `/prp.execute` command
4. Quick Start Guide: Numbered steps for first feature
5. Footer: Links to `.ai/context/` documentation files

**Design Considerations:**

- Modern, clean aesthetic (Tailwind's default design system)
- Desktop-first responsive design (optimize for 1024px+ viewports)
- Use Tailwind's spacing scale for consistent layout
- Typography: Clear hierarchy with headings, subheadings, body text
- Color scheme: Professional, developer-friendly (consider dark mode compatibility if applicable)
- Code snippets: Use `<code>` and `<pre>` blocks styled with Tailwind (e.g., `bg-gray-100 rounded px-2 py-1`)

**Edge Cases:**

- Page should render correctly with or without JavaScript (SSR support)
- External links should open in new tabs (`target="_blank" rel="noopener noreferrer"`)
- Ensure accessibility (semantic HTML, ARIA labels if needed)

**Potential Shared Components:**

- Consider creating reusable components in `shared/ui/` if needed:
  - `CodeBlock` component for displaying command examples
  - `WorkflowStep` component for PRP workflow visualization
  - `CollapsibleSection` component for expandable guide sections

**Testing Notes:**

- Tests are NOT required unless explicitly requested
- Visual verification after build is sufficient

**Integration Points:**

- No external API calls
- No authentication required
- Static content (can be signal-based for interactivity like toggling sections)

---

## Next Step

Once this draft is complete, run:

```
/prp.generate template-introduction-page
```
