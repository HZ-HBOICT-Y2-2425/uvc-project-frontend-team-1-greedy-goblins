import { writable } from "svelte/store";

// Helperfunctie om op te halen uit localStorage
/**
 * @param {string} key
 * @param {{}} defaultValue
 */
function getFromLocalStorage(key, defaultValue) {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  }
  return defaultValue;
}

// Maak een lokale store
/**
 * @param {string} key
 * @param {{}} initialValue
 */
function createLocalStore(key, initialValue) {
  const storedValue = getFromLocalStorage(key, initialValue);
  const store = writable(storedValue);

  store.subscribe((value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  });

  return store;
}

export const marketDistances = createLocalStore("marketDistances", {});
