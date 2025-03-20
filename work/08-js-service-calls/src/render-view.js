import { MESSAGES } from './messages.js';
import { appState } from './app-state.js';

function renderErrorMessage() {
  return appState.error ? `<p class="error">${MESSAGES[appState.error] || MESSAGES.default}</p>` : '';
}

export function renderView(appEl) {
  if (appState.currentPage === 'LOGIN') {
    renderLoginView(appEl);
  } else if (appState.currentPage === 'WORD') {
    renderWordView(appEl);
  }
}

function renderLoginView(appEl) {
  appEl.innerHTML = `
    <h2>Login</h2>
    <div class="form-group">
      <label for="username-input">Username:</label>
      <input type="text" id="username-input" class="text-input" placeholder="Enter your username" required>
      <div class="button-group">
        <button class="login-btn">Login</button>
      </div>
    </div>
    ${renderErrorMessage()}
  `;
}

function renderWordView(appEl) {
  appEl.innerHTML = `
    <h2>Welcome, ${appState.username}</h2>
    <div class="word-display">
      <div class="word-display-line">Your stored word: <strong>${appState.storedWord}</strong></div>
      <label for="word-input">Enter your word here:</label>
      <input type="text" id="word-input" class="text-input" placeholder="Update your word" value="${appState.storedWord}">
      <button class="update-word-btn">Update Word</button>
    </div>
    <div class="button-group">
      <button class="logout-btn">Logout</button>
    </div>
    ${renderErrorMessage()}
  `;
}