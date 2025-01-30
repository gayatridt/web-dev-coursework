// This object has methods that produce HTML
// - These methods are passed data used to produce the HTML
// - In this case, they are passed the model

const chatView = {
  chatPage: function(model) {
    // chatPage() returns the HTML for the page
    // it calls the other methods to generate the HTML for different sections
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Chat</title>
        </head>
        <body>
          <div id="chat-app">
            ${chatView.getUserList(model)}
            ${chatView.getMessageList(model)}
            ${chatView.getSendMessageForm(model)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(model) {
    return `<ol class="messages">` +
      // Fill in
      // Generate the HTML for the list of messages
      `</ol>`;
  },

  getUserList: function(model) {
    // This is a bit of a complex structure
    // Lookup Object.values() in MDN
    // .map() generates a new array based on calling the callback
    // on each element of the array
    // So this .map() converts the user names to an array of HTML
    // and .join() converts the array of HTML into a single HTML string
    return `<ul class="users">` +
    Object.values(model.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },

  getSendMessageForm: function() {
    // Fill in
    // Generate the HTML for a form to send a message
    return `FIXME`;
  }
};

// These files demonstrating various ways of building our exports
// so they are inconsistent in ways "real" projects usually wouldn't want

module.exports = chatView;
