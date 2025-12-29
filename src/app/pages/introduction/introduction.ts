import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeBlockComponent } from '../../shared/ui';

interface WorkflowStep {
  id: string;
  phase: string;
  title: string;
  description: string;
  command: string;
  icon: string;
}

interface QuickStartStep {
  step: number;
  title: string;
  description: string;
  command?: string;
}

@Component({
  selector: 'app-introduction',
  imports: [CommonModule, CodeBlockComponent],
  templateUrl: './introduction.html',
  styleUrl: './introduction.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroductionComponent {
  // State for collapsible sections (if needed later)
  expandedSections = signal<Set<string>>(new Set(['workflow']));

  // PRP Workflow Steps
  protected readonly workflowSteps: WorkflowStep[] = [
    {
      id: 'draft',
      phase: 'Step 1',
      title: 'Draft',
      description:
        'Create initial feature draft with structured requirements and context references.',
      command: '/prp.draft user dashboard with profile info',
      icon: '📝',
    },
    {
      id: 'generate',
      phase: 'Step 2',
      title: 'Generate',
      description:
        'AI researches codebase, analyzes patterns, and generates complete implementation PRP.',
      command: '/prp.generate user-dashboard',
      icon: '🔍',
    },
    {
      id: 'execute',
      phase: 'Step 3',
      title: 'Execute',
      description:
        'AI implements feature following PRP, validates build/lint, and updates project state.',
      command: '/prp.execute user-dashboard',
      icon: '⚡',
    },
  ];

  // Quick Start Steps
  protected readonly quickStartSteps: QuickStartStep[] = [
    {
      step: 1,
      title: 'Fork and Clone',
      description: 'Fork this repository and clone it to your local machine.',
    },
    {
      step: 2,
      title: 'Install Dependencies',
      description: 'Run npm install to set up your development environment.',
      command: 'npm install',
    },
    {
      step: 3,
      title: 'Initialize Your Project (First Time Only)',
      description:
        'Remove placeholder content and configure your project name. This also allows you to set up optional technologies like Firebase, NgRx Signal Store, or Storybook.',
      command: '/project.init',
    },
    {
      step: 4,
      title: 'OR: Align Existing Project',
      description:
        'If you want to use PRP workflow in an existing Angular project, run this to analyze your codebase and generate aligned context documentation.',
      command: '/project.align',
    },
    {
      step: 5,
      title: 'Start Dev Server',
      description: 'Launch the development server to verify setup.',
      command: 'npm start',
    },
    {
      step: 6,
      title: 'Draft Your First Feature',
      description: 'Use the PRP workflow to create your first feature.',
      command: '/prp.draft your feature description here',
    },
  ];

  toggleSection(sectionId: string): void {
    const sections = new Set(this.expandedSections());
    if (sections.has(sectionId)) {
      sections.delete(sectionId);
    } else {
      sections.add(sectionId);
    }
    this.expandedSections.set(sections);
  }

  isSectionExpanded(sectionId: string): boolean {
    return this.expandedSections().has(sectionId);
  }
}
