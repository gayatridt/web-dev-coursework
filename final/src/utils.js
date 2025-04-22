import { ERROR_MESSAGES, REGEX, DEFAULTS, CONFIG } from './constants';

function formatPrice(price) {
  return parseFloat(price).toFixed(2);
}

function getImageUrl(image) {
  return new URL(`./assets/${image}`, import.meta.url).href;
}

function validateUsername(username) {
  if (!username || username.trim() === '') {
    return { valid: false, error: ERROR_MESSAGES.AUTH.EMPTY_USERNAME };
  }
  
  if (username.length < DEFAULTS.MIN_USERNAME_LENGTH) {
    return { valid: false, error: ERROR_MESSAGES.AUTH.SHORT_USERNAME };
  }
  
  if (!REGEX.USERNAME.test(username)) {
    return { valid: false, error: ERROR_MESSAGES.AUTH.INVALID_USERNAME };
  }
  
  if (username === 'dog') {
    return { valid: false, error: ERROR_MESSAGES.AUTH.BANNED_USER };
  }
  
  return { valid: true };
}

function handleApiError(error) {
  return {
    error: error.message || ERROR_MESSAGES.API.GENERAL_ERROR
  };
}

function fetchAPI(endpoint, options = {}) {
  return fetch(endpoint, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    credentials: 'same-origin' 
  })
  .then(response => {
    if (!response.ok) {
      return response.json()
        .then(err => {
          throw new Error(err.error || `Error: ${response.status}`);
        })
        .catch(jsonErr => {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        });
    }
    return response.json();
  })
  .catch(err => {
    throw err;
  });
}

function loginUser(username) {
  return fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username })
  })
  .then(response => {
    if (!response.ok) {
      const error = new Error(response.statusText || ERROR_MESSAGES.AUTH.NOT_REGISTERED);
      error.status = response.status;
      throw error;
    }
    return response.json();
  })
  .catch(error => {
    if (error.status) {
      throw error;
    }
    const networkError = new Error(error.message || ERROR_MESSAGES.API.NETWORK_ERROR);
    networkError.status = 'network-error';
    throw networkError;
  });
}

function registerUser(username) {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ username })
  })
  .then(response => {
    if (!response.ok) {
      const error = new Error(response.statusText || ERROR_MESSAGES.AUTH.USERNAME_EXISTS);
      error.status = response.status;
      throw error;
    }
    return response.json();
  })
  .catch(error => {
    if (error.status) {
      throw error;
    }
    const networkError = new Error(error.message || ERROR_MESSAGES.API.NETWORK_ERROR);
    networkError.status = 'network-error';
    throw networkError;
  });
}

function logoutUser() {
  return fetch('/api/sessions', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    return { success: true };
  })
  .catch(error => {
    throw error;
  });
}

function checkLoginStatus() {
  return fetch('/api/session', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })
  .then(response => {
    if (!response.ok) {
      if (response.status === 401) {
        return { username: null };
      }
      throw new Error('Failed to check login status');
    }
    return response.json();
  })
  .catch(err => {
    return { username: null };
  });
}

function getMenuItems() {
  return fetch('/api/menu', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (!response.ok) {
      return fetch('/api/menu-items', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    return response.json();
  })
  .then(data => {
    if (Array.isArray(data)) {
      return data;
    }
    return response.json();
  })
  .catch(error => {
    throw new Error(ERROR_MESSAGES.MENU.FETCH_FAILED);
  });
}

function createOrder(items, total) {
  return fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ items, total })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(ERROR_MESSAGES.ORDERS.CREATE_FAILED);
    }
    return response.json();
  })
  .catch(error => {
    throw error;
  });
}

export {
  formatPrice,
  getImageUrl,
  validateUsername,
  handleApiError,
  fetchAPI,
  loginUser,
  registerUser,
  logoutUser,
  checkLoginStatus,
  getMenuItems,
  createOrder
};