import { useState, useEffect } from 'react';
import '../App.css';
import { LOGIN_STATUS, CLIENT, SERVER } from '../constants';
import { fetchSession, fetchLogin, fetchLogout, fetchWord, fetchUpdateWord } from '../services';
import LoginForm from './Login';
import Word from './Word';
import Loading from './Loading';
import Status from './Status';

function App() {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [loginStatus, setLoginStatus] = useState(LOGIN_STATUS.PENDING);
  const [isWordPending, setIsWordPending] = useState(false);
  const [word, setWord] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);

  function onLogin(username) {
    setIsWordPending(true);
    fetchLogin(username)
      .then(() => {
        setError('');
        setUsername(username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchWord();
      })
      .then(data => {
        setWord(data.word);
        setIsWordPending(false);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        setIsWordPending(false);
      });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    fetchLogout()
      .catch(err => {
        setError(err?.error || 'ERROR');
      });
  }

  function onUpdateWord(newWord) {
    setError('');
    setIsWordPending(true);
    fetchUpdateWord(newWord)
      .then(data => {
        setWord(data.word);
        setIsWordPending(false);
      })
      .catch(err => {
        setError(err?.error || 'ERROR');
        setIsWordPending(false);
      });
  }

  function checkForSession() {
    return fetchSession()
      .then(session => {
        setUsername(session.username);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchWord();
      })
      .catch(err => {
        if(err?.error === SERVER.AUTH_MISSING) {
          return Promise.reject({ error: CLIENT.NO_SESSION });
        }
        return Promise.reject(err);
      })
      .then(data => {
        setWord(data.word);
      })
      .catch(err => {
        if(err?.error === CLIENT.NO_SESSION) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'ERROR');
      });
  }

  useEffect(() => {
    let isMounted = true;
    let timer;

    Promise.all([
      checkForSession(),
      new Promise(resolve => timer = setTimeout(resolve, 200)) 
    ]).finally(() => {
      if (isMounted) {
        setInitialLoad(false);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Word Vault</h1>
        {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <button className="logout-button" onClick={onLogout}>
            Sign Out
          </button>
        )}
      </header>
      
      <main className="app-content">
          {initialLoad && loginStatus === LOGIN_STATUS.PENDING ? (
            <Loading />
          ) : error ? (
            <Status error={error} />
          ) : loginStatus === LOGIN_STATUS.NOT_LOGGED_IN ? (
            <div className="auth-container">
              <h2>Welcome to Word Vault</h2>
              <LoginForm onLogin={onLogin} />
            </div>
          ) : (
            <div className="word-container">
              <div className="user-greeting">
                Welcome back, <p className="username">{username}</p>
              </div>
              <Word 
                word={word} 
                onUpdateWord={onUpdateWord} 
                isPending={isWordPending} 
              />
            </div>
          )}
        </main>
    </div>
  );
}

export default App;