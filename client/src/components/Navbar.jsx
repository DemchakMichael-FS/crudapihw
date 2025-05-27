import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          📦 Inventory Manager
        </Link>
        <div className="navbar-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add-item" className="nav-link">Add Item</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
