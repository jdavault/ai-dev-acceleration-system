import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand navbar-light px-4"
      style={{ backgroundColor: '#e9ecef' }}
    >
      <Link to="/" className="navbar-brand fw-bold text-dark">
        Issue Tracker
      </Link>
      <div className="navbar-nav ms-auto">
        <Link to="/" className="nav-link text-dark">
          Home
        </Link>
        <Link to="/issues" className="nav-link text-dark">
          Issues
        </Link>
      </div>
    </nav>
  );
}
