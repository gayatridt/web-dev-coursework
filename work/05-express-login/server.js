"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const { checkSession, loginUser, logoutUser } = require('./controllers/authController');
const { renderHomePage, updateStoredWord } = require('./controllers/dataController');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(checkSession);

app.get('/', renderHomePage);
app.post('/login', loginUser);
app.post('/update-word', updateStoredWord);
app.post('/logout', logoutUser);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});