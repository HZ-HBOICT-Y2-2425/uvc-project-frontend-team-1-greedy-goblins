import { orderStore } from "$lib/stores/orderDataStore.js";

/**
 * @param {any} locationData
 * @param {import("../../lib/stores/cartStore").CartStore | undefined} [products]
 */
export function placeOrder(locationData, products) {

    const productsOrdered = products ? Object.keys(products).map(productKey => {
        const product = products[productKey];
        return {
            // @ts-ignore
            id: product.ProductID,
            nameProduct: product.Name,
            amountProduct: product.amountProduct,
        };
    }) : [];

    let newId = 1;
    orderStore.update(store => {
        if (store.orderStore.length > 0) {
            const highestId = Math.max(...store.orderStore.map((/** @type {{ id: string; }} */ order) => parseInt(order.id, 10)));
            newId = highestId + 1;
        }

        const newOrder = {
            id: newId.toString(),
            nameStore: locationData.marketName,
            storeAddress: locationData.marketAdress,
            storeLatitude: locationData.marketLatitude,
            storeLongitude: locationData.marketLongitude,
            totalEmissionSaved: 0,
            productsOrdered: productsOrdered,
        };

        const updatedStore = {
            orderStore: [...store.orderStore, newOrder]
        };

        localStorage.setItem('orderStore', JSON.stringify(updatedStore.orderStore));
        return updatedStore;
    });
}
