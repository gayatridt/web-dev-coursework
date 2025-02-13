"use strict";

const { createSession, deleteSession, getUsernameFromSession } = require('../models/userModel');
const errorView = require('../views/errorView');

const loginUser = (req, res) => {
    const username = req.body.username.trim(); 

    // Check for empty username
    if (!username) {
        return res.status(400).send(errorView(400, ""));
    }

    // Check for forbidden username
    if (username === 'dog') {
        return res.status(403).send(errorView(403));
    }

    // Check for invalid characters (non-alphanumeric)
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
        return res.status(400).send(errorView(400));
    }

    // If all checks pass, create a session and redirect
    const sid = createSession(username);
    res.cookie('sid', sid, { httpOnly: true });
    res.redirect('/');
};

const logoutUser = (req, res) => {
    const sid = req.cookies.sid;
    deleteSession(sid);
    res.clearCookie('sid');
    res.redirect('/');
};

const checkSession = (req, res, next) => {
    const sid = req.cookies.sid;
    req.username = getUsernameFromSession(sid);
    next();
};

module.exports = { loginUser, logoutUser, checkSession };