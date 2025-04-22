import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import * as users from './users.js';
import * as menuItems from './menu-items.js';
import * as sessions from './sessions.js';
import * as orders from './orders.js';
import * as carts from './carts.js';
import { ERROR_MESSAGES, ORDER_STATUS, CONFIG, REGEX, UI } from './src/constants.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist'))); 

function validateSession(req, res, next) {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSession(sid)) {
    return res.status(401).json({ error: ERROR_MESSAGES.AUTH.AUTH_MISSING });
  }
  const username = sessions.getUsernameFromSession(sid);
  req.username = username;
  next();
}

function validateAdmin(req, res, next) {
  const username = req.username;
  if (username !== 'admin') {
    return res.status(403).json({ error: ERROR_MESSAGES.AUTH.ADMIN_ONLY });
  }
  next();
}

app.post('/api/users', (req, res) => {
  const { username } = req.body;
  
  if (!username || username.trim() === '') {
    return res.status(400).json({ error: ERROR_MESSAGES.AUTH.EMPTY_USERNAME });
  }
  
  if (!REGEX.USERNAME.test(username)) {
    return res.status(400).json({ error: ERROR_MESSAGES.AUTH.INVALID_USERNAME });
  }
  
  if (username === 'dog') {
    return res.status(403).json({ error: ERROR_MESSAGES.AUTH.BANNED_USER });
  }
  
  if (users.isUsernameExists(username)) {
    return res.status(409).json({ error: ERROR_MESSAGES.AUTH.USERNAME_EXISTS });
  }
  
  users.addUser(username);
  
  const sid = sessions.createSession(username);
  res.cookie('sid', sid, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: CONFIG.SESSION_EXPIRY 
  });
  
  res.status(201).json({ username });
});

app.post('/api/sessions', (req, res) => {
  const { username } = req.body;
  
  if(!username || username.trim() === '') {
    return res.status(400).json({ error: ERROR_MESSAGES.AUTH.EMPTY_USERNAME });
  }
  
  if (username === 'dog') {
    return res.status(403).json({ error: ERROR_MESSAGES.AUTH.BANNED_USER });
  }

  if(!username || !REGEX.USERNAME.test(username)) {
    return res.status(400).json({ error: ERROR_MESSAGES.AUTH.INVALID_USERNAME });
  }
  
  if (username === 'admin') {
    const sid = sessions.createSession(username);
    res.cookie('sid', sid, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: CONFIG.SESSION_EXPIRY 
    });
    return res.json({ username });
  }
  
  if (!users.isUsernameExists(username)) {
    return res.status(401).json({ error: ERROR_MESSAGES.AUTH.NOT_REGISTERED });
  }
  
  const sid = sessions.createSession(username);
  res.cookie('sid', sid, {
    httpOnly: true,
    sameSite: 'strict',
    maxAge: CONFIG.SESSION_EXPIRY 
  });
  
  res.json({ username });
});

app.delete('/api/sessions', (req, res) => {
  const sid = req.cookies.sid;
  if (sid) {
    sessions.deleteSession(sid);
    res.clearCookie('sid');
  }
  res.json({ message: 'Logged out' });
});

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  if (!sid || !sessions.isValidSession(sid)) {
    return res.status(401).json({ error: ERROR_MESSAGES.AUTH.AUTH_MISSING });
  }
  
  const username = sessions.getUsernameFromSession(sid);
  res.json({ username });
});

app.get('/api/menu', (req, res) => {
  res.json(menuItems.getAllItems());
});

app.get('/api/menu/:category', (req, res) => {
  const { category } = req.params;
  const items = menuItems.getItemsByCategory(category);
  
  if (!items) {
    return res.status(404).json({ error: ERROR_MESSAGES.MENU.ITEM_NOT_FOUND });
  }
  
  res.json(items);
});

app.post('/api/orders', validateSession, (req, res) => {
  const { items, total } = req.body;
  
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: ERROR_MESSAGES.ORDERS.INVALID_ITEMS });
  }
  
  if (!total || isNaN(total) || total <= 0) {
    return res.status(400).json({ error: ERROR_MESSAGES.MENU.INVALID_PRICE });
  }
  
  const username = req.username;
  const orderId = orders.createOrder(username, items, total);
  
  res.status(201).json({ 
    orderId,
    message: UI.MESSAGES.ORDER_PLACED
  });
});

app.get('/api/orders', validateSession, (req, res) => {
  const username = req.username;
  const userOrders = orders.getOrdersByUsername(username);
  
  res.json(userOrders);
});

app.get('/api/orders/:orderId', validateSession, (req, res) => {
  const { orderId } = req.params;
  const order = orders.getOrderById(orderId);
  
  if (!order) {
    return res.status(404).json({ error: ERROR_MESSAGES.ORDERS.ORDER_NOT_FOUND });
  }
  
  if (order.username !== req.username && req.username !== 'admin') {
    return res.status(403).json({ error: ERROR_MESSAGES.AUTH.ADMIN_ONLY });
  }
  
  res.json(order);
});

app.get('/api/admin/orders', validateSession, validateAdmin, (req, res) => {
  const allOrders = orders.getAllOrders();
  res.json(allOrders);
});

app.patch('/api/admin/orders/:orderId', validateSession, validateAdmin, (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  
  if (!status || !Object.values(ORDER_STATUS).includes(status)) {
    return res.status(400).json({ error: ERROR_MESSAGES.ORDERS.INVALID_STATUS });
  }
  
  const updated = orders.updateOrderStatus(orderId, status);
  
  if (!updated) {
    return res.status(404).json({ error: ERROR_MESSAGES.ORDERS.ORDER_NOT_FOUND });
  }
  
  res.json({ message: UI.MESSAGES.ORDER_STATUS_UPDATED, orderId, status });
});

app.get('/api/cart', validateSession, (req, res) => {
  const username = req.username;
  const userCart = carts.getUserCart(username);
  
  res.json(userCart);
});

app.put('/api/cart', validateSession, (req, res) => {
  const username = req.username;
  const { items } = req.body;
  
  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ error: ERROR_MESSAGES.CART.INVALID_ITEMS });
  }
  
  const updatedCart = carts.updateUserCart(username, items);
  res.json(updatedCart);
});

app.delete('/api/cart', validateSession, (req, res) => {
  const username = req.username;
  carts.clearUserCart(username);
  res.json({ message: UI.MESSAGES.CART_CLEARED });
});

app.patch('/api/admin/menu/:itemId', validateSession, validateAdmin, (req, res) => {
  const { itemId } = req.params;
  const updates = req.body;
  
  const updatedItem = menuItems.updateMenuItem(itemId, updates);
  
  if (!updatedItem) {
    return res.status(404).json({ error: ERROR_MESSAGES.MENU.ITEM_NOT_FOUND });
  }
  
  res.json(updatedItem);
});

app.post('/api/admin/menu', validateSession, validateAdmin, (req, res) => {
  const menuItem = req.body;
  
  if (!menuItem.name || !menuItem.description || !menuItem.price || !menuItem.category) {
    return res.status(400).json({ error: ERROR_MESSAGES.MENU.MISSING_REQUIRED_FIELDS });
  }
  
  const newItem = menuItems.addMenuItem(menuItem);
  
  res.status(201).json(newItem);
});

app.delete('/api/admin/menu/:itemId', validateSession, validateAdmin, (req, res) => {
  const { itemId } = req.params;
  
  const deleted = menuItems.deleteMenuItem(itemId);
  
  if (!deleted) {
    return res.status(404).json({ error: ERROR_MESSAGES.MENU.ITEM_NOT_FOUND });
  }
  
  res.json({ message: UI.MESSAGES.ADMIN_ITEM_DELETE });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: ERROR_MESSAGES.API.SERVER_ERROR });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

