"use strict";

const crypto = require('crypto');

const sessions = {};

function isValidUsername(username) {
    return /^[a-zA-Z0-9]+$/.test(username);
}

function createSession(username) {
    const sid = crypto.randomUUID();
    sessions[sid] = { username };
    return sid;
}

function isValidSession(sid) {
    return !!sessions[sid];
}

function deleteSession(sid) {
    delete sessions[sid];
}

module.exports = {
    sessions,
    isValidUsername,
    createSession,
    isValidSession,
    deleteSession
};