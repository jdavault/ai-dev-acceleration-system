import { Link, useParams } from 'react-router-dom';
import { useIssue } from '../hooks/useIssues';

const STATUS_BADGE: Record<string, string> = {
  open: 'bg-warning text-dark',
  'in-progress': 'bg-primary',
  completed: 'bg-success',
};

export default function Read() {
  const { id } = useParams<{ id: string }>();
  const { issue } = useIssue(id);

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
        <h3 className="my-4">Issue Details</h3>
        <div className="mb-2">
          <strong>Title:</strong> {issue.title}
        </div>
        <div className="mb-2">
          <strong>Description:</strong> {issue.description}
        </div>
        <div className="mb-2">
          <strong>Priority:</strong>{' '}
          {issue.priority.charAt(0).toUpperCase() + issue.priority.slice(1)}
        </div>
        <div className="mb-2">
          <strong>Status:</strong>{' '}
          <span className={`badge ${STATUS_BADGE[issue.status]}`}>
            {issue.status === 'in-progress'
              ? 'In Progress'
              : issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
          </span>
        </div>
        <div className="mb-3">
          <strong>Created:</strong>{' '}
          {new Date(issue.createdAt).toLocaleString()}
        </div>
        <Link to={`/update/${issue.id}`} className="btn btn-success">
          Edit
        </Link>
        <Link to="/issues" className="btn btn-primary ms-2">
          Back
        </Link>
      </div>
    </div>
  );
}
