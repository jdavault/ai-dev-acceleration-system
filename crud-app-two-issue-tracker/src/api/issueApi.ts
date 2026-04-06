import axios from 'axios';
import type { Issue } from '../types/issue';

const BASE_URL = 'http://localhost:3001/api/issues';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getIssues(): Promise<Issue[]> {
  await delay(1500);
  const response = await axios.get<Issue[]>(BASE_URL);
  return response.data;
}

export async function getIssue(id: string): Promise<Issue> {
  const response = await axios.get<Issue>(`${BASE_URL}/${id}`);
  return response.data;
}

export async function createIssue(issue: Issue): Promise<Issue> {
  const response = await axios.post<Issue>(BASE_URL, issue);
  return response.data;
}

export async function updateIssue(id: string, issue: Issue): Promise<Issue> {
  const response = await axios.put<Issue>(`${BASE_URL}/${id}`, issue);
  return response.data;
}

export async function deleteIssue(id: number): Promise<void> {
  await axios.delete(`${BASE_URL}/${id}`);
}
