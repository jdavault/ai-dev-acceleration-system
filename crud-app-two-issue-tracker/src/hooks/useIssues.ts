import { useEffect, useState } from 'react';
import type { Issue, IssueStatus } from '../types/issue';
import * as issueApi from '../api/issueApi';

export function useIssues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await issueApi.getIssues();
        setIssues(data);
      } catch (error) {
        console.error('Error fetching issues:', error);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const removeIssue = async (id: number) => {
    try {
      await issueApi.deleteIssue(id);
      setIssues((prev) => prev.filter((issue) => issue.id !== id));
    } catch (error) {
      console.error('Error deleting issue:', error);
    }
  };

  const changeStatus = async (id: number, status: IssueStatus) => {
    try {
      const issue = issues.find((i) => i.id === id);
      if (!issue) return;
      const updated = await issueApi.updateIssue(String(id), { ...issue, status });
      setIssues((prev) => prev.map((i) => (i.id === id ? updated : i)));
    } catch (error) {
      console.error('Error updating issue status:', error);
    }
  };

  return { issues, loading, removeIssue, changeStatus };
}

export function useIssue(id: string | undefined) {
  const [issue, setIssue] = useState<Issue | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        const data = await issueApi.getIssue(id);
        setIssue(data);
      } catch (error) {
        console.error('Error fetching issue:', error);
      }
    };
    fetch();
  }, [id]);

  return { issue, setIssue };
}

export function useCreateIssue() {
  const create = async (issue: Issue) => {
    await issueApi.createIssue(issue);
  };
  return { create };
}

export function useUpdateIssue() {
  const update = async (id: string, issue: Issue) => {
    await issueApi.updateIssue(id, issue);
  };
  return { update };
}
