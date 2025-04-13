export const LOGIN_STATUS = {
    PENDING: 'pending',
    NOT_LOGGED_IN: 'notLoggedIn',
    IS_LOGGED_IN: 'loggedIn',
  };
  
  export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_WORD: 'required-word',
    EMPTY_USERNAME: 'empty-username',
  };
  
  export const CLIENT = {
    NETWORK_ERROR: 'networkError',
    NO_SESSION: 'noSession',
  };
  
  export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network. Please try again',
    [SERVER.AUTH_INSUFFICIENT]:  'Username "dog" is not allowed. Please choose a different username.',
    [SERVER.REQUIRED_USERNAME]: 'Username is required and can only contain letters and numbers (no spaces or special characters)',
    [SERVER.EMPTY_USERNAME]: 'Username can not be empty! Please enter a valid username.',
    [SERVER.REQUIRED_WORD]: 'Please enter a word to store',
    default: 'An unexpected error occurred. Please try again.',
  };
  