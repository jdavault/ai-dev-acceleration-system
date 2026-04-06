import { type SubmitEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Issue } from '../types/issue';
import IssueForm from '../components/IssueForm';
import { useCreateIssue } from '../hooks/useIssues';

export default function Create() {
  const navigate = useNavigate();
  const { create } = useCreateIssue();
  const [issue, setIssue] = useState<Issue>({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    createdAt: new Date().toISOString(),
  });

  const handleCreate = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await create({ ...issue, createdAt: new Date().toISOString() });
      navigate('/issues');
    } catch (error) {
      console.error('Error creating issue:', error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 text-start">
      <div className="w-50 border bg-white shadow px-5 pb-5 rounded">
        <h1 className="my-4">Create Issue</h1>
        <IssueForm
          issue={issue}
          onChange={setIssue}
          onSubmit={handleCreate}
          submitLabel="Create"
        />
      </div>
    </div>
  );
}
