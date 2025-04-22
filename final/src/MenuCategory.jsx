import { useState, useRef } from 'react';
import './MenuCategory.css';
import { CONFIG, DEFAULTS, UI, ERROR_MESSAGES } from './constants';
import { getImageUrl } from "./utils";

function MenuCategory({ category, items, addItemToCart }) {
  const [expandedItem, setExpandedItem] = useState(null);
  const [itemsWithErrorImages, setItemsWithErrorImages] = useState({});
  const buttonRefs = useRef({});

  const handleAddToCart = (item, e) => {
    e.stopPropagation(); 
    addItemToCart(item);
    
    if (!buttonRefs.current[item.id]) {
      buttonRefs.current[item.id] = {};
    }
    
    if (!buttonRefs.current[item.id].originalText) {
      buttonRefs.current[item.id].originalText = UI.MESSAGES.ADD_TO_CART;
    }
    
    buttonRefs.current[item.id].currentText = UI.MESSAGES.ADDED_TO_CART;
    
    setExpandedItem(prev => {
      setTimeout(() => {
        if (buttonRefs.current[item.id]) {
          buttonRefs.current[item.id].currentText = buttonRefs.current[item.id].originalText;
          setExpandedItem(prev => prev);
        }
      }, 1000);
      return prev;
    });
  };

  const toggleItemDetails = (itemId) => {
    if (expandedItem === itemId) {
      setExpandedItem(null); 
    } else {
      setExpandedItem(itemId); 
    }
  };
  
  const handleImageError = (itemId) => {
    setItemsWithErrorImages(prev => ({
      ...prev,
      [itemId]: true
    }));
  };

  return (
    <div className="restaurant-menu-category">
      <div className="restaurant-category-title">
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </div>
      <div className="restaurant-menu-items">
        {items.map(item => {
          if (!buttonRefs.current[item.id]) {
            buttonRefs.current[item.id] = {
              originalText: UI.MESSAGES.ADD_TO_CART,
              currentText: UI.MESSAGES.ADD_TO_CART
            };
          }
                    
          return (
            <div
              key={item.id}
              className={`restaurant-menu-item ${expandedItem === item.id ? 'restaurant-menu-item-expanded' : ''} ${item.available === false ? 'restaurant-menu-item-unavailable' : ''}`}
              onClick={() => toggleItemDetails(item.id)}
            >
              <div className="restaurant-menu-item-header">
                <div className="restaurant-menu-item-info">
                  <div className="restaurant-item-name">{item.name}</div>
                  <p className="restaurant-item-price">
                    {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                    {parseFloat(item.price).toFixed(2)}
                  </p>
                  {item.available === false && <p className="restaurant-unavailable-tag">Currently Unavailable</p>}
                </div>
                <div className="restaurant-item-image-container">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className={`restaurant-item-image ${itemsWithErrorImages[item.id] ? 'restaurant-item-image-hidden' : ''}`}
                    onError={() => handleImageError(item.id)}
                  />
                </div>
              </div>
              {expandedItem === item.id && (
                <div className="restaurant-item-details">
                  <p className="restaurant-item-description">{item.description}</p>
                  <div className="restaurant-item-actions">
                    {item.available === false ? (
                      <button
                        className="restaurant-add-to-cart-btn restaurant-add-to-cart-btn-unavailable"
                        disabled
                      >
                        Unavailable
                      </button>
                    ) : (
                      <button
                        className="restaurant-add-to-cart-btn"
                        onClick={(e) => handleAddToCart(item, e)}
                      >
                        {buttonRefs.current[item.id].currentText}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MenuCategory;