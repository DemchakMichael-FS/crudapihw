import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { itemService } from '../services/api';
import './HomePage.css';

function HomePage({ refreshTrigger }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await itemService.getAllItems();
        setItems(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch items. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.deleteItem(id);
        setItems(items.filter(item => item._id !== id));
      } catch (err) {
        setError('Failed to delete item. Please try again.');
        console.error(err);
      }
    }
  };

  return (
    <div className="home-page">
      <div className="page-header">
        <h1>Item Inventory</h1>
        <Link to="/add-item" className="btn btn-primary">Add New Item</Link>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading">Loading items...</div>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p>No items found. Add your first item to get started!</p>
        </div>
      ) : (
        <div className="item-grid">
          {items.map(item => (
            <div key={item._id} className="item-card">
              <div className="item-header">
                <h2>{item.name}</h2>
                <span className="category">{item.category}</span>
              </div>
              <p className="description">{item.description}</p>
              <div className="item-details">
                <span className="quantity">Quantity: {item.quantity}</span>
                <span className="price">${item.price.toFixed(2)}</span>
              </div>
              <div className="item-actions">
                <Link to={`/items/${item._id}`} className="btn btn-secondary">View</Link>
                <Link to={`/edit-item/${item._id}`} className="btn btn-secondary">Edit</Link>
                <button onClick={() => handleDelete(item._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;
