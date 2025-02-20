"use strict";

const GameErrors = {
    INVALID_WORD: "Word not in list",
    DUPLICATE_GUESS: "Word already guessed",
    EMPTY_GUESS: "Please enter a guess"
};

const games = {};
const userStats = {};
const leaderboard = [];

const words = require('../words');
const crypto = require('crypto');

function startNewGame(username) {
    const randomIndex = Math.floor(Math.random() * words.length);
    const secretWord = words[randomIndex];
    games[username] = {
        secretWord: words[randomIndex],
        guesses: [],
        guessCount: 0,
        isGameWon: false
    };
    console.log(`New game started for ${username}. Secret word: ${secretWord}`);
}

function getGameState(username) {
    return games[username];
}

function getMatchedLetters(guess, secretWord) {
    const guessLetters = guess.toLowerCase().split('');
    const secretLetters = secretWord.toLowerCase().split('');
    let matches = 0;
    
    const letterCount = {};
    secretLetters.forEach(letter => {
        letterCount[letter] = (letterCount[letter] || 0) + 1;
    });
    
    guessLetters.forEach(letter => {
        if (letterCount[letter] > 0) {
            matches++;
            letterCount[letter]--;
        }
    });
    
    return matches;
}

function processGuess(username, guess) {
    const gameState = games[username];
    const lowerGuess = guess.toLowerCase();
    
    if (!words.includes(lowerGuess)) {
        return { error: GameErrors.INVALID_WORD };
    }
    
    if (gameState.guesses.some(g => g.word.toLowerCase() === lowerGuess)) {
        return { error: GameErrors.DUPLICATE_GUESS };
    }
    
    const matchedLetters = getMatchedLetters(lowerGuess, gameState.secretWord);
    gameState.guesses.push({ word: lowerGuess, matchedLetters });
    gameState.guessCount++;
    
    console.log(`Secret word: ${gameState.secretWord}`);
    console.log(`Guess: ${lowerGuess}, Matches: ${matchedLetters}`);
    
    if (lowerGuess === gameState.secretWord.toLowerCase()) {
        gameState.isGameWon = true;
        updateUserStats(username, gameState.guessCount);
    }
    
    return { matchedLetters };
}

function updateUserStats(username, guesses) {
    if (!userStats[username]) {
        userStats[username] = {
            gamesPlayed: 0,
            totalGuesses: 0,
            personalBest: Infinity,
            averageGuesses: 0
        };
    }
    
    const stats = userStats[username];
    stats.gamesPlayed++;
    stats.totalGuesses += guesses;
    stats.personalBest = Math.min(stats.personalBest, guesses);
    stats.averageGuesses = stats.totalGuesses / stats.gamesPlayed;
    
    updateLeaderboard(username, stats.personalBest);
}

function updateLeaderboard(username, score) {
    const existingEntry = leaderboard.findIndex(entry => entry.username === username);
    if (existingEntry !== -1) {
        leaderboard[existingEntry].score = score;
    } else {
        leaderboard.push({ username, score });
    }
    
    leaderboard.sort((a, b) => a.score - b.score);
    if (leaderboard.length > 10) {
        leaderboard.pop();
    }
}

function getUserStats(username) {
    return userStats[username] || {
        gamesPlayed: 0,
        personalBest: Infinity,
        averageGuesses: 0
    };
}

function getLeaderboard() {
    return leaderboard;
}

module.exports = {
    startNewGame,
    getGameState,
    processGuess,
    getUserStats,
    getLeaderboard
};