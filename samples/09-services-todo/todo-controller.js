const todos = require('./todos');
const sessions = require('./sessions');
const users = require('./users');

const todoController = {};

todoController.getTodos = function(req, res) {
  // Session checks for these are very repetitive - a good place to abstract out
  // I've left the repetitive sections here for ease of learning
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;

  }

  res.json(users.getUserData(username).getTodos());
};

todoController.addTodo = function(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { task } = req.body; // Insufficient Sanitizing! :(

  if(!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }

  const todoList = users.getUserData(username);
  const id = todoList.addTodo(task);

  res.json(todoList.getTodo(id));
};

todoController.getTodoById = function(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const todoList = users.getUserData(username);
  const { id } = req.params;

  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }

  res.json(todoList.getTodo(id));
};

todoController.replaceTodoById = function(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const todoList = users.getUserData(username);
  const { id } = req.params;
  const { task, done=false } = req.body;

  // Full Replacement required on a PUT
  if(!task) {
    res.status(400).json({ error: 'required-task' });
    return;
  }

  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }

  todoList.updateTodo(id, { task, done });

  res.json(todoList.getTodo(id));
};

todoController.updateTodoById = function(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const { task, done } = req.body;
  const todoList = users.getUserData(username);

  if(!todoList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No todo with id ${id}` });
    return;
  }

  todoList.updateTodo(id, { task, done });

  res.json(todoList.getTodo(id));
};

todoController.removeTodoById = function(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { id } = req.params;
  const todoList = users.getUserData(username);
  const exists = todoList.contains(id);

  if(exists) {
    todoList.deleteTodo(id);
  }

  res.json({ message: exists ? `todo ${id} deleted` : `todo ${id} did not exist` });
};

module.exports = todoController;
