import { fetchLogin, fetchSession, fetchLogout, fetchWord, updateWord } from './services.js';
import { appState } from './app-state.js';
import { PAGES } from './messages.js';

export function loginUser(username) {
  return fetchLogin(username)
    .then(({ username }) => {
      appState.username = username;
      appState.currentPage = PAGES.WORD;
      appState.error = '';
      return loadUserWord();
    })
    .catch(error => {
      appState.error = error.error;
      throw error;
    });
}

export function checkUserSession() {
  return fetchSession()
    .then(({ username }) => {
      appState.username = username;
      appState.currentPage = PAGES.WORD;
      return loadUserWord();
    })
    .catch(() => {
      appState.currentPage = PAGES.LOGIN;
    });
}

export function logoutUser() {
  return fetchLogout()
    .then(() => {
      appState.username = '';
      appState.storedWord = '';
      appState.error = '';
      appState.currentPage = PAGES.LOGIN;
    })
    .catch(error => {
      appState.error = error.error;
      throw error;
    });
}

export function loadUserWord() {
  return fetchWord()
    .then(({ storedWord }) => {
      appState.storedWord = storedWord;
    })
    .catch(error => {
      if (error.error === 'auth-missing') {
        appState.currentPage = PAGES.LOGIN;
      }
      appState.error = error.error;
      throw error;
    });
}

export function updateUserWord(word) {
  return checkUserSession()
    .then(() => updateWord(word))
    .then(({ storedWord }) => {
      appState.storedWord = storedWord;
      appState.error = '';
    })
    .catch(error => {
      appState.error = error.error;
      if (error.error === 'auth-missing') {
        appState.currentPage = PAGES.LOGIN;
      }
      throw error;
    });
}