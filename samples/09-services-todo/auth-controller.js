const sessions = require('./sessions');
const users = require('./users');
const todos = require('./todos'); // This feels weird to be here (auth) - but I made login return this data.
                                  // This shows how our choices can cause extra coupling

const authController = {};

authController.checkSession = function (req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  // Notice here that an existing session will just get back the username
  // So the consumer will need to make an additional service call to get the list of todos
  //
  // BUT performing a login (creating a session, below) will return the list of todos directly
  // I have this difference because these are the sorts of quirks you can expect when you
  // consume services, not because I advocate for this inconsistency
  //
  // Which way is best depends
  // - Forcing extra service calls is bad
  // - Sending more data than needed is bad
  // Your service specifics decides which is "worse"
  res.json({ username });
};

authController.createSession = function(req, res) {
  const { username } = req.body;

  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(!users.isPermitted(username)) {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username, todos.makeTodoList());
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username).getTodos());
};

authController.endSession = function(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    // Delete the session, but not the user data
    sessions.deleteSession(sid);
  }

  // We don't report any error if sid or session didn't exist
  // Because that means we already have what the user requested
  res.json({ username });
};

module.exports = authController;


