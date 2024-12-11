import { orderStore } from "$lib/stores/orderDataStore.js";

/**
 * @param {any} locationData
 * @param {import("../../lib/stores/cartStore").CartStore | undefined} [products]
 */
export function placeOrder(locationData, products) {

    // Convert products from object format to the array format required for the order
    const productsOrdered = products ? Object.keys(products).map(productKey => {
        const product = products[productKey];
        return {
            id: product.ProductID,
            nameProduct: product.Name,
            amountProduct: product.amountProduct,
        };
    }) : [];

    // Structure the order object
    const newOrder = {
        id: locationData.marketID,
        nameStore: locationData.marketName,
        storeAddress: locationData.marketAdress,
        storeLatitude: locationData.marketLatitude,
        storeLongitude: locationData.marketLongitude,
        totalEmissionSaved: 0, // Assuming no emission data for now
        productsOrdered: productsOrdered,
    };

    // Push the new order to the store and update localStorage
    orderStore.update(store => {
        const updatedStore = {
            orderStore: [...store.orderStore, newOrder]
        };

        // Update localStorage with the new store value
        localStorage.setItem('orderStore', JSON.stringify(updatedStore.orderStore));
        return updatedStore;
    });
}
