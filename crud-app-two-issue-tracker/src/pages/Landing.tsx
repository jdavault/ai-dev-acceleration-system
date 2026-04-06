import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div
      className="position-relative vh-100 d-flex flex-column text-white"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" />

      {/* Navbar */}
      <nav
        className="d-flex justify-content-between align-items-center px-4 py-3 position-relative"
        style={{ zIndex: 1 }}
      >
        <Link to="/" className="text-white text-decoration-none fs-4 fw-bold">
          Issue Tracker
        </Link>
        <div className="d-flex gap-3">
          <Link to="/" className="text-white text-decoration-none">
            Home
          </Link>
          <Link to="/issues" className="text-white text-decoration-none">
            Issues
          </Link>
        </div>
      </nav>

      {/* Hero content */}
      <div
        className="flex-grow-1 d-flex flex-column justify-content-center align-items-center position-relative"
        style={{ zIndex: 1 }}
      >
        <h1 className="display-1 fw-bold text-center mb-3">
          Track Every Issue
        </h1>
        <p className="fs-4 text-center mb-4" style={{ maxWidth: '600px' }}>
          Create, manage, and resolve issues — stay on top of your project with
          a simple, powerful tracker.
        </p>
        <div className="d-flex gap-3">
          <Link to="/issues" className="btn btn-light btn-lg fw-semibold">
            View Issues
          </Link>
          <Link
            to="/create"
            className="btn btn-outline-light btn-lg fw-semibold"
          >
            New Issue
          </Link>
        </div>
      </div>
    </div>
  );
}
