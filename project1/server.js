"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');
const { createSession, isValidUsername, isValidSession, deleteSession, sessions } = require('./models/login-model');
const { startNewGame, getGameState, processGuess, getUserStats, getLeaderboard } = require('./models/game-model');
const { renderLoginPage } = require('./views/login-view');
const gameView = require('./views/game-view');
const { loginController, gameController } = require('./controllers/controller');
const words = require('./words');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', gameController.getGame);
app.post('/login', loginController.login);
app.post('/guess', gameController.processGuess);
app.post('/new-game', gameController.startNewGame);
app.post('/logout', loginController.logout);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
