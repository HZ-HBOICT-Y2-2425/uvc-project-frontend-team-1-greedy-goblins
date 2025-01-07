import { orderStore } from "$lib/stores/orderDataStore.js";
import { resetCart } from "../../lib/stores/cartStore";

/**
 * @param {object} shoppingCart
 */
export function placeOrder(shoppingCart) {
    
    // Itereer over de stores in de shoppingCart
    const orders = Object.entries(shoppingCart).map(([storeName, storeData]) => {
        const productsOrdered = Object.entries(storeData.items).map(([productName, product]) => {
            return {
                id: product.ProductID || null, // Controleer of ProductID bestaat
                nameProduct: productName,
                amountProduct: product.amountProduct,
            };
        });

        return {
            nameStore: storeName,
            storeAddress: storeData.location.address,
            storeLatitude: storeData.location.latitude || null,
            storeLongitude: storeData.location.longitude || null,
            totalEmissionSaved: 0, // Voeg hier je berekening toe als nodig
            productsOrdered: productsOrdered,
        };
    });

    let newId = 1;
    orderStore.update(store => {
        if (store.orderStore.length > 0) {
            const highestId = Math.max(
                ...store.orderStore.map((/** @type {{ id: string; }} */ order) => parseInt(order.id, 10))
            );
            newId = highestId + 1;
        }

        // Voeg de nieuwe orders toe
        const newOrders = orders.map(order => ({
            id: (newId++).toString(),
            ...order,
        }));

        const updatedStore = {
            orderStore: [...store.orderStore, ...newOrders],
        };

        // Sla de gegevens op in localStorage
        localStorage.setItem('orderStore', JSON.stringify(updatedStore.orderStore));
        resetCart();
        return updatedStore;
    });
}
