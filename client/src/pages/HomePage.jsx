import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itemService } from '../services/api';

const HomePage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await itemService.getAllItems();
        setItems(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.deleteItem(id);
        setItems(items.filter(item => item._id !== id));
      } catch (err) {
        setError('Failed to delete item. Please try again.');
        console.error('Error deleting item:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading items...</div>;
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1>Item Inventory</h1>
          <Link to="/add" className="btn btn-primary">Add New Item</Link>
        </div>

        {error && <div className="error-message">{error}</div>}

        {items.length === 0 ? (
          <div className="empty-state">
            <p>No items found. Add your first item to get started!</p>
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <div key={item._id} className="item-card">
                <h3>{item.name}</h3>
                <p className="description">{item.description}</p>
                <div className="item-details">
                  <p><strong>Price:</strong> ${item.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Status:</strong> {item.isAvailable ? 'Available' : 'Out of Stock'}</p>
                </div>
                <div className="item-actions">
                  <Link to={`/edit/${item._id}`} className="btn btn-edit">Edit</Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-delete"
                  >
                    Delete
                  </button>
                  <Link to={`/details/${item._id}`} className="btn btn-view">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
