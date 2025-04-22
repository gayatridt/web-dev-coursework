const sessions = {};

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

export function createSession(username) {
  const sid = generateSessionId();
  sessions[sid] = username;
  return sid;
}

export function isValidSession(sid) {
  return Boolean(sessions[sid]);
}

export function getUsernameFromSession(sid) {
  return sessions[sid] || '';
}

export function deleteSession(sid) {
  delete sessions[sid];
  return true;
}