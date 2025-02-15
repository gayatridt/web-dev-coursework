"use strict";

const errorView = (status, message) => {
    let errorMessage;
    if (status === 400) {
        if (message === "") {
            errorMessage = 'Invalid Username! Username cannot be empty. Please enter a username.';
        } else {
            errorMessage = 'Username must contain only letters and numbers.';
        }
    } else if (status === 403) {
        errorMessage = 'Username "dog" is not allowed.';
    } else {
        errorMessage = 'An error occurred. Please try again.';
    }

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/styles.css">
            <title>Error</title>
        </head>
        <body>
            <div class="container">
                <div class="error">
                    <h1>Error: ${status === 400 ? 'Invalid Username' : 'Forbidden'}</h1>
                    <p>${errorMessage}</p>
                    <a href="/">Go back to Login</a>
                </div>
            </div>
        </body>
        </html>
    `;
};

module.exports = errorView;