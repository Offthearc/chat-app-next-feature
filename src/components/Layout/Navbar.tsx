import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        💬 ChatApp
      </Link>
      <div className="navbar-actions">
        {currentUser ? (
          <>
            <span className="navbar-user">{currentUser.displayName ?? currentUser.email}</span>
            <button onClick={handleLogout} className="btn btn-secondary btn-sm">
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-secondary btn-sm">
              Sign in
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
