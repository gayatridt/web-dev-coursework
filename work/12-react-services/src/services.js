export function fetchSession() {
  return fetch('/api/session', {
    method: 'GET',
    credentials: 'include',
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
      .then(err => Promise.reject(err));
  });
}

export function fetchLogin(username) {
  return fetch('/api/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username }),
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
      .then(err => Promise.reject(err));
  });
}

export function fetchLogout() {
  return fetch('/api/session', {
    method: 'DELETE',
    credentials: 'include',
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
      .then(err => Promise.reject(err));
  });
}

export function fetchWord() {
  return fetch('/api/word', {
    method: 'GET',
    credentials: 'include',
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
      .then(err => Promise.reject(err));
  });
}

export function fetchUpdateWord(word) {
  return fetch('/api/word', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ word }),
  })
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    return response.json()
      .then(err => Promise.reject(err));
  });
}
