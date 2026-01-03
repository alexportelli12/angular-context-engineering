---
agent: agent
description: Initialize new Angular project from template
---

# Initialize Project: $ARGUMENTS

Initialize new Angular project from this template: remove placeholders, configure name, setup technologies.

**IMPORTANT:**

- Run ONCE on fresh repository clone
- Destructive - removes placeholder components
- Template-specific (Angular 21) — for other stacks, use `/project.align`

## Managed Files

This command updates these files (use documentation agent for all writes):

**IMPORTANT:** Edit command/agent files in `.github/` (source), NOT `.claude/` (symlinks).

```
.ai/memory/project-state.md    # Update with project name, initial state
CLAUDE.md                      # Update project name reference
package.json                   # Update name, description
angular.json                   # Update project name
src/app/app.ts                 # Update title
src/app/app.spec.ts            # Update test expectations
```

## Phase 1: Gather Requirements

Ask user via `AskUserQuestion`:

1. **Project Name** (required)
   - Validation: kebab-case
   - Examples: "my-angular-app", "ecommerce-platform"

2. **Project Description** (optional)
   - Added to package.json

3. **Additional Technologies** (optional, multi-select)
   - Firebase: Backend services (Auth, Firestore, Storage, Hosting)
   - NgRx Signal Store: Advanced state management
   - Storybook: Component docs and visual testing
   - None: Skip

## Phase 2: Remove Placeholders

Delete template components:

- `src/app/pages/introduction/`
- `src/app/shared/ui/code-block/`

Update barrel exports:

- `src/app/pages/index.ts` → empty
- `src/app/shared/ui/index.ts` → empty

Create minimal HomeComponent:

**`pages/home/home.ts`:**

```typescript
@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  protected readonly projectName = signal('{user-provided-project-name}');
}
```

**`pages/home/home.html`:** Welcome message with Tailwind classes

**`pages/home/home.css`:** Empty (use Tailwind)

**`pages/home/index.ts`:** `export * from './home';`

**Update `app.routes.ts`:** Default route to HomeComponent (lazy-loaded)

## Phase 3: Update Configuration

### package.json

Replace:

- `name`: user-provided name
- `description`: user description
- `serve:ssr:*` script: update project name

### angular.json

Search/replace all "angular-context-engineering" with user-provided name.

### app.ts

Update title signal with project name.

### app.spec.ts

Update test expectations with project name.

### project-state.md

Update Application Overview:

- Name, type (Angular 21 SPA), stage (Initialized)
- HomeComponent as initial feature
- Recent changes table with today's date

## Phase 4: Optional Technologies

### Firebase

1. Install: `npm install @angular/fire firebase`
2. Create environment files with empty Firebase config
3. Update app.config.ts with Firebase providers
4. Inform user: Create Firebase project, copy config to environments/

### NgRx Signal Store

1. Install: `npm install @ngrx/signals`
2. Create example store at `services/example.store.ts`
3. Inform user: Usage pattern with `inject(ExampleStore)`

### Storybook

1. Run: `npx storybook@latest init --type angular`
2. Update package.json scripts if needed
3. Inform user: Run `npm run storybook`, create `.stories.ts` files

## Phase 5: Validation

Run:

- `npm run build` - fix TypeScript errors
- `npm run lint` - fix ESLint issues

## Phase 6: Summary

Provide to user:

```
🎉 Project initialization complete!

Project: {name}
Description: {description}

✅ Removed placeholders
✅ Created HomeComponent
✅ Updated package.json, angular.json, app.ts, app.spec.ts
✅ Updated routing and project state
{✅ Technologies set up}

Next Steps:
1. npm start → http://localhost:4200
2. /prp.draft [feature description]

Example: /prp.draft user authentication
         /prp.generate user-authentication
         /prp.execute user-authentication
```

## Execution Checklist

- [ ] Gathered name/description/tech preferences
- [ ] Removed placeholders
- [ ] Created HomeComponent
- [ ] Updated all config files
- [ ] Set up technologies
- [ ] Validated (build + lint)
- [ ] Provided summary

## Notes

- Template-specific: Angular 21 only
- For other stacks: use `/project.align` instead
- Destructive: removes template components
- Run ONCE on fresh clone
- Use documentation agent for all markdown updates
