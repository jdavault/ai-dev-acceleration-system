import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useIssues } from '../hooks/useIssues';
import { STATUS_BADGE, STATUS_LABEL, PRIORITY_BADGE, PRIORITY_LABEL } from '../constants/issueLabels';
import ConfirmModal from '../components/ConfirmModal';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';

export default function Home() {
  const { issues, loading, removeIssue, changeStatus } = useIssues();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const filteredIssues = issues.filter((issue) => {
    const matchesSearch =
      issue.title.toLowerCase().includes(search.toLowerCase()) ||
      issue.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || issue.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const paginatedIssues = filteredIssues.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const confirmDelete = async () => {
    if (deleteId !== null) {
      await removeIssue(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex flex-column align-items-center min-vh-100 text-start py-4"
        style={{ backgroundColor: '#f2f4f6' }}
      >
        <h1>Issues</h1>
        <div
          className="rounded bg-white p-4"
          style={{ minHeight: '620px', width: '95%', maxWidth: '1200px' }}
        >
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="d-flex justify-content-between mb-3 gap-2">
                <input
                  type="text"
                  className="form-control"
                  style={{ maxWidth: '350px' }}
                  placeholder="Search issues..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                />
                <select
                  className="form-select"
                  style={{ width: 'auto' }}
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(1);
                  }}
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <Link to="/create" className="btn btn-success text-nowrap">
                  New Issue +
                </Link>
              </div>
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedIssues.map((issue) => (
                    <tr key={issue.id}>
                      <td>{issue.id}</td>
                      <td>{issue.title}</td>
                      <td>
                        <span className={PRIORITY_BADGE[issue.priority]}>
                          {PRIORITY_LABEL[issue.priority]}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${STATUS_BADGE[issue.status]}`}
                        >
                          {STATUS_LABEL[issue.status]}
                        </span>
                      </td>
                      <td className="text-nowrap">
                        {new Date(issue.createdAt).toLocaleDateString()}
                      </td>
                      <td className="text-nowrap">
                        <Link
                          to={`/read/${issue.id}`}
                          className="btn btn-sm btn-info me-1"
                        >
                          View
                        </Link>
                        {issue.status !== 'in-progress' && (
                          <button
                            onClick={() =>
                              issue.id !== undefined &&
                              changeStatus(issue.id, 'in-progress')
                            }
                            className="btn btn-sm btn-primary me-1"
                          >
                            Start
                          </button>
                        )}
                        {issue.status !== 'completed' && (
                          <button
                            onClick={() =>
                              issue.id !== undefined &&
                              changeStatus(issue.id, 'completed')
                            }
                            className="btn btn-sm btn-success me-1"
                          >
                            Complete
                          </button>
                        )}
                        <Link
                          to={`/update/${issue.id}`}
                          className="btn btn-sm btn-warning me-1"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() =>
                            issue.id !== undefined && setDeleteId(issue.id)
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
              {filteredIssues.length > 0 && (
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  total={filteredIssues.length}
                  pageSizeOptions={[5, 10, 20, 50]}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(size) => {
                    setPage(1);
                    setPageSize(size);
                  }}
                />
              )}
            </>
          )}
        </div>
        <ConfirmModal
          show={deleteId !== null}
          message="Are you sure you want to delete this issue?"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteId(null)}
        />
      </div>
    </>
  );
}
