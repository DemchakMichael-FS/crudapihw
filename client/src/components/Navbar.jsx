import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar" style={{ width: '100%' }}>
      <div className="container">
        <Link to="/" className="navbar-brand">
          <span className="brand-text">Inventory Manager</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/add" className="nav-link">Add Item</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
