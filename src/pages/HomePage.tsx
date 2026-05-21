import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function HomePage() {
  const { currentUser } = useAuth();

  return (
    <main className="home-page">
      <div className="hero">
        <h1>Real-time Chat</h1>
        <p className="hero-subtitle">Connect and chat with anyone, instantly.</p>
        {currentUser ? (
          <Link to="/chat" className="btn btn-primary btn-lg">
            Open Chat
          </Link>
        ) : (
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get started
            </Link>
            <Link to="/login" className="btn btn-secondary btn-lg">
              Sign in
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
