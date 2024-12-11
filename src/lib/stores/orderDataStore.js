import { writable } from 'svelte/store';

// Controleer of localStorage beschikbaar is
const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

// Haal opgeslagen gegevens op uit localStorage (indien beschikbaar)
const storedOrders = isBrowser ? localStorage.getItem('orderStore') : null;
const initialOrders = storedOrders ? JSON.parse(storedOrders) : [];

// Initialiseer de writable store
export const orderStore = writable({
    orderStore: initialOrders
});

// Abonneer op wijzigingen in de store en werk localStorage bij (alleen in de browser)
if (isBrowser) {
    orderStore.subscribe((value) => {
        localStorage.setItem('orderStore', JSON.stringify(value.orderStore));
    });
}
