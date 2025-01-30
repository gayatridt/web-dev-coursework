const model = require('./chat-model'); // holds all the non-web logic for managing users/messages
const view = require('./chat-view'); // holds the templates for the generated HTML

const controllers = {};

controllers.viewChat = function( req, res ) {
  res.send(view.chatPage(model));
};

controllers.postMessage = function( req, res ) {
  // Below includes an example of pulling fields from a POST request body
  const { text } = req.body; // You'll need to add something!
  // Fill in here - Do not return HTML, just update server data
  res.redirect('/'); // Redirect to the home page
};

module.exports = controllers;

