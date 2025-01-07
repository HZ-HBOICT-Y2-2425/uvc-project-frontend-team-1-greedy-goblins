import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';

const storedOrders = isBrowser ? localStorage.getItem('orderStore') : null;
const initialOrders = storedOrders ? JSON.parse(storedOrders) : [];

export const orderStore = writable({
    orderStore: initialOrders
});

if (isBrowser) {
    orderStore.subscribe((value) => {
        localStorage.setItem('orderStore', JSON.stringify(value.orderStore));
    });
}

export function resetOrderStore() {
    orderStore.set({ orderStore: [] });
    if (isBrowser) {
        localStorage.removeItem('orderStore');
    }
}
