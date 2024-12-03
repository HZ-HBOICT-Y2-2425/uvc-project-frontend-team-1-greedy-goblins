const { calculateCo2Emissions } = require('./calculator');

describe('CO2 emissions calculation', () => {
  test('should calculate CO2 emissions for kaas with vrachtwagen transport', () => {
    const result = calculateCo2Emissions('kaas', 100, 'vrachtwagen');
    expect(result).toBe(12.5);  // 100 km * 0.5 (kaas) * 0.25 (vrachtwagen)
  });

  test('should throw error for unknown product', () => {
    expect(() => calculateCo2Emissions('unknownProduct', 100, 'vrachtwagen')).toThrow('Product unknownProduct is niet bekend.');
  });

  test('should throw error for unknown transport type', () => {
    expect(() => calculateCo2Emissions('kaas', 100, 'unknownTransport')).toThrow('Transporttype unknownTransport is niet bekend.');
  });

  test('should calculate CO2 emissions for vlees with vliegtuig transport', () => {
    const result = calculateCo2Emissions('vlees', 50, 'vliegtuig');
    expect(result).toBe(100);  // 50 km * 1.0 (vlees) * 2.0 (vliegtuig)
  });
});
