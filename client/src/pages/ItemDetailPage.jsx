import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { itemService } from '../services/api';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await itemService.getItemById(id);
        setItem(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch item details. Please try again later.');
        console.error('Error fetching item details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await itemService.deleteItem(id);
        navigate('/');
      } catch (err) {
        setError('Failed to delete item. Please try again.');
        console.error('Error deleting item:', err);
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading item details...</div>;
  }

  if (error) {
    return (
      <div className="error-page">
        <div className="error-message">{error}</div>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="not-found">
        <h2>Item Not Found</h2>
        <p>The item you're looking for doesn't exist or has been removed.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  // Format the date
  const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="item-detail-page">
      <div className="page-header">
        <h1>{item.name}</h1>
        <div className="item-actions">
          <Link to="/" className="btn btn-secondary">Back to List</Link>
          <Link to={`/edit/${id}`} className="btn btn-edit">Edit</Link>
          <button onClick={handleDelete} className="btn btn-delete">Delete</button>
        </div>
      </div>

      <div className="item-detail-card">
        <div className="item-info">
          <div className="info-group">
            <h3>Description</h3>
            <p>{item.description || 'No description provided.'}</p>
          </div>

          <div className="info-row">
            <div className="info-group">
              <h3>Price</h3>
              <p className="price">${item.price}</p>
            </div>
            
            <div className="info-group">
              <h3>Quantity</h3>
              <p>{item.quantity} units</p>
            </div>
          </div>

          <div className="info-row">
            <div className="info-group">
              <h3>Status</h3>
              <p className={`status ${item.isAvailable ? 'available' : 'unavailable'}`}>
                {item.isAvailable ? 'Available' : 'Out of Stock'}
              </p>
            </div>
            
            <div className="info-group">
              <h3>Added On</h3>
              <p>{formattedDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
