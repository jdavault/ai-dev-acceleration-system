import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUsers } from '../hooks/useUsers';
import ConfirmModal from '../components/ConfirmModal';
import Pagination from '../components/Pagination';

export default function Home() {
  const { users, removeUser } = useUsers();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search),
  );

  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
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
    <div className="d-flex flex-column align-items-center bg-light min-vh-100 text-start py-4">
      <h1>List of users</h1>
      <div
        className="rounded bg-white border shadow p-4"
        style={{ minHeight: '620px', width: '95%', maxWidth: '1200px' }}
      >
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
          <Link to="/create" className="btn btn-success">
            Add +
          </Link>
        </div>
        <table className="table table-striped text-nowrap">
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
            {paginatedUsers.map((user, index) => (
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
        {filteredUsers.length > 0 && (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={filteredUsers.length}
            pageSizeOptions={[5, 10, 20, 50]}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(size) => {
              setPage(1);
              setPageSize(size);
            }}
          />
        )}
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
