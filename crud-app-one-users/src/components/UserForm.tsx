import { type SubmitEventHandler } from 'react';
import { Link } from 'react-router-dom';
import type { User } from '../types/user';

interface UserFormProps {
  user: User;
  onChange: (user: User) => void;
  onSubmit: SubmitEventHandler<HTMLFormElement>;
  submitLabel: string;
}

export default function UserForm({
  user,
  onChange,
  onSubmit,
  submitLabel,
}: UserFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-2">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter Name"
          value={user.name}
          onChange={(e) => onChange({ ...user, name: e.target.value })}
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="Enter Email"
          value={user.email}
          onChange={(e) => onChange({ ...user, email: e.target.value })}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="text"
          className="form-control"
          id="phone"
          placeholder="Enter Phone"
          value={user.phone}
          onChange={(e) => onChange({ ...user, phone: e.target.value })}
        />
      </div>
      <button type="submit" className="btn btn-success">
        {submitLabel}
      </button>
      <Link to="/" className="btn btn-primary ms-3">
        Back
      </Link>
    </form>
  );
}
