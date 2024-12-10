import { get } from "svelte/store";
import { productEmissionStore } from "$lib/stores/productsEmissionStore.js";

/**
 * Bereken de totale productemissie voor een bestelling.
 * @param {Array<Object>} productsOrdered - Een lijst van bestelde producten.
 * @returns {number} - Totale CO2-uitstoot in kg.
 */
export function productEmissionCalculator(productsOrdered) {
  const productEmissions = get(productEmissionStore).productEmissionStore;

    let totalEmissions = 0;

    productsOrdered.forEach((product) => {
        const productEmission = productEmissions.find((item) => item.productID === product.id);
        if (productEmission) {
            totalEmissions += productEmission.productEmission * product.amountProduct;
        }
    });

    return totalEmissions;
}
