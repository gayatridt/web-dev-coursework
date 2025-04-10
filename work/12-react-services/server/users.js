const users = {};

function createUser(username) {
  if(!users[username]) {
    users[username] = { word: '' };
  }
  return users[username];
}

function getWord(username) {
  return users[username]?.word || '';
}

function updateWord(username, word) {
  users[username].word = word;
  return users[username];
}

export {
  createUser,
  getWord,
  updateWord,
};
