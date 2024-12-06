import { writable } from 'svelte/store';
export const orderStore = writable({

orderStore: [
    {
        id: 1,
        nameStore: "Pitteperk",
        storeAddress: "Kerkstraat 1",
        storeLatitude: 51.5000009,
        storeLongitude: 3.6762457,
        productsOrdered: [
            {
                id: 1,
                nameProduct: "Kaasje Jong Belegen",
                amountProduct: 2,
            },
            {
                id: 2,
                nameProduct: "Boerderijmelk",
                amountProduct: 1,
            },
            {
                id: 3,
                nameProduct: "Eieren (6 stuks)",
                amountProduct: 2,
            },
        ],
    },    {
        id: 2,
        nameStore: "Pitteperk",
        storeAddress: "Kerkstraat 1",
        storeLatitude: 51.000009,
        storeLongitude: 3.6762457,
        productsOrdered: [
            {
                id: 1,
                nameProduct: "Kaasje Jong Belegen",
                amountProduct: 2,
            },
            {
                id: 2,
                nameProduct: "Boerderijmelk",
                amountProduct: 1,
            },
            {
                id: 3,
                nameProduct: "Eieren (6 stuks)",
                amountProduct: 3,
            },
        ],
    },
]


});





