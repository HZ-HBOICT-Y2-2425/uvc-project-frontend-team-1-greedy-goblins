function calculateCo2Emissions(products, distance, transportType) {
  const productEmissions = {
    kaas: 0.5,
    melk: 0.2,
    aardappelen: 0.1,
    vlees: 1.0,
    groenten: 0.05,
    "Kaasje Jong Belegen": 0.5, // Specifiek voorbeeld
    Boerderijmelk: 0.2,
    "Eieren (6 stuks)": 0.3, // Voorbeeldwaarde
  };

  const transportEmissions = {
    vrachtwagen: 0.25,
    schip: 0.05,
    vliegtuig: 2.0,
  };

  if (!transportEmissions.hasOwnProperty(transportType)) {
    throw new Error(`Transporttype ${transportType} is niet bekend.`);
  }

  const transportFactor = transportEmissions[transportType];

  const totalEmissions = products.reduce((total, product) => {
    const { nameProduct, amountProduct } = product;
    if (!productEmissions.hasOwnProperty(nameProduct)) {
      console.warn(`Product ${nameProduct} is niet bekend.`);
      return total;
    }
    const productFactor = productEmissions[nameProduct];
    return total + amountProduct * distance * productFactor * transportFactor;
  }, 0);

  return totalEmissions;
}

module.exports = { calculateCo2Emissions };
