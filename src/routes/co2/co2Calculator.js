// co2Calculator.js

/**
 * Bereken de CO2-uitstoot.
 * @param {string} product
 * @param {number} distance
 * @param {string} transportType
 * @returns {number | undefined} De geschatte CO2-uitstoot.
 */
export function calculateCo2Emissions(product, distance, transportType) {
    const productEmissions = {
      kaas: 0.5,
      melk: 0.2,
      aardappelen: 0.1,
      vlees: 1.0,
      groenten: 0.05,
    };
  
    const transportEmissions = {
      vrachtwagen: 0.25,
      schip: 0.05,
      vliegtuig: 2.0,
    };
  
    if (!productEmissions.hasOwnProperty(product)) {
      alert(`Product ${product} is niet bekend.`);
      return;
    }
    if (!transportEmissions.hasOwnProperty(transportType)) {
      alert(`Transporttype ${transportType} is niet bekend.`);
      return;
    }
  
    // @ts-ignore
    const productFactor = productEmissions[product];
    // @ts-ignore
    const transportFactor = transportEmissions[transportType];
    const co2Emissions = distance * productFactor * transportFactor;
  
    return co2Emissions;
  }
  
  /**
   * Verwerk het formulier en bereken CO2-uitstoot.
   * @param {string} product
   * @param {number} distance
   * @param {string} transportType
   * @returns {number} De berekende CO2-uitstoot.
   */
  export function handleFormSubmit(product, distance, transportType) {
    if (isNaN(distance) || distance <= 0) {
      alert("Voer een geldige afstand in.");
      return 0;
    }
  
    return calculateCo2Emissions(product, distance, transportType) ?? 0;
  }
  