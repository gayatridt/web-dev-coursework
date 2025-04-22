import { useState } from 'react';
import './Cart.css';
import { UI, DEFAULTS } from './constants';

function Cart({ cartItems, removeItem, updateQuantity, setCurrentPage }) {
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  return (
    <div className="restaurant-cart">
      <div className="restaurant-cart-header">
        <div className="restaurant-cart-header-title">
          Your Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)
        </div>
      </div>
      
      <div className="restaurant-cart-content">
        {cartItems.length === 0 ? (
          <p className="restaurant-cart-empty">{UI.MESSAGES.CART_EMPTY}</p>
        ) : (
          <>
            <ul className="restaurant-cart-items">
              {cartItems.map((item) => (
                <li key={item.id} className="restaurant-cart-item">
                  <div className="restaurant-cart-item-info">
                    <p className="restaurant-cart-item-name">{item.name}</p>
                    <p className="restaurant-cart-item-price">
                      {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                      {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="restaurant-cart-quantity-controls">
                    <button 
                      className="restaurant-cart-quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    
                    <p className="restaurant-cart-item-quantity">{item.quantity}</p>
                    
                    <button 
                      className="restaurant-cart-quantity-btn" 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    
                    <button 
                      className="restaurant-cart-remove-btn" 
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            
            <div className="restaurant-cart-footer">
              <div className="restaurant-cart-total">
                <p>Total:</p>
                <p className="restaurant-cart-total-amount">
                  {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                  {cartTotal.toFixed(2)}
                </p>
              </div>
              
              <button 
                className="restaurant-cart-checkout-btn"
                onClick={() => setCurrentPage(UI.PAGES.CHECKOUT)}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;