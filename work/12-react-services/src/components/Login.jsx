import { useState } from 'react';
import {  MESSAGES, SERVER } from '../constants';
import './Login.css';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!username.trim()) {
      setError(MESSAGES[SERVER.EMPTY_USERNAME]);
      return;
    }
    setError(''); 
    onLogin(username);
  }

  function handleChange(e) {
    setUsername(e.target.value);
    if (error) setError('');
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="username">Username:</label>
        <input
          className={`login__input ${error ? 'error' : ''}`}
          id="username"
          value={username}
          onChange={handleChange}
          placeholder="Enter your username"
        />
        {error && <div className="login__error">{error}</div>}
        <button className="login__button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginForm;