const model = {
  products: {
    1: { id: 1, name: "Jorts", price: 0.99, imgUrl: "http://placehold.co/150x150?text=Jorts" },
    2: { id: 2, name: "Jean", price: 3.14, imgUrl: "http://placehold.co/150x150?text=Jean" },
    3: { id: 3, name: "Nyancat", price: 2.73, imgUrl: "http://placehold.co/150x150?text=Nyancat" },
  },
  cart: {},
  showCart: false,
};

export const addToCart = function (productId) {
  if (model.cart[productId]) {
    model.cart[productId].quantity += 1; 
  } else {
    const product = model.products[productId];
    if (product) {
      model.cart[productId] = { product, quantity: 1 }; 
    }
  }
};

export const updateCartQuantity = function (productId, quantity) {
  if (quantity <= 0) {
    delete model.cart[productId];  
  } else {
    model.cart[productId].quantity = quantity; 
  }
};

export const toggleCartVisibility = function () {
  model.showCart = !model.showCart;
};

export const checkout = function () {
  model.cart = {}; 
  model.showCart = false;
};

export default model;