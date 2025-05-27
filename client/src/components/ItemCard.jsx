import { Link } from 'react-router-dom';

function ItemCard({ item }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="item-card">
      <div className="item-card-header">
        <h3 className="item-name">{item.name}</h3>
        <span className="item-category">{item.category}</span>
      </div>
      
      <div className="item-card-body">
        <p className="item-description">{item.description}</p>
        
        <div className="item-details">
          <div className="item-detail">
            <span className="detail-label">Quantity:</span>
            <span className="detail-value">{item.quantity}</span>
          </div>
          <div className="item-detail">
            <span className="detail-label">Price:</span>
            <span className="detail-value">{formatPrice(item.price)}</span>
          </div>
          <div className="item-detail">
            <span className="detail-label">Added:</span>
            <span className="detail-value">{formatDate(item.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="item-card-footer">
        <Link to={`/items/${item._id}`} className="btn btn-primary">
          View Details
        </Link>
        <Link to={`/edit-item/${item._id}`} className="btn btn-secondary">
          Edit
        </Link>
      </div>
    </div>
  );
}

export default ItemCard;
