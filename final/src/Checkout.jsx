import { useState } from 'react';
import { createOrder } from './utils';
import './Checkout.css';
import { UI, ERROR_MESSAGES, DEFAULTS } from './constants';

function Checkout({ cartItems, clearCart, setCurrentPage }) {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  const tax = subtotal * 0.07; 
  const total = subtotal + tax;
  
  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      setError(ERROR_MESSAGES.ORDERS.EMPTY_CART);
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    
    const orderItems = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    }));
    
    createOrder(orderItems, total)
      .then(orderResponse => {
        setOrderId(orderResponse.orderId);
        setOrderPlaced(true);
        clearCart(); 
      })
      .catch(err => {
        setError(err.message || ERROR_MESSAGES.ORDERS.CREATE_FAILED);
      })
      .finally(() => {
        setIsProcessing(false);
      });
  };
  
  const handleViewOrders = () => {
    setCurrentPage(UI.PAGES.ORDERS);
  };
  
  const handleContinueShopping = () => {
    setCurrentPage(UI.PAGES.MENU);
  };
  
  if (orderPlaced) {
    return (
      <div className="restaurant-checkout-container">
        <div className="restaurant-order-confirmation">
          <div className="restaurant-order-confirmation-title">
            {UI.MESSAGES.ORDER_PLACED_SUCCESS}
          </div>
          <p>Your order number is: <strong>{orderId}</strong></p>
          <p>{UI.MESSAGES.ORDER_PREPARING}</p>
          <div className="restaurant-order-confirmation-actions">
            <button 
              className="restaurant-checkout-view-orders-btn" 
              onClick={handleViewOrders}
            >
              View My Orders
            </button>
            <button 
              className="restaurant-checkout-continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const formatPrice = (price) => {
    return Number(price).toFixed(2);
  };
  
  return (
    <div className="restaurant-checkout-container">
      <div className="restaurant-checkout-title">Checkout</div>
      
      {error && <div className="restaurant-checkout-error-message">{error}</div>}
      
      <div className="restaurant-checkout-items">
        <div className="restaurant-checkout-section-title">Order Summary</div>
        {cartItems.length === 0 ? (
          <p className="restaurant-checkout-empty-cart-message">
            {ERROR_MESSAGES.ORDERS.EMPTY_CART}
          </p>
        ) : (
          <>
            {cartItems.map(item => (
              <div key={item.id} className="restaurant-checkout-item">
                <div className="restaurant-checkout-item-details">
                  <p className="restaurant-checkout-item-quantity">{item.quantity}x</p>
                  <p className="restaurant-checkout-item-name">{item.name}</p>
                </div>
                <p className="restaurant-checkout-item-price">
                  {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            ))}
            
            <div className="restaurant-checkout-totals">
              <div className="restaurant-checkout-total-line">
                <p>Subtotal</p>
                <p>
                  {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                  {formatPrice(subtotal)}
                </p>
              </div>
              <div className="restaurant-checkout-total-line">
                <p>Tax (7%)</p>
                <p>
                  {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                  {formatPrice(tax)}
                </p>
              </div>
              <div className="restaurant-checkout-total-line restaurant-checkout-total-line-final">
                <p>Total</p>
                <p>
                  {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                  {formatPrice(total)}
                </p>
              </div>
            </div>
            
            <div className="restaurant-checkout-actions">
              <button 
                className="restaurant-checkout-place-order-btn" 
                onClick={handlePlaceOrder}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>
              <button 
                className="restaurant-checkout-back-to-menu-btn"
                onClick={() => setCurrentPage(UI.PAGES.MENU)}
                disabled={isProcessing}
              >
                Back to Menu
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Checkout;