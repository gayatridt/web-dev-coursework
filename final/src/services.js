import { ERROR_MESSAGES } from './constants';

function fetchSession() {
  return fetch('/api/session', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function fetchLogin(username) {
  return fetch('/api/sessions', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function fetchRegister(username) {
  return fetch('/api/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username })
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function fetchLogout() {
  return fetch('/api/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function fetchMenuItems() {
  return fetch('/api/menu', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function fetchOrders() {
  return fetch('/api/orders', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function createOrder(orderData) {
  return fetch('/api/orders', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function updateOrderStatus(orderId, status) {
  return fetch(`/api/orders/${orderId}/status`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status })
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function fetchCart() {
  return fetch('/api/cart', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function updateCart(cartItems) {
  return fetch('/api/cart', {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items: cartItems })
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function clearCart() {
  return fetch('/api/cart', {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function deleteOrder(orderId) {
  return fetch(`/api/orders/${orderId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function updateMenuItem(itemId, updates) {
  return fetch(`/api/admin/menu/${itemId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function createMenuItem(itemData) {
  return fetch('/api/admin/menu', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(itemData)
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

function deleteMenuItem(itemId) {
  return fetch(`/api/admin/menu/${itemId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .catch(err => {
    const networkError = new Error(ERROR_MESSAGES.API.NETWORK_ERROR || 'Network error');
    networkError.status = 'network-error';
    throw networkError;
  });
}

export {
  fetchSession,
  fetchLogin,
  fetchRegister,
  fetchLogout,
  fetchMenuItems,
  fetchOrders,
  createOrder,
  updateOrderStatus,
  deleteOrder,
  fetchCart,
  updateCart,
  clearCart,
  updateMenuItem,
  createMenuItem,
  deleteMenuItem
};