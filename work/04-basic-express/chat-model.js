const users = { // Yes, an object!  Keep this as an object, you may change the usernames and values
  "Amit": "Amit", // The keys let you check to see if the user is logged in
  "Bao": "Bao",  // the values don't really matter, here we reuse the username, but it could be `true`
};

const messages = [ // Notice: An array of objects
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

// Below uses destructuring
function addMessage({ sender, text }) { // Leave this as `sender` - I want to see you solve the name disagreement
  // Fill in!
}

// These files demonstrating various ways of building our exports
// so they are inconsistent in ways "real" projects usually wouldn't want
const chatModel = {
  users,
  messages,
  addMessage,
};

module.exports = chatModel;

