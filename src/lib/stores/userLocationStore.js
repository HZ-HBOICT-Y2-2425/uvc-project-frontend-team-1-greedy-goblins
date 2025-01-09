import { writable } from "svelte/store";

// Key names for local storage
const LAST_LOCATION_KEY_LAT = "userLastLocation_latitude";
const LAST_LOCATION_KEY_LON = "userLastLocation_longitude";

// Helper function to safely access localStorage
const safeGetItem = (/** @type {string} */ key, fallback = null) => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem(key) || fallback;
  }
  return fallback;
};

// Writable store for the user's location
export const userLocationStore = writable({
  latitude: Number(safeGetItem(LAST_LOCATION_KEY_LAT)) || null,
  longitude: Number(safeGetItem(LAST_LOCATION_KEY_LON)) || null,
});

// Function to update the user's location in the store and local storage
export const updateUserLocation = (/** @type {any} */ latitude, /** @type {any} */ longitude) => {
  if (typeof window !== "undefined" && window.localStorage) {
    // Update local storage
    localStorage.setItem(LAST_LOCATION_KEY_LAT, String(latitude));
    localStorage.setItem(LAST_LOCATION_KEY_LON, String(longitude));
  }

  // Update the Svelte store
  userLocationStore.set({ latitude, longitude });
};

// Function to check if the location has changed
export const hasLocationChanged = (/** @type {number} */ newLatitude, /** @type {number} */ newLongitude) => {
  const lastLatitude = Number(safeGetItem(LAST_LOCATION_KEY_LAT));
  const lastLongitude = Number(safeGetItem(LAST_LOCATION_KEY_LON));
  return lastLatitude !== newLatitude || lastLongitude !== newLongitude;
};
