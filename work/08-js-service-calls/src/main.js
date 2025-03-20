import { appState } from './app-state.js';
import { renderView } from './render-view.js';
import { loginUser, checkUserSession, logoutUser, updateUserWord } from './auth-controller.js';

const appEl = document.querySelector('#app');

checkUserSession().then(() => {
  renderView(appEl);
});

appEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('login-btn')) {
    const username = document.querySelector('#username-input').value.trim();
    loginUser(username)
      .then(() => renderView(appEl))
      .catch(() => renderView(appEl));
  }

  if (e.target.classList.contains('logout-btn')) {
    logoutUser()
      .then(() => renderView(appEl))
      .catch(() => renderView(appEl));
  }

  if (e.target.classList.contains('update-word-btn')) {
    const newWord = document.querySelector('#word-input').value.trim();
    updateUserWord(newWord)
      .then(() => renderView(appEl))
      .catch(() => renderView(appEl));
  }
});

appEl.addEventListener('input', (e) => {
  if (e.target.classList.contains('word-input')) {
    appState.storedWord = e.target.value;
  }
});