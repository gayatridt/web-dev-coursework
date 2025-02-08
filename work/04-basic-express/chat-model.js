const defaultAvatar = "/images/default-avatar.jpg";

const users = {
  "Amit": { name: "Amit", avatar: "/images/avatar-amit.jpg" },
  "Bao": { name: "Bao", avatar: "/images/avatar-bao.jpg" },
  "Charles": { name: "Charles", avatar: defaultAvatar },
  "David": { name: "David", avatar: "/images/avatar-david.jpg" },
};

const messages = [ 
  {
    sender: "Amit",
    text: "You up?",
    avatar: "/images/avatar-amit.jpg" 
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
    avatar: "/images/avatar-bao.jpg" 
  }
];

function addMessage({ sender, text }) { 
  const user = users[sender] || { name: sender, avatar: defaultAvatar };
  messages.push({ sender: user.name, text, avatar: user.avatar });
}

const chatModel = {
  users,
  messages,
  addMessage,
};

module.exports = chatModel;

