const orders = {};
let nextOrderId = 1;

function generateOrderId() {
  return `order_${nextOrderId++}`;
}

export function createOrder(username, items, total) {
  const orderId = generateOrderId();
  
  orders[orderId] = {
    id: orderId,
    username,
    items,
    total,
    status: 'pending',
    orderDate: new Date().toISOString()
  };
  
  return orderId;
}

export function getAllOrders() {
  return Object.values(orders).sort((a, b) => 
    new Date(b.orderDate) - new Date(a.orderDate)
  );
}

export function getOrdersByUsername(username) {
  return Object.values(orders)
    .filter(order => order.username === username)
    .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
}

export function getOrderById(orderId) {
  return orders[orderId] || null;
}

export function updateOrderStatus(orderId, status) {
  if (!orders[orderId]) {
    return false;
  }
  
  orders[orderId].status = status;
  orders[orderId].lastUpdated = new Date().toISOString();
  return true;
}

export function deleteOrder(orderId) {
  if (!orders[orderId]) {
    return false;
  }
  
  delete orders[orderId];
  return true;
}

export default {
  createOrder,
  getAllOrders,
  getOrdersByUsername,
  getOrderById,
  updateOrderStatus,
  deleteOrder
};