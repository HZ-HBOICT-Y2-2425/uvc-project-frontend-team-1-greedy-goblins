import { calculateCo2Emissions } from "../src/lib/calculators/co2Calculator.mjs";  // adjust if the path is different

describe("calculateCo2Emissions", () => {
  it("should calculate CO2 emissions correctly", () => {
    const productFactor = 2.5;
    const distance = 100; // km
    const transportFactor = 0.15;

    const result = calculateCo2Emissions(productFactor, distance, transportFactor);
    expect(result).toBe(37);  // Math.floor(100 * 2.5 * 0.15) = 37
  });

  it("should return 0 emissions when all parameters are zero", () => {
    const result = calculateCo2Emissions(0, 0, 0);
    expect(result).toBe(0);
  });

  it("should calculate with a large number (edge case)", () => {
    const productFactor = 3;
    const distance = 1000;  // km
    const transportFactor = 0.5;

    const result = calculateCo2Emissions(productFactor, distance, transportFactor);
    expect(result).toBe(1500); // Math.floor(1000 * 3 * 0.5) = 1500
  });
});
