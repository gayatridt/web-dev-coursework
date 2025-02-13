"use strict";

const sessions = {};
const storedWords = {};

const getUserData = (username) => {
    return storedWords[username] || '';
};

const setUserData = (username, word) => {
    storedWords[username] = word;
};

const createSession = (username) => {
    const sid = require('crypto').randomUUID();
    sessions[sid] = { username };
    return sid;
};

const deleteSession = (sid) => {
    delete sessions[sid];
};

const getUsernameFromSession = (sid) => {
    return sessions[sid]?.username;
};

module.exports = {
    getUserData,
    setUserData,
    createSession,
    deleteSession,
    getUsernameFromSession,
};