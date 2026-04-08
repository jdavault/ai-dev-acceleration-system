import type { IssuePriority, IssueStatus } from '../types/issue';

export const STATUS_BADGE: Record<IssueStatus, string> = {
  open: 'bg-warning text-dark',
  'in-progress': 'bg-primary',
  completed: 'bg-success',
};

export const STATUS_LABEL: Record<IssueStatus, string> = {
  open: 'Open',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const PRIORITY_BADGE: Record<IssuePriority, string> = {
  high: 'text-danger fw-bold',
  medium: 'text-warning fw-semibold',
  low: 'text-muted',
};

export const PRIORITY_LABEL: Record<IssuePriority, string> = {
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
