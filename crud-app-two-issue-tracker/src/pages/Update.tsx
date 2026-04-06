import { type SubmitEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IssueForm from '../components/IssueForm';
import { useIssue, useUpdateIssue } from '../hooks/useIssues';

export default function Update() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { issue, setIssue } = useIssue(id);
  const { update } = useUpdateIssue();

  const handleUpdate = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !issue) return;
    try {
      await update(id, issue);
      navigate('/issues');
    } catch (error) {
      console.error('Error updating issue:', error);
    }
  };

  if (!issue) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 text-start">
      <div className="w-50 border bg-white shadow px-5 pb-5 rounded">
        <h1 className="my-4">Update Issue</h1>
        <IssueForm
          issue={issue}
          onChange={setIssue}
          onSubmit={handleUpdate}
          submitLabel="Update"
        />
      </div>
    </div>
  );
}
