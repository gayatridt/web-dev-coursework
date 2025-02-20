"use strict";

const gameView = (username, gameState, words, guessedWordsSet, errorMessage, userStats, leaderboard) => {
    const winMessage = gameState.isGameWon ? 
        `<div class="win-message">
            <p class="win-title">🎉 Congratulations! 🎉</p>
            <p class="win-text">You won in ${gameState.guessCount} guesses!</p>
            <form action="/new-game" method="POST">
                <button class="button-primary" type="submit">Play Again</button>
            </form>
         </div>` : '';

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Word Guessing Game</title>
            <link rel="stylesheet" href="game.css">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        </head>
        <body>
            <div class="game-layout">
                <div class="game-header">
                    <p class="game-title">Word Guessing Game</p>
                    <div class="header-actions">
                        <form action="/new-game" method="POST">
                            <button class="button-primary" type="submit">New Game</button>
                        </form>
                        <form action="/logout" method="POST">
                            <button class="button-secondary" type="submit">Logout</button>
                        </form>
                    </div>
                </div>

                <main class="game-container">
                    <div class="game-panel">
                        <div class="input-section">
                            ${winMessage}
                            ${!gameState.isGameWon ? `
                                <form action="/guess" method="POST" class="guess-form">
                                    <label class="input-label" for="guess-input">Enter your guess:</label>
                                    <input type="text" id="guess-input" name="guess" class="guess-input" 
                                           placeholder="Type your guess here..." required>
                                    <button type="submit" class="button-primary">Submit Guess</button>
                                </form>
                                ${errorMessage ? `<p class="error-message">${errorMessage}</p>` : ''}
                            ` : ''}
                        </div>

                        <div class="guesses-section">
                            <p class="section-title">Your Guesses</p>
                            <div class="guesses-list">
                                ${gameState.guesses.map(guess => `
                                    <div class="guess-entry">
                                        <p class="guess-text">${guess.word}</p>
                                        <p class="match-count">${guess.matchedLetters} matches</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="side-panel">
                        <div class="words-section">
                            <p class="section-title">Available Words</p>
                            <div class="word-grid">
                                ${words.map(word => `
                                    <p class="word-item ${guessedWordsSet.has(word.toLowerCase()) ? 'word-guessed' : ''}">${word}</p>
                                `).join('')}
                            </div>
                        </div>

                        <div class="stats-section">
                            <div class="stats-header">
                                <p class="section-title">Game Stats</p>
                                <button class="toggle-button" onclick="toggleStats()">▼</button>
                            </div>
                            <div class="stats-content">
                                <div class="stats-grid">
                                    <div class="stat-item">
                                        <p class="stat-label">Games</p>
                                        <p class="stat-value">${userStats.gamesPlayed}</p>
                                    </div>
                                    <div class="stat-item">
                                        <p class="stat-label">Best</p>
                                        <p class="stat-value">${userStats.personalBest === Infinity ? '-' : userStats.personalBest}</p>
                                    </div>
                                    <div class="stat-item">
                                        <p class="stat-label">Avg</p>
                                        <p class="stat-value">${userStats.averageGuesses ? userStats.averageGuesses.toFixed(1) : '-'}</p>
                                    </div>
                                </div>
                                
                                <div class="leaderboard">
                                    Top Players${leaderboard.slice(0, 5).map((entry, index) => `
                                    <div class="leader-entry">
                                        <div class="leader-name">${index + 1}. ${entry.username}</div>
                                        <div class="leader-score">${entry.score}</div>
                                    </div>
                                `).join('')}                          
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <script>
                function toggleStats() {
                    const content = document.querySelector('.stats-content');
                    const btn = document.querySelector('.toggle-button');
                    content.classList.toggle('collapsed');
                    btn.textContent = content.classList.contains('collapsed') ? '▼' : '▲';
                }
            </script>
        </body>
        </html>
    `;
};

module.exports = gameView;
