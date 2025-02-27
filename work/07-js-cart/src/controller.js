import model, { addToCart, updateCartQuantity, toggleCartVisibility, checkout } from "./model.js";
import render from "./view.js";

const appEl = document.querySelector("#app");

render(model, appEl);

appEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart")) {
    const productId = parseInt(e.target.dataset.id, 10);
    addToCart(productId);
    render(model, appEl); 
  }

  if (e.target.id === "view-cart" || e.target.id === "hide-cart") {
    toggleCartVisibility();
    render(model, appEl); 
  }

  if (e.target.id === "checkout") {
    checkout();
    render(model, appEl); 
  }
});

appEl.addEventListener("input", (e) => {
  if (e.target.classList.contains("update-quantity")) {
    const productId = parseInt(e.target.dataset.id, 10);
    const quantity = parseInt(e.target.value, 10);
    updateCartQuantity(productId, quantity);
    render(model, appEl); 
  }
});