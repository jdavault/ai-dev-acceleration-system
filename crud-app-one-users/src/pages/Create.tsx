import { type SubmitEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/user';
import UserForm from '../components/UserForm';
import { useCreateUser } from '../hooks/useUsers';

export default function Create() {
  const navigate = useNavigate();
  const { create } = useCreateUser();
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
  });

  const handleCreate = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await create(user);
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 text-start">
      <div className="w-50 border bg-white shadow px-5 pb-5 rounded">
        <h1 className="my-4">Add a User</h1>
        <UserForm
          user={user}
          onChange={setUser}
          onSubmit={handleCreate}
          submitLabel="Submit"
        />
      </div>
    </div>
  );
}
