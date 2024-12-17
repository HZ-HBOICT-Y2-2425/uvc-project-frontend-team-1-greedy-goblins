import { writable } from "svelte/store";
import { get } from "svelte/store";

/**
 * @typedef {Object} CartItem
 * @property {string} Name
 * @property {number} amountProduct
 */

/**
 * @typedef {Record<string, CartItem>} CartStore
 */

// Key voor Local Storage
const LOCAL_STORAGE_KEY = "cartStore";

/**
 * Functie om data uit Local Storage te laden, als het beschikbaar is.
 */
function loadCartFromLocalStorage() {
  if (typeof localStorage !== "undefined") {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  }
  return {};
}

/**
 * Functie om data op te slaan in Local Storage, als het beschikbaar is.
 * @param {CartStore} cartData
 */
function saveCartToLocalStorage(cartData) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartData));
  }
}

// Initializeer de cart store met data uit Local Storage, indien beschikbaar
export const cart = writable(/** @type {CartStore} */ (loadCartFromLocalStorage()));

// Abonneer op wijzigingen in de cart-store en sla ze op in Local Storage
cart.subscribe((items) => {
  saveCartToLocalStorage(items);
});

/**
 * Adds a product to the cart.
 * @param {{ Name: string; quantity?: number; }} product
 */
export function addToCart(product) {
  cart.update((items) => {
    /** @type {CartStore} */
    const newItems = { ...items };
    if (newItems[product.Name]) {
      newItems[product.Name].amountProduct += 1;
    } else {
      newItems[product.Name] = { ...product, amountProduct: 1 };
    }
    return newItems;
  });
}

/**
 * Removes a product from the cart.
 * @param {{ Name: string; quantity?: number; }} product
 */
export function removeFromCart(product) {
  cart.update((items) => {
    /** @type {CartStore} */
    const newItems = { ...items };
    if (newItems[product.Name]) {
      newItems[product.Name].amountProduct -= 1;
      if (newItems[product.Name].amountProduct === 0) {
        delete newItems[product.Name];
      }
    }
    return newItems;
  });
}

/**
 * Fetch all items from the cart.
 */
export function getItemsFromCart() {
  return get(cart);
}

/**
 * Reset the cart and clear local storage.
 */
export function resetCart() {
  cart.set({});
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}
