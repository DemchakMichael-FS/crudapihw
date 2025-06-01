import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          📦 Inventory Manager
        </Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          {isAuthenticated && (
            <Link to="/add-item" className="nav-link">Add Item</Link>
          )}
          {isAuthenticated ? (
            <div className="auth-nav">
              <span className="user-welcome">Welcome, {user?.username}!</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-nav">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
