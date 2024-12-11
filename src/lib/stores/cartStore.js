import { writable } from "svelte/store";

/**
 * @typedef {Object} CartItem
 * @property {string} Name - The name of the product.
 * @property {number} quantity - The quantity of the product in the cart.
 */

/**
 * @typedef {Record<string, CartItem>} CartStore
 */

// Initialize the cart store
export const cart = writable(/** @type {CartStore} */ ({}));

/**
 * Adds a product to the cart.
 * @param {{ Name: string; quantity?: number; }} product
 */
export function addToCart(product) {
  cart.update((items) => {
    /** @type {CartStore} */
    const newItems = { ...items };
    if (newItems[product.Name]) {
      newItems[product.Name].quantity += 1;
    } else {
      newItems[product.Name] = { ...product, quantity: 1 };
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
      newItems[product.Name].quantity -= 1;
      if (newItems[product.Name].quantity === 0) {
        delete newItems[product.Name];
      }
    }
    return newItems;
  });
}
