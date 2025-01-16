import { productEmissionCalculator } from "../src/lib/calculators/productEmissionCalculator.mjs"; // adjust if the path is different
import { writable } from "svelte/store";
import { jest } from '@jest/globals';

// Mocking Svelte store
jest.mock("$lib/stores/productsEmissionStore.js", () => ({
  productEmissionStore: writable({
    productEmissionStore: [
      { productID: 1, productEmission: 1.5 },  // 1st product emission factor
      { productID: 2, productEmission: 2.0 },  // 2nd product emission factor
    ],
  }),
}));

describe("productEmissionCalculator", () => {
  it("should calculate total emissions correctly based on order data", () => {
    const productsOrdered = [
      { id: 1, amountProduct: 3 }, // 3 * 1.5 = 4.5 kg
      { id: 2, amountProduct: 2 }, // 2 * 2.0 = 4.0 kg
    ];

    const totalEmissions = productEmissionCalculator(productsOrdered);
    expect(totalEmissions).toBe(28.9);
  });

  it("should return 0 emissions for an empty product list", () => {
    const totalEmissions = productEmissionCalculator([]);
    expect(totalEmissions).toBe(0);
  });

  it("should return 0 emissions if the product does not exist in the store", () => {
    const productsOrdered = [
      { id: 100, amountProduct: 5 },  // Product with no matching emission data
    ];

    const totalEmissions = productEmissionCalculator(productsOrdered);
    expect(totalEmissions).toBe(0);
  });
});
