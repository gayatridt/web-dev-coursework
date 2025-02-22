"use strict";

const renderLoginPage = (error) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Login - Word Guessing Game</title>
            <link rel="stylesheet" href="login.css">
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
        </head>
        <body>
            <div class="login-layout">
                <div class="login-container">
                    <p class="login-title">Word Guessing Game</p>
                    <div class="login-card">
                        <p class="welcome-text">Welcome!</p>
                        <form action="/login" method="POST" class="login-form">
                            <div class="input-group">
                                <label for="username" class="input-label">Username:</label>
                                <input type="text" id="username" name="username" 
                                       class="text-input" required 
                                       placeholder="Enter your username">
                            </div>
                            ${error ? `<p class="error-text">${error}</p>` : ''}
                            <button type="submit" class="submit-button">Start Playing</button>
                        </form>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;
};


module.exports = { renderLoginPage };