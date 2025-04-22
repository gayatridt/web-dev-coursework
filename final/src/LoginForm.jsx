import { useState } from 'react';
import './LoginForm.css';
import { loginUser, registerUser, validateUsername } from './utils';
import { ERROR_MESSAGES } from './constants';

function LoginForm({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const validation = validateUsername(username);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    
    setIsProcessing(true);
    
    if (isRegistering) {
      registerUser(username)
        .then(data => {
          onLoginSuccess(data.username);
        })
        .catch(err => {
          if (err.status === 400) {
            setError(ERROR_MESSAGES.AUTH.INVALID_USERNAME);
          } else if (err.status === 403 && username === 'dog') {
            setError(ERROR_MESSAGES.AUTH.BANNED_USER);
          } else if (err.status === 409) {
            setError(ERROR_MESSAGES.AUTH.USERNAME_EXISTS);
          } else {
            setError(err.message || ERROR_MESSAGES.API.GENERAL_ERROR);
          }
          throw err; 
        })
        .finally(() => {
          setIsProcessing(false);
        });
    } else {
      loginUser(username)
        .then(data => {
          onLoginSuccess(data.username);
        })
        .catch(err => {
          if (err.status === 'network-error') {
            setError(ERROR_MESSAGES.API.NETWORK_ERROR);
          } else if (err.status === 401) {
            setError(ERROR_MESSAGES.AUTH.NOT_REGISTERED);
          } else if (err.status === 400) {
            setError(ERROR_MESSAGES.AUTH.INVALID_USERNAME);
          } else if (err.status === 403 && username === 'dog') {
            setError(ERROR_MESSAGES.AUTH.BANNED_USER);
          } else {
            setError(err.message || ERROR_MESSAGES.API.GENERAL_ERROR);
          }
          throw err; 
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  };

  return (
    <div className="restaurant-login-container">
      <form className="restaurant-login-form" onSubmit={handleSubmit}>
        <div className="restaurant-login-title">
          {isRegistering ? 'Create Account' : 'Login'}
        </div>
        
        {error && <div className="restaurant-login-error-message">{error}</div>}
        
        <div className="restaurant-login-form-group">
          <label className="restaurant-login-form-label" htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="restaurant-login-form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isProcessing}
            autoComplete="username"
          />
        </div>
        
        <button 
          type="submit" 
          className="restaurant-login-submit-button"
          disabled={isProcessing}
        >
          {isProcessing 
            ? (isRegistering ? 'Creating...' : 'Logging in...') 
            : (isRegistering ? 'Create Account' : 'Login')}
        </button>
        
        <div className="restaurant-login-options">
          <button
            type="button"
            className="restaurant-login-toggle-button"
            onClick={() => setIsRegistering(!isRegistering)}
            disabled={isProcessing}
          >
            {isRegistering 
              ? 'Already have an account? Login' 
              : 'New user? Create account'}
          </button>
        </div>
        
        <div className="restaurant-login-note">
          <p className="restaurant-login-note-text">Note: No password required for demo app.</p>
          <p className="restaurant-login-note-text">Try username or register a new account.</p>
          <p className="restaurant-login-note-text">Admin username: 'admin'</p>
          <p className="restaurant-login-note-text">User 'dog' is always denied access.</p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;