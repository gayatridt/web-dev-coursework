"use strict";

const { createSession, isValidUsername, isValidSession, deleteSession, sessions } = require('../models/login-model');
const { startNewGame, getGameState, processGuess, getUserStats, getLeaderboard } = require('../models/game-model');
const { renderLoginPage } = require('../views/login-view');
const gameView = require('../views/game-view');
const words = require('../words');

const loginController = {
    login: (req, res) => {
        const { username } = req.body;

        if (username.toLowerCase() === 'dog') {
            return res.status(403).send(renderLoginPage('Forbidden: Username "dog" is not allowed.'));
        }

        if (!isValidUsername(username)) {
            return res.status(400).send(renderLoginPage('Invalid username. Use alphanumeric characters only.'));
        }

        const sid = createSession(username);
        res.cookie('sid', sid, { httpOnly: true });

        if (!getGameState(username)) {
            startNewGame(username);
        }

        res.redirect('/');
    },

    logout: (req, res) => {
        const sid = req.cookies.sid;
        if (sid) {
            deleteSession(sid);
            res.clearCookie('sid');
        }
        res.redirect('/');
    }
};

const gameController = {
    getGame: (req, res) => {
        const sid = req.cookies.sid;
        if (!sid || !isValidSession(sid)) {
            return res.send(renderLoginPage());
        }

        const username = sessions[sid].username;
        const gameState = getGameState(username);
        const userStats = getUserStats(username);
        const leaderboard = getLeaderboard();
        const guessedWords = new Set(gameState.guesses.map(g => g.word));

        res.send(gameView(
            username,
            gameState,
            words,
            guessedWords,
            '',
            userStats,
            leaderboard
        ));
    },

    processGuess: (req, res) => {
        const sid = req.cookies.sid;
        if (!sid || !isValidSession(sid)) {
            return res.status(401).send(renderLoginPage('Please log in first'));
        }

        const username = sessions[sid].username;
        const gameState = getGameState(username);

        if (gameState.isGameWon) {
            return res.redirect('/');
        }

        const guess = req.body.guess;
        const result = processGuess(username, guess);

        if (result.error) {
            const userStats = getUserStats(username);
            const leaderboard = getLeaderboard();
            const guessedWords = new Set(gameState.guesses.map(g => g.word));
            
            return res.send(gameView(
                username,
                gameState,
                words,
                guessedWords,
                result.error,
                userStats,
                leaderboard
            ));
        }

        res.redirect('/');
    },

    startNewGame: (req, res) => {
        const sid = req.cookies.sid;
        if (!sid || !isValidSession(sid)) {
            return res.status(401).send(renderLoginPage('Please log in first'));
        }

        const username = sessions[sid].username;
        startNewGame(username);
        res.redirect('/');
    }
};

module.exports = { loginController, gameController };
