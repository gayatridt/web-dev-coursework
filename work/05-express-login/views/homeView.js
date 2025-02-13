"use strict";

const homeView = (username, storedWord = '') => {
    if (username) {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/styles.css">
                <title>Data Page</title>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Welcome, ${username}</h1>
                        <form action="/logout" method="POST">
                            <button type="submit">Logout</button>
                        </form>
                    </div>
                    <div class="data-section">
                        <h2>Your Stored Word: ${storedWord}</h2>
                        <form action="/update-word" method="POST">
                            <label for="storedWord">Change Stored Word:</label>
                            <input type="text" id="storedWord" name="storedWord" value="${storedWord}">
                            <button type="submit">Update</button>
                        </form>
                    </div>
                </div>
            </body>
            </html>
        `;
    } else {
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/styles.css">
                <title>Login</title>
            </head>
            <body>
                <div class="container">
                    <div class="login-section">
                        <h1>Login</h1>
                        <form action="/login" method="POST">
                            <label for="username">Username:</label>
                            <input type="text" id="username" name="username">
                            <button type="submit">Login</button>
                        </form>
                    </div>
                </div>
            </body>
            </html>
        `;
    }
};

module.exports = homeView;