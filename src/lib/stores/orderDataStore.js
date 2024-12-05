import { writable } from 'svelte/store';
export const orderStore = writable({

orderStore: [
    {
        id: 1,
        nameStore: "Pitteperk",
        storeAddress: "Kerkstraat 1",
        storeLattitude: "",
        storeLongitude: "",
        productsOrdered: [
            {
                id: 1,
                nameProduct: "Kaas",
                amountProduct: 2,
            },
            {
                id: 2,
                nameProduct: "Melk",
                amountProduct: 3,
            },
            {
                id: 3,
                nameProduct: "Aardappelen",
                amountProduct: 4,
            },
        ],
    },
]


});





