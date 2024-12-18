import { writable } from "svelte/store";
import { get } from "svelte/store";

/**
 * @typedef {Object} CartItem
 * @property {string} Name
 * @property {number} amountProduct
 * @property {number} [Price]
 */

/**
 * @typedef {{ location: any, items: Record<string, CartItem> }} CartStoreByMarket
 * @typedef {Record<string, CartStoreByMarket>} CartStore
 */

// Key voor Local Storage
const LOCAL_STORAGE_KEY = "cartStore";

// Functie om data uit Local Storage te laden
function loadCartFromLocalStorage() {
  if (typeof localStorage !== "undefined") {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  }
  return {};
}

// Functie om data op te slaan in Local Storage
/**
 * @param {CartStore} cartData
 */
function saveCartToLocalStorage(cartData) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartData));
  }
}

// Initializeer de cart store
export const cart = writable(/** @type {CartStore} */ (loadCartFromLocalStorage()));

// Abonneer en sla wijzigingen op in Local Storage
cart.subscribe((items) => saveCartToLocalStorage(items));

/**
 * Adds a product to the cart.
 * @param {{ Name: string; Price?: number }} product
 * @param {{ marketName: string; marketAdress: string; marketLatitude: number; marketLongitude: number }} LocationData
 */
export function addToCart(product, LocationData) {
  cart.update((store) => {
    const { marketName, marketAdress, marketLatitude, marketLongitude } = LocationData;

    const newStore = { ...store };

    if (!newStore[marketName]) {
      newStore[marketName] = {
        location: {
          address: marketAdress,
          latitude: marketLatitude,
          longitude: marketLongitude,
        },
        items: {},
      };
    }

    if (newStore[marketName].items[product.Name]) {
      newStore[marketName].items[product.Name].amountProduct += 1;
    } else {
      newStore[marketName].items[product.Name] = { ...product, amountProduct: 1 };
    }

    return newStore;
  });
}

/**
 * Removes a product from the cart.
 * @param {{ Name: string }} product
 * @param {string} marketName
 */
export function removeFromCart(product, marketName) {
  cart.update((store) => {
    const newStore = { ...store };
    if (newStore[marketName]?.items[product.Name]) {
      newStore[marketName].items[product.Name].amountProduct -= 1;

      if (newStore[marketName].items[product.Name].amountProduct === 0) {
        delete newStore[marketName].items[product.Name];
      }

      if (Object.keys(newStore[marketName].items).length === 0) {
        delete newStore[marketName];
      }
    }
    return newStore;
  });
}

/**
 * Reset the cart.
 */
export function resetCart() {
  cart.set({});
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

/**
 * Fetch all items from the cart.
 */
export function getItemsFromCart() {
  return get(cart);
}
