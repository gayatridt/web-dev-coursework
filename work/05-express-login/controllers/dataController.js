"use strict";

const { getUserData, setUserData } = require('../models/userModel');
const homeView = require('../views/homeView');
const errorView = require('../views/errorView');

const renderHomePage = (req, res) => {
    if (req.username) {
        const storedWord = getUserData(req.username);
        res.send(homeView(req.username, storedWord));
    } else {
        res.send(homeView());
    }
};

const updateStoredWord = (req, res) => {
    if (req.username) {
        setUserData(req.username, req.body.storedWord);
        res.redirect('/');
    } else {
        res.status(403).send(errorView(403));
    }
};

module.exports = { renderHomePage, updateStoredWord };