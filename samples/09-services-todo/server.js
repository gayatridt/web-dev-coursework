const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const authController = require('./auth-controller');
const todoController = require('./todo-controller');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());  // Applying to ALL requests (if correct content-type)

// Sessions
app.get('/api/session', authController.checkSession);
app.post('/api/session', authController.createSession);
app.delete('/api/session', authController.endSession);

// Todos
app.get('/api/todos', todoController.getTodos);
app.post('/api/todos', todoController.addTodo);
app.get('/api/todos/:id', todoController.getTodoById);
app.put('/api/todos/:id', todoController.replaceTodoById);
app.patch('/api/todos/:id', todoController.updateTodoById);
app.delete('/api/todos/:id', todoController.removeTodoById);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

