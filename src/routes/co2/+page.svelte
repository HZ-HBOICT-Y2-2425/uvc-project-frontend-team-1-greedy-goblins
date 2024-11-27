<script>
  // Data and initial state
  let result = 0;
  let product = "kaas";
  let distance = 0;
  let transportType = "vrachtwagen";

  // CO2 calculation function
  /**
   * @param {string} product
   * @param {number} distance
   * @param {string} transportType
   */
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

    // Validate product and transportType to ensure they exist in the corresponding objects
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

  // Handle form submission
  /**
   * @param {{ preventDefault: () => void; }} event
   */
  function handleFormSubmit(event) {
    event.preventDefault();
    if (isNaN(distance) || distance <= 0) {
      alert("Voer een geldige afstand in.");
      return;
    }

    result = calculateCo2Emissions(product, distance, transportType) ?? 0;
    if (result !== undefined) {
      console.log(
        `De geschatte CO2-uitstoot voor ${product} over ${distance} km via ${transportType} is ${result.toFixed(2)} kg.`
      );
    }
  }
</script>

<section class="container">
  <h1>CO2 Calculator</h1>
  <form id="co2Form" on:submit|preventDefault={handleFormSubmit}>
    <label for="product">Product:</label>
    <select id="product" bind:value={product}>
      <option value="kaas">Kaas</option>
      <option value="melk">Melk</option>
      <option value="aardappelen">Aardappelen</option>
      <option value="vlees">Vlees</option>
      <option value="groenten">Groenten</option>
    </select>
    <br /><br />

    <label for="distance">Afstand (km):</label>
    <input
      type="number"
      id="distance"
      placeholder="Voer de afstand in"
      bind:value={distance}
      required
    />
    <br /><br />

    <label for="transportType">Transporttype:</label>
    <select id="transportType" bind:value={transportType}>
      <option value="vrachtwagen">Vrachtwagen</option>
      <option value="schip">Schip</option>
      <option value="vliegtuig">Vliegtuig</option>
    </select>
    <br /><br />

    <button type="submit">Bereken</button>
  </form>

  <section id="result">
    <p>
      De geschatte CO2-uitstoot voor {product} over {distance} km via {transportType}is
      {result.toFixed(2)} kg.
    </p>
  </section>
</section>
