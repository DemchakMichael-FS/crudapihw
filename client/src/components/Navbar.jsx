import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Inventory Manager</Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/add-item" className="navbar-item">Add Item</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
