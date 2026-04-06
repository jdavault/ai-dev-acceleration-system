import { Link, useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUsers';

export default function Read() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser(id);

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 text-start">
      <div className="w-50 border bg-white shadow px-5 pb-5 rounded">
        <h3 className="my-4">User Details</h3>
        <div className="mb-2">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="mb-2">
          <strong>Email:</strong> {user.email}
        </div>
        <div className="mb-3">
          <strong>Phone:</strong> {user.phone}
        </div>
        <Link to={`/update/${user.id}`} className="btn btn-success">
          Edit
        </Link>
        <Link to="/" className="btn btn-primary ms-2">
          Back
        </Link>
      </div>
    </div>
  );
}
