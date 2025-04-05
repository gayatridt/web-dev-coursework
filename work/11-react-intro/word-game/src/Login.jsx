import { useState } from 'react';
import './App.css';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username.trim() === '') {
      setError('Username cannot be empty');
      return;
    }

    if (!username.match(/^[a-zA-Z0-9]+$/)) {
      setError('Username can only contain letters and numbers');
      return;
    }
    
    if (username.toLowerCase() === 'dog') {
      setError('"dog" is not a valid user');
      return;
    }
    
    setError('');
    onLogin(username);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
              className="login-input"
              autoFocus
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;