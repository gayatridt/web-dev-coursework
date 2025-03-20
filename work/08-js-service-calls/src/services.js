export function fetchLogin(username) {
  return fetch('/api/session/', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username }),
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchSession() {
  return fetch('/api/session')
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchLogout() {
  return fetch('/api/session', { method: 'DELETE' })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}

export function fetchWord() {
  return fetch('/api/word')
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}

export function updateWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ word }),
  })
    .catch(() => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    });
}