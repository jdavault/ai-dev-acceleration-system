import { type SubmitEventHandler } from 'react';
import { Link } from 'react-router-dom';
import type { Issue } from '../types/issue';

interface IssueFormProps {
  issue: Issue;
  onChange: (issue: Issue) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  submitLabel: string;
}

export default function IssueForm({
  issue,
  onChange,
  onSubmit,
  submitLabel,
}: IssueFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          placeholder="Enter issue title"
          required
          value={issue.title}
          onChange={(e) => onChange({ ...issue, title: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows={3}
          placeholder="Describe the issue"
          value={issue.description}
          onChange={(e) => onChange({ ...issue, description: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="priority" className="form-label">
          Priority
        </label>
        <select
          className="form-select"
          id="priority"
          value={issue.priority}
          onChange={(e) =>
            onChange({ ...issue, priority: e.target.value as Issue['priority'] })
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="status" className="form-label">
          Status
        </label>
        <select
          className="form-select"
          id="status"
          value={issue.status}
          onChange={(e) =>
            onChange({ ...issue, status: e.target.value as Issue['status'] })
          }
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <button type="submit" className="btn btn-success">
        {submitLabel}
      </button>
      <Link to="/issues" className="btn btn-primary ms-3">
        Back
      </Link>
    </form>
  );
}
