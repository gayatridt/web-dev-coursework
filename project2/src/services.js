export function loginUser(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username })
  }).then(handleResponse);
}

export function logoutUser() {
  return fetch('/api/v1/session', { method: 'DELETE' }).then(handleResponse);
}

export function getChatMessages() {
  return fetch('/api/v1/messages').then(handleResponse);
}

export function sendChatMessage(message) {
  return fetch('/api/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  }).then(response => {
    if (!response.ok) {
      return response.json().then(err => {
        err.status = response.status;
        return Promise.reject(err);
      });
    }
    return response.json();
  });
}

export function checkUserSession() {
  return fetch('/api/v1/session')
    .then(handleResponse)
    .catch(err => {
      if (err.error === 'auth-missing') {
        return Promise.reject({ error: 'auth-missing' });
      }
      return Promise.reject(err);
    });
}

export function getOnlineUsers() {
  return fetch('/api/v1/users')
    .then(handleResponse)
    .catch(err => {
      const error = err.error || 'Failed to fetch users';
      return Promise.reject({ error });
    });
}

export function getAllRegisteredUsers() {
  return fetch('/api/v1/allusers')
    .then(handleResponse)
    .catch(err => {
      const error = err.error || 'Failed to fetch all users';
      return Promise.reject({ error });
    });
}

export function removeChatMessage(id) {
  return fetch(`/api/v1/messages/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) {
    return response.json().then(err => {
      if (err && err.error) {
        return Promise.reject(err);
      }
      return Promise.reject({ 
        error: response.status === 400 ? 'validation-error' : 'network-error'
      });
    });
  }
  return response.json();
}