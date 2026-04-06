export type IssueStatus = 'open' | 'in-progress' | 'completed';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
  id?: number;
  title: string;
  description: string;
  priority: IssuePriority;
  status: IssueStatus;
  createdAt: string;
}
