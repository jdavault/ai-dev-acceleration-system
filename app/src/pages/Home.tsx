import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(
          'http://localhost:3001/api/users',
        );
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 ">
      <h1>List of users</h1>
      <div className="w-75 rounded bg-white border shadow p-4">
        <ul className="list-group">
          {users.map((user) => (
            <li key={user.id} className="list-group-item">
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
