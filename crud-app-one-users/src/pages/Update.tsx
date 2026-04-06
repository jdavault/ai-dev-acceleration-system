import { type SubmitEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { useUser, useUpdateUser } from '../hooks/useUsers';

export default function Update() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, setUser } = useUser(id);
  const { update } = useUpdateUser();

  const handleUpdate = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id || !user) return;
    try {
      await update(id, user);
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

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
        <h1 className="my-4">Update User</h1>
        <UserForm
          user={user}
          onChange={setUser}
          onSubmit={handleUpdate}
          submitLabel="Update"
        />
      </div>
    </div>
  );
}
