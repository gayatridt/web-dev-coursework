import { useState, useEffect } from 'react';
import './Orders.css';
import { fetchOrders } from './services';
import Loading from './Loading';
import { UI, ERROR_MESSAGES, ORDER_STATUS, DEFAULTS } from './constants';

function Orders({ username }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(3); 

  useEffect(() => {
    setLoading(true);
    
    fetchOrders()
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(ERROR_MESSAGES.ORDERS.FETCH_FAILED || 'Failed to fetch orders');
      })
      .then(data => {
        setOrders(data);
        setError('');
      })
      .catch(err => {
        setError(ERROR_MESSAGES.ORDERS.FETCH_ERROR || 'Failed to load orders. Please try again later.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getStatusClass = (status) => {
    switch (status) {
      case ORDER_STATUS.PREPARING:
        return 'restaurant-status-preparing';
      case ORDER_STATUS.READY:
        return 'restaurant-status-ready';
      case ORDER_STATUS.DELIVERED:
        return 'restaurant-status-delivered';
      case ORDER_STATUS.CANCELLED:
        return 'restaurant-status-cancelled';
      default:
        return '';
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <Loading message={UI.LOADING.ORDERS || 'Loading your orders...'} />;
  }

  return (
    <div className="restaurant-orders-container">
      <div className="restaurant-orders-title">{UI.MESSAGES.MY_ORDERS || 'My Orders'}</div>
      
      {error && <div className="restaurant-orders-error">{error}</div>}
      
      {orders.length === 0 ? (
        <div className="restaurant-no-orders">
          <p className="restaurant-no-orders-message">{UI.MESSAGES.NO_ORDERS || 'You haven\'t placed any orders yet.'}</p>
        </div>
      ) : (
        <>
          <div className="restaurant-orders-list">
            {currentOrders.map(order => (
              <div key={order.id} className="restaurant-order-card">
                <div className="restaurant-order-header">
                  <div className="restaurant-order-title">Order #{order.id}</div>
                  <p className={`restaurant-order-status ${getStatusClass(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </p>
                </div>
                
                <div className="restaurant-order-date">
                  Placed on: {formatDate(order.orderDate)}
                </div>
                
                <div className="restaurant-order-items">
                  <div className="restaurant-order-items-title">Items:</div>
                  <ul className="restaurant-order-items-list">
                    {order.items.map((item, index) => (
                      <li key={index} className="restaurant-order-item">
                        <p className="restaurant-item-quantity">x{item.quantity}</p>
                        <p className="restaurant-item-name">{item.name}</p>
                        <p className="restaurant-item-price">
                          {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="restaurant-order-total">
                  <p>Total:</p>
                  <p className="restaurant-total-amount">
                    {DEFAULTS.CURRENCY === 'USD' ? '$' : DEFAULTS.CURRENCY}
                    {order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                  </p>
                </div>
                
                {order.status === ORDER_STATUS.PREPARING && (
                  <div className="restaurant-order-message">
                    <p>{UI.MESSAGES.ORDER_PREPARING || 'Your order is being prepared. It will be ready soon!'}</p>
                  </div>
                )}
                
                {order.status === ORDER_STATUS.READY && (
                  <div className="restaurant-order-message">
                    <p>{UI.MESSAGES.ORDER_READY || 'Your order is ready for pickup or delivery!'}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {orders.length > ordersPerPage && (
            <div className="restaurant-orders-pagination">
              <button 
                className="restaurant-pagination-button"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <p className="restaurant-pagination-info">
                Page {currentPage} of {totalPages}
              </p>
              <button 
                className="restaurant-pagination-button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Orders;