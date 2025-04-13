import { useState } from 'react';
import { MESSAGES, SERVER } from '../constants';
import './Word.css';

function Word({ word, onUpdateWord, isPending }) {
  const [newWord, setNewWord] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!newWord.trim()) {
      setError(MESSAGES[SERVER.REQUIRED_WORD]);
      return;
    }
    setError('');
    onUpdateWord(newWord);
    setNewWord('');
  }

  function handleChange(e) {
    setNewWord(e.target.value);
    if (error) setError('');
  }

  return (
    <div className="word">
      <div className="word__current">
        <h2>Your Stored Word</h2>
        {isPending ? (
          <div className="word__loading">Loading...</div>
        ) : (
          <div className="word__value">{word || '(no word stored)'}</div>
        )}
      </div>

      <form className="word__form" onSubmit={handleSubmit}>
        <label className="word__label" htmlFor="word">Update word:</label>
        <input
          className={`word__input ${error ? 'error' : ''}`}
          id="word"
          value={newWord}
          onChange={handleChange}
          placeholder="Enter a new word"
        />
        {error && <div className="word__error">{error}</div>}
        <button className="word__button" type="submit">
          Update
        </button>
      </form>
    </div>
  );
}

export default Word;