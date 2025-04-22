const userCarts = {};

export function getUserCart(username) {
  return userCarts[username] || [];
}

export function updateUserCart(username, items) {
  userCarts[username] = items;
  return items;
}

export function clearUserCart(username) {
  userCarts[username] = [];
  return true;
}

export function getAllCarts() {
  return userCarts;
}

export default {
  getUserCart,
  updateUserCart,
  clearUserCart,
  getAllCarts
};