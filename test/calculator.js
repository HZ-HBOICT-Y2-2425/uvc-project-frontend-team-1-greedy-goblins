function calculateCo2Emissions(product, distance, transportType) {
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
    throw new Error(`Product ${product} is niet bekend.`);
  }
  if (!transportEmissions.hasOwnProperty(transportType)) {
    throw new Error(`Transporttype ${transportType} is niet bekend.`);
  }

  const productFactor = productEmissions[product];
  const transportFactor = transportEmissions[transportType];
  const co2Emissions = distance * productFactor * transportFactor;

  return co2Emissions;
}

module.exports = { calculateCo2Emissions };
