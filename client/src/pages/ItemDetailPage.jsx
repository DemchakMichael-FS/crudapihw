import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { itemService } from '../services/api';

function ItemDetailPage({ refreshItems }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const data = await itemService.getItemById(id);
      setItem(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch item details. Please try again.');
      console.error('Error fetching item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setDeleting(true);
      await itemService.deleteItem(id);
      refreshItems();
      navigate('/');
    } catch (err) {
      setError('Failed to delete item. Please try again.');
      console.error('Error deleting item:', err);
    } finally {
      setDeleting(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading item details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={fetchItem} className="btn btn-primary">
              Try Again
            </button>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="error-container">
        <div className="error-message">
          <h2>Item Not Found</h2>
          <p>The item you're looking for doesn't exist.</p>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="item-detail-page">
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Back to Items
        </Link>
        <div className="page-actions">
          <Link to={`/edit-item/${item._id}`} className="btn btn-secondary">
            Edit Item
          </Link>
          <button 
            onClick={handleDelete} 
            className="btn btn-danger"
            disabled={deleting}
          >
            {deleting ? 'Deleting...' : 'Delete Item'}
          </button>
        </div>
      </div>

      <div className="item-detail-card">
        <div className="item-header">
          <h1 className="item-title">{item.name}</h1>
          <span className="item-category-badge">{item.category}</span>
        </div>

        <div className="item-content">
          <div className="item-description">
            <h3>Description</h3>
            <p>{item.description}</p>
          </div>

          <div className="item-details-grid">
            <div className="detail-item">
              <h4>Quantity</h4>
              <p className="detail-value">{item.quantity}</p>
            </div>

            <div className="detail-item">
              <h4>Price</h4>
              <p className="detail-value price">{formatPrice(item.price)}</p>
            </div>

            <div className="detail-item">
              <h4>Total Value</h4>
              <p className="detail-value total-value">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>

            <div className="detail-item">
              <h4>Date Added</h4>
              <p className="detail-value">{formatDate(item.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailPage;
