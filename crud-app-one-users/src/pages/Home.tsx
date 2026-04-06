import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import ConfirmModal from '../components/ConfirmModal';

export default function Home() {
  const { users, removeUser } = useUsers();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search),
  );

  const handleDelete = (id: number) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      await removeUser(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center bg-light vh-100 text-start">
      <h1>List of users</h1>
      <div
        className="w-75 rounded bg-white border shadow p-4 d-flex flex-column overflow-hidden"
        style={{ maxHeight: '80vh' }}
      >
        <div className="d-flex justify-content-between mb-3 flex-shrink-0">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
        </div>
        <div className="overflow-auto">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td className="text-nowrap">
                    <Link
                      to={`/read/${user.id}`}
                      className="btn btn-sm btn-info me-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/update/${user.id}`}
                      className="btn btn-sm btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() =>
                        user.id !== undefined && handleDelete(user.id)
                      }
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmModal
        show={deleteId !== null}
        message="Are you sure you want to delete this user?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
