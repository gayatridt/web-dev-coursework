import { useState } from 'react';
import Game from './Game';
import Login from './Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="app-container">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Game onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;