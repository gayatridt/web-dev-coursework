const model = require('./chat-model'); 
const view = require('./chat-view'); 

const controllers = {};

controllers.viewChat = function( req, res ) {
  res.send(view.chatPage(model));
};

controllers.postMessage = function( req, res ) {
  const { sender, text } = req.body; 
  if(sender && text) {
    model.addMessage({ sender, text });
  }
  res.redirect('/'); 
};

module.exports = controllers;

