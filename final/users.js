const users = {
  'admin': { username: 'admin', isAdmin: true },
  'user1': { username: 'user1', isAdmin: false }
};

export function isUsernameExists(username) {
  return Boolean(users[username]);
}

export function addUser(username) {
  if (isUsernameExists(username)) {
    return false;
  }
  users[username] = {
    username,
    isAdmin: false 
  };
  return true;
}

export function getUser(username) {
  return users[username] || null;
}

export function isAdmin(username) {
  const user = getUser(username);
  return user ? user.isAdmin : false;
}