import appState, { login, logout, setMessages, setUsers, setAllUsers, setError } from './state';
import { checkUserSession, getChatMessages, getOnlineUsers, getAllRegisteredUsers } from './services';
import renderView from './render';
import { setupLoginHandler, setupLogoutHandler, setupMessageHandler, startMessagePolling, setupDeleteMessageHandler } from './listeners';

const appEl = document.querySelector('#app');
renderView({ appState, appEl });

setupLoginHandler({ appState, appEl });
setupLogoutHandler({ appState, appEl });
setupMessageHandler({ appState, appEl });
startMessagePolling({ appState, appEl });
setupDeleteMessageHandler({ appState, appEl }); 
checkForSession();

function checkForSession() {
  checkUserSession()
    .then(session => {
      login(session.username);
      appState.initialLoadInProgress = false; 
      renderView({ appState, appEl });
      return Promise.all([getChatMessages(), getOnlineUsers(), getAllRegisteredUsers()]);
    })
    .catch(err => {
      appState.initialLoadInProgress = false; 
      const error = err?.error === 'auth-missing' ? 'noSession' : 
                   err?.error || CLIENT.NETWORK_ERROR;
      return Promise.reject({ error });
    })
    .then(([messages, users, allUsers]) => {
      setMessages(messages);
      setUsers(users);
      setAllUsers(allUsers);
      renderView({ appState, appEl });
    })
    .catch(err => {
      if (err?.error === 'noSession') {
        logout();
        renderView({ appState, appEl });
        return;
      }

      setError(err?.error || 'ERROR');
      renderView({ appState, appEl });
    });
}