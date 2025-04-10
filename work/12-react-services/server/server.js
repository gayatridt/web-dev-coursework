import express from 'express';
import cookieParser from 'cookie-parser';
import { v4 as uuid } from 'uuid';
import * as sessions from './sessions.js';
import * as users from './users.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.static('./dist')); 
app.use(express.json());

const validateSession = (req, res, next) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  req.username = username;
  next();
};

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  
  if(username.trim() === '') {
    res.status(400).json({ error: 'empty-username' });
    return;
  }

  if(!username || !/^[a-zA-Z0-9]+$/.test(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  
  if(username.toLowerCase() === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  
  const sid = uuid();
  sessions.createSession(sid, username);
  users.createUser(username);
  
  res.cookie('sid', sid, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: 'strict',
    httpOnly: true,
  });
  
  res.json({ username });
});

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  res.json({ username });
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if(sid) {
    sessions.deleteSession(sid);
  }
  
  res.clearCookie('sid');
  res.json({ wasLoggedIn: !!username });
});

app.get('/api/word', validateSession, (req, res) => {
  const { username } = req;
  const word = users.getWord(username);
  res.json({ username, word });
});

app.put('/api/word', validateSession, (req, res) => {
  const { username } = req;
  const { word } = req.body;
  
  if(!word) {
    res.status(400).json({ error: 'required-word' });
    return;
  }
  
  users.updateWord(username, word);
  res.json({ username, word });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
