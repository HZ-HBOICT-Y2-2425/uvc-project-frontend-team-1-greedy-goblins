/**
 * @param {number} productFactor
 * @param {number} distance
 * @param {number} transportFactor
 */
export function calculateCo2Emissions(productFactor, distance, transportFactor) {
let totalEmissions = Math.floor(distance * productFactor * transportFactor);


return totalEmissions;
}