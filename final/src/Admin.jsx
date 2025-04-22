import { useState, useEffect } from 'react';
import { fetchMenuItems, updateMenuItem, createMenuItem, deleteMenuItem } from './services';
import Loading from './Loading'; 
import Error from './Error';
import './Admin.css';
import { getImageUrl } from "./utils";
import { ERROR_MESSAGES, UI, CONFIG } from './constants';

function Admin() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(UI.CATEGORIES.ALL);
  const [categories, setCategories] = useState([]);
  const [updateMessage, setUpdateMessage] = useState('');
  const [messageType, setMessageType] = useState('success');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: CONFIG.DEFAULT_IMAGE, 
    available: true
  });

  useEffect(() => {
    loadMenuItems();
  }, []);

  const loadMenuItems = () => {
    setLoading(true);
    
    fetchMenuItems()
      .then(response => {
        if (!response.ok) {
          throw new Error(ERROR_MESSAGES.MENU.FETCH_FAILED);
        }
        return response.json();
      })
      .then(menuItemsData => {
        setMenuItems(menuItemsData);
        
        const uniqueCategories = [];
        menuItemsData.forEach(item => {
          if (item.category && !uniqueCategories.includes(item.category)) {
            uniqueCategories.push(item.category);
          }
        });
        
        setCategories(uniqueCategories);
      })
      .catch(err => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const validateForm = (item) => {
    const errors = {};
    
    if (!item.name || item.name.trim() === '') {
      errors.name = 'Name is required';
    }
    
    if (item.description && item.description.trim() !== '' && item.description.length < 20) {
      errors.description = 'Description must be at least 20 characters long if provided';
    }
    
    if (!item.price || item.price.trim() === '') {
      errors.price = 'Price is required';
    } else if (isNaN(parseFloat(item.price))) {
      errors.price = 'Price must be a number';
    } else if (parseFloat(item.price) <= 0) {
      errors.price = 'Price must be greater than zero';
    } else if (parseFloat(item.price) > 100) {
      errors.price = 'Price cannot exceed $100';
    }
    
    if (!item.category || item.category.trim() === '') {
      errors.category = 'Category is required';
    }
    
    if (item.image && item.image !== CONFIG.DEFAULT_IMAGE) {
      const validExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
      const hasValidExtension = validExtensions.some(ext => 
        item.image.toLowerCase().endsWith(ext)
      );
      
      if (!hasValidExtension) {
        errors.image = 'Image must have a valid image extension (.jpg, .jpeg, .png, .gif)';
      }
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  };

  const handleAvailabilityChange = (itemId, isAvailable) => {
    updateMenuItem(itemId, { available: isAvailable })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorText => {
            throw new Error(ERROR_MESSAGES.MENU.UPDATE_FAILED);
          });
        }
        
        setMenuItems(prevItems => 
          prevItems.map(item => 
            item.id === itemId ? { ...item, available: isAvailable } : item
          )
        );
        
        showMessage(UI.MESSAGES.ADMIN_ITEM_UPDATE, 'success');
      })
      .catch(err => {
        showMessage(err.message, 'error');
      });
  };

  const handlePriceChange = (itemId, newPrice) => {
    const price = parseFloat(newPrice);
    if (isNaN(price) || price <= 0) {
      showMessage(ERROR_MESSAGES.MENU.INVALID_PRICE, 'error');
      
      const originalItem = menuItems.find(item => item.id === itemId);
      if (originalItem) {
        setMenuItems(prevItems => 
          prevItems.map(item => 
            item.id === itemId ? { ...item, price: originalItem.price } : item
          )
        );
      }
      return;
    }

    updateMenuItem(itemId, { price })
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorText => {
            throw new Error(ERROR_MESSAGES.MENU.UPDATE_FAILED);
          });
        }
        
        setMenuItems(prevItems => 
          prevItems.map(item => 
            item.id === itemId ? { ...item, price } : item
          )
        );
        
        showMessage(UI.MESSAGES.ADMIN_ITEM_UPDATE, 'success');
      })
      .catch(err => {
        showMessage(err.message, 'error');
      });
  };
  
  const confirmDeleteItem = (itemId) => {
    setItemToDelete(itemId);
    setShowDeleteConfirm(true);
  };
  
  const cancelDelete = () => {
    setItemToDelete(null);
    setShowDeleteConfirm(false);
  };
  
  const handleDeleteItem = (itemId) => {
    deleteMenuItem(itemId)
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorText => {
            throw new Error(ERROR_MESSAGES.MENU.DELETE_FAILED);
          });
        }
        
        setMenuItems(prevItems => prevItems.filter(item => item.id !== itemId));
        
        showMessage(UI.MESSAGES.ADMIN_ITEM_DELETE, 'success');
      })
      .catch(err => {
        showMessage(err.message, 'error');
      })
      .finally(() => {
        setShowDeleteConfirm(false);
        setItemToDelete(null);
      });
  };
  
  const handleNewItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewItem(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  const handleAddItem = (e) => {
    e.preventDefault();
    
    setFormErrors({});
    
    const validation = validateForm(newItem);
    
    if (!validation.valid) {
      setFormErrors(validation.errors);
      return;
    }
    
    const price = parseFloat(newItem.price);
    
    const itemToAdd = {
      ...newItem,
      price: price 
    };
    
    createMenuItem(itemToAdd)
      .then(response => {
        if (!response.ok) {
          return response.text().then(errorText => {
            throw new Error(ERROR_MESSAGES.MENU.CREATE_FAILED);
          });
        }
        return response.json();
      })
      .then(newItemData => {
        setMenuItems(prev => [...prev, newItemData]);
        
        setNewItem({
          name: '',
          description: '',
          price: '',
          category: '',
          image: CONFIG.DEFAULT_IMAGE,
          available: true
        });
        
        setShowAddForm(false);
        showMessage(UI.MESSAGES.ADMIN_ITEM_CREATE, 'success');
        
        if (!categories.includes(newItemData.category)) {
          setCategories(prev => [...prev, newItemData.category]);
        }
      })
      .catch(err => {
        showMessage(err.message, 'error');
      });
  };
  
  const showMessage = (message, type) => {
    setUpdateMessage(message);
    setMessageType(type);
    
    if (type === 'success') {
      setTimeout(() => setUpdateMessage(''), 3000);
    }
  };

  const handleImageError = (item) => {
    setMenuItems(prevItems => 
      prevItems.map(menuItem => 
        menuItem.id === item.id 
          ? { ...menuItem, image: CONFIG.DEFAULT_IMAGE } 
          : menuItem
      )
    );
  };

  const filteredItems = selectedCategory === UI.CATEGORIES.ALL 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return <Loading message={UI.LOADING.MENU || 'Loading menu items...'} />;
  }
  
  if (error) {
    return <Error message={error} onClose={() => setError(null)} />;
  }

  return (
    <div className="restaurant-admin-container">
      <div className="restaurant-admin-heading">Menu Management</div>
      
      {updateMessage && (
        <div className={`restaurant-update-message ${messageType}`}>
          <p className="restaurant-update-message-text">{updateMessage}</p>
          {messageType === 'error' && (
            <button 
              className="restaurant-update-message-close" 
              onClick={() => setUpdateMessage('')}
              aria-label="Close message"
            >
              ×
            </button>
          )}
        </div>
      )}
      
      {showDeleteConfirm && (
        <div className="restaurant-delete-confirm-overlay">
          <div className="restaurant-delete-confirm-dialog">
            <div className="restaurant-delete-confirm-title">Confirm Delete</div>
            <p>Are you sure you want to delete this item?</p>
            <div className="restaurant-dialog-buttons">
              <button 
                className="restaurant-cancel-btn" 
                onClick={cancelDelete}
              >
                Cancel
              </button>
              <button 
                className="restaurant-delete-btn" 
                onClick={() => handleDeleteItem(itemToDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="restaurant-admin-controls">
        <div className="restaurant-category-filter">
          <label htmlFor="category-select">Filter by category:</label>
          <select 
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value={UI.CATEGORIES.ALL}>All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <button 
          className="restaurant-add-item-btn"
          onClick={() => {
            setShowAddForm(!showAddForm);
            if (!showAddForm) {
              setFormErrors({});
            }
          }}
        >
          {showAddForm ? 'Cancel' : 'Add New Item'}
        </button>
      </div>
      
      {showAddForm && (
        <form className="restaurant-add-item-form" onSubmit={handleAddItem}>
          <div className="restaurant-add-item-form-title">Add New Menu Item</div>
          
          <div className="restaurant-form-group">
            <label htmlFor="name" className="restaurant-form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="restaurant-form-input"
              value={newItem.name}
              onChange={handleNewItemChange}
            />
            {formErrors.name && (
              <p className="restaurant-form-error">{formErrors.name}</p>
            )}
          </div>
          
          <div className="restaurant-form-group">
            <label htmlFor="description" className="restaurant-form-label">Description:</label>
            <textarea
              id="description"
              name="description"
              className="restaurant-form-textarea"
              value={newItem.description}
              onChange={handleNewItemChange}
            />
            {formErrors.description && (
              <p className="restaurant-form-error">{formErrors.description}</p>
            )}
          </div>
          
          <div className="restaurant-form-row">
            <div className="restaurant-form-group">
              <label htmlFor="price" className="restaurant-form-label">Price ($):</label>
              <input
                type="text"
                id="price"
                name="price"
                className="restaurant-form-input"
                value={newItem.price}
                onChange={handleNewItemChange}
              />
              {formErrors.price && (
                <p className="restaurant-form-error">{formErrors.price}</p>
              )}
            </div>
            
            <div className="restaurant-form-group">
              <label htmlFor="category" className="restaurant-form-label">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                list="existing-categories"
                className="restaurant-form-input"
                value={newItem.category}
                onChange={handleNewItemChange}
              />
              <datalist id="existing-categories">
                {categories.map(category => (
                  <option key={category} value={category} />
                ))}
              </datalist>
              {formErrors.category && (
                <p className="restaurant-form-error">{formErrors.category}</p>
              )}
            </div>
          </div>
          
          <div className="restaurant-form-group">
            <label htmlFor="image" className="restaurant-form-label">Image filename:</label>
            <input
              type="text"
              id="image"
              name="image"
              className="restaurant-form-input"
              value={newItem.image}
              onChange={handleNewItemChange}
              placeholder="e.g., butter-chicken.jpg"
            />
            {formErrors.image && (
              <p className="restaurant-form-error">{formErrors.image}</p>
            )}
          </div>
          
          <div className="restaurant-form-group restaurant-checkbox-group">
            <label className="restaurant-checkbox-label">
              <input
                type="checkbox"
                name="available"
                className="restaurant-checkbox-input"
                checked={newItem.available}
                onChange={handleNewItemChange}
              />
              Available for ordering
            </label>
          </div>
          
          <div className="restaurant-form-buttons">
            <button type="submit" className="restaurant-submit-btn">Add Item</button>
            <button 
              type="button" 
              className="restaurant-cancel-btn"
              onClick={() => {
                setShowAddForm(false);
                setFormErrors({});
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <table className="restaurant-admin-table">
        <thead>
          <tr className="restaurant-admin-table-row">
            <th className="restaurant-admin-table-header">Image</th>
            <th className="restaurant-admin-table-header">Name</th>
            <th className="restaurant-admin-table-header">Category</th>
            <th className="restaurant-admin-table-header">Price ($)</th>
            <th className="restaurant-admin-table-header">Available</th>
            <th className="restaurant-admin-table-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map(item => (
            <tr 
              key={item.id} 
              className={!item.available ? 'restaurant-admin-table-row restaurant-admin-table-row-unavailable' : 'restaurant-admin-table-row'}
            >
              <td className="restaurant-admin-table-cell">
                <img 
                  src={getImageUrl(item.image)}
                  alt={item.name}
                  className="restaurant-item-thumbnail" 
                  onError={() => handleImageError(item)}
                />
              </td>
              <td className="restaurant-admin-table-cell">{item.name}</td>
              <td className="restaurant-admin-table-cell">{item.category}</td>
              <td className="restaurant-admin-table-cell">
                <input 
                  type="number" 
                  step="0.01" 
                  min="0"
                  value={item.price} 
                  onChange={(e) => {
                    const newItems = [...menuItems];
                    const index = newItems.findIndex(i => i.id === item.id);
                    newItems[index] = { ...newItems[index], price: e.target.value };
                    setMenuItems(newItems);
                  }}
                  onBlur={(e) => handlePriceChange(item.id, e.target.value)}
                />
              </td>
              <td className="restaurant-admin-table-cell">
                <input 
                  type="checkbox" 
                  checked={item.available !== false}
                  onChange={(e) => handleAvailabilityChange(item.id, e.target.checked)}
                />
              </td>
              <td className="restaurant-admin-table-cell restaurant-action-buttons">
                <button 
                  className="restaurant-update-btn"
                  onClick={() => handleAvailabilityChange(item.id, item.available === false)}
                >
                  {item.available !== false ? 'Mark Unavailable' : 'Mark Available'}
                </button>
                <button 
                  className="restaurant-delete-btn"
                  onClick={() => confirmDeleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;