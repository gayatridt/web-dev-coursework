import model from "./model.js";

function renderProducts(model, appEl) {
  const productListHtml = Object.values(model.products)
    .map(
      (product) => `
      <div class="product">
        <img src="${product.imgUrl}" alt="this is ${product.name}">
        <p>${product.name} - $${product.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
      </div>`
    )
    .join("");

  let totalQuantity = 0;
  for (const item of Object.values(model.cart)) {
    totalQuantity += item.quantity;
  }

  const viewCart = !model.showCart
    ? `<button id="view-cart" class="view-cart">View Cart (${totalQuantity})</button>`
    : "";

  appEl.innerHTML = `
    <div class="product-list">${productListHtml}</div>
    ${viewCart}
  `;
}

function renderCart(model, appEl) {
  const cartListHtml = Object.values(model.cart)
    .map(
      ({ product, quantity }) => `
      <div class="cart-item">
        <img src="${product.imgUrl}" alt="this is ${product.name}">
        <p>${product.name} - $${product.price.toFixed(2)} x ${quantity} = $${(
        product.price * quantity
      ).toFixed(2)}</p>
        <label for="quantity-${product.id}">Quantity:</label>
        <input type="number" id="quantity-${product.id}" value="${quantity}" data-id="${product.id}" class="update-quantity" />
      </div>`
    )
    .join("");

  let totalPrice = 0;
  for (const { product, quantity } of Object.values(model.cart)) {
    totalPrice += product.price * quantity;
  }

  appEl.innerHTML += `
    <div class="cart ${model.showCart ? "open" : ""}">
      <h2>Cart</h2>
      ${cartListHtml || "<p>Nothing in the cart</p>"}
      <p class="cart-total">Total: $${totalPrice.toFixed(2)}</p>
      <button id="checkout" class="checkout">Checkout</button>
      <button id="hide-cart" class="hide-cart">Hide Cart</button>
    </div>
  `;
}

export default function render(model, appEl) {
  renderProducts(model, appEl);
  if (model.showCart) {
    renderCart(model, appEl);
  }
}