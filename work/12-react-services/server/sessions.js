const sessions = {};

function createSession(sid, username) {
  sessions[sid] = { username };
}

function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

export {
  createSession,
  getSessionUser,
  deleteSession,
};
