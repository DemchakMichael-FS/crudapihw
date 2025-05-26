import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { itemService } from '../services/api';
import './ItemDetailPage.css';

function ItemDetailPage({ refreshItems }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const data = await itemService.getItemById(id);
        setItem(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch item details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.deleteItem(id);
        refreshItems();
        navigate('/');
      } catch (err) {
        setError('Failed to delete item. Please try again.');
        console.error(err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading item details...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="alert alert-error">{error}</div>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="error-container">
        <div className="alert alert-error">Item not found.</div>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="item-detail-page">
      <div className="page-header">
        <h1>{item.name}</h1>
        <div className="item-actions">
          <Link to="/" className="btn btn-secondary">Back</Link>
          <Link to={`/edit-item/${id}`} className="btn btn-primary">Edit</Link>
          <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        </div>
      </div>

      <div className="item-detail-card">
        <div className="item-category">
          <span className="label">Category:</span>
          <span className="category">{item.category}</span>
        </div>

        <div className="item-section">
          <h2>Description</h2>
          <p>{item.description}</p>
        </div>

        <div className="item-info">
          <div className="info-item">
            <span className="label">Quantity:</span>
            <span className="value">{item.quantity}</span>
          </div>
          <div className="info-item">
            <span className="label">Price:</span>
            <span className="value price">${item.price.toFixed(2)}</span>
          </div>
          <div className="info-item">
            <span className="label">Added on:</span>
            <span className="value">{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;
