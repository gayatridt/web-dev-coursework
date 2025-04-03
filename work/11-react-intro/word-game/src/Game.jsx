import { useState } from 'react';
import { comparison } from './comparison';
import './Game.css';

function Game({ onLogout }) {
  const SECRET_WORD = 'RECAT';
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const handleGuessSubmit = (e) => {
    e.preventDefault();
    
    if (guess === '') {
      setMessage('Guess cannot be empty');
      return;
    } else if (guess.length !== 5) {
      setMessage(`${guess} was not a valid 5-letter word`);
      setGuess('');
      return;
    }
    
    const upperGuess = guess.toUpperCase();
    if (upperGuess === SECRET_WORD) {
      setMessage(`${guess} is the secret word!`);
    } else {
      const lettersInCommon = comparison(upperGuess, SECRET_WORD);
      setMessage(`${guess} had ${lettersInCommon} letters in common`);
    }
    
    setGuess('');
  };

  return (
    <div className="game-container">
        <header className="game-header">
            <h2>Word Guess Game</h2>
            <button onClick={onLogout} className="logout-button">
            Logout
            </button>
        </header>

    <section className="guess-section">
        <form onSubmit={handleGuessSubmit} className="guess-form">
        <div className="input-group">
            <label htmlFor="guess">Enter 5-letter word:</label>
            <input
            id="guess"
            type="text"
            value={guess}
            onInput={(e) => setGuess(e.target.value)}
            maxLength={5}
            className="guess-input"
            autoFocus
            />
        </div>
        <button type="submit" className="submit-button">
            Submit Guess
        </button>
        </form>
    </section>

    {message && (
        <div className="message-display">
        <div className={`message ${message.includes('secret') ? 'success' : ''}`}>
            {message}
        </div>
        </div>
    )}
    </div>
  );
}

export default Game;