const chatView = {
  chatPage: function(model) {
    return `
      <!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Group Chat</title>
          <link rel="stylesheet" href="/chat.css">
        </head>
        <body>
          <div id="chat-app">
            <h1>Group Chat</h1>
            <div class="container">
              <div class="left-column">
                ${this.getUserList(model)}
              </div>
              <div class="right-column">
                ${this.getMessageList(model)}
                ${this.getSendMessageForm(model)}
              </div>
            </div>
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(model) {
    return `
      <div class="message-list">
        <h2>Chat</h2>
        <ol class="messages">
          ${model.messages.map(message => `
            <li>
              <img src="${message.avatar}" alt="${message.sender}'s avatar" class="avatar">
              <span class="sender">${message.sender}</span>
              <span class="text">${message.text}</span>
            </li>
          `).join('')}
        </ol>
      </div>
    `;
  },

  getUserList: function(model) {
    return `
      <div class="user-list">
        <h2>Logged-In Users</h2>
        <ul class="users">
          ${Object.values(model.users).map(user => `
            <li>
              <img src="${user.avatar}" alt="${user.name}'s avatar" class="avatar">
              <span class="username">${user.name}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  },

  getSendMessageForm: function(model) {
    return `
      <form action="/chat" method="POST" class="chat-form">
        <div class="form-group">
          <label for="sender">Select User:</label>
          <select name="sender" id="sender" required>
            ${Object.keys(model.users).map(user => `
              <option value="${user}">${user}</option>
            `).join('')}
          </select>
        </div>
        <div class="form-group">
          <label for="text">Type your message:</label>
          <input type="text" name="text" id="text" placeholder="Enter your message" required>
        </div>
        <button type="submit">Send</button>
      </form>
    `;
  }
};

module.exports = chatView;
