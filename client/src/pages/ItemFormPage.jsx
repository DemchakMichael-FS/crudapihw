import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { itemService } from '../services/api';

function ItemFormPage({ refreshItems }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    price: '',
    category: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      fetchItem();
    }
  }, [id, isEditing]);

  const fetchItem = async () => {
    try {
      setLoading(true);
      const item = await itemService.getItemById(id);
      setFormData({
        name: item.name,
        description: item.description,
        quantity: item.quantity.toString(),
        price: item.price.toString(),
        category: item.category
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch item details. Please try again.');
      console.error('Error fetching item:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }

    if (!formData.quantity.trim()) {
      errors.quantity = 'Quantity is required';
    } else if (isNaN(formData.quantity) || parseInt(formData.quantity) < 0) {
      errors.quantity = 'Quantity must be a non-negative number';
    }

    if (!formData.price.trim()) {
      errors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      errors.price = 'Price must be a non-negative number';
    }

    if (!formData.category.trim()) {
      errors.category = 'Category is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const itemData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        quantity: parseInt(formData.quantity),
        price: parseFloat(formData.price),
        category: formData.category.trim()
      };

      if (isEditing) {
        await itemService.updateItem(id, itemData);
      } else {
        await itemService.createItem(itemData);
      }

      refreshItems();
      navigate('/');
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} item. Please try again.`);
      console.error(`Error ${isEditing ? 'updating' : 'creating'} item:`, err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading item details...</p>
      </div>
    );
  }

  return (
    <div className="item-form-page">
      <div className="page-header">
        <Link to="/" className="back-link">
          ← Back to Items
        </Link>
        <h1>{isEditing ? 'Edit Item' : 'Add New Item'}</h1>
      </div>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      <div className="form-container">
        <form onSubmit={handleSubmit} className="item-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={validationErrors.name ? 'error' : ''}
              placeholder="Enter item name"
            />
            {validationErrors.name && (
              <span className="error-text">{validationErrors.name}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={validationErrors.description ? 'error' : ''}
              placeholder="Enter item description"
              rows="4"
            />
            {validationErrors.description && (
              <span className="error-text">{validationErrors.description}</span>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className={validationErrors.quantity ? 'error' : ''}
                placeholder="0"
                min="0"
              />
              {validationErrors.quantity && (
                <span className="error-text">{validationErrors.quantity}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="price">Price *</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={validationErrors.price ? 'error' : ''}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
              {validationErrors.price && (
                <span className="error-text">{validationErrors.price}</span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={validationErrors.category ? 'error' : ''}
              placeholder="Enter item category"
            />
            {validationErrors.category && (
              <span className="error-text">{validationErrors.category}</span>
            )}
          </div>

          <div className="form-actions">
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEditing ? 'Update Item' : 'Create Item')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ItemFormPage;
