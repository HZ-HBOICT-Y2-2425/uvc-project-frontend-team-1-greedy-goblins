<script>
  import { userLocation } from "./userLocation.js";
  import { calculateCo2Emissions, handleFormSubmit } from "./co2Calculator.js";

  let latitude = 0;
  let longitude = 0;
  let result = 0;
  let product = "kaas";
  let distance = 0;
  let transportType = "vrachtwagen";

  userLocation()
    .then((coords) => {
      latitude = coords.latitude;
      longitude = coords.longitude;
      console.log(
        `Huidige locatie: Latitude: ${latitude}, Longitude: ${longitude}`
      );
    })
    .catch((error) => {
      console.error(error.message);
    });

  // Formulierverwerking
  /**
   * @param {{ preventDefault: () => void; }} event
   */
  function processForm(event) {
    event.preventDefault();
    result = handleFormSubmit(product, distance, transportType);
    console.log(
      `De geschatte CO2-uitstoot voor ${product} over ${distance} km via ${transportType} is ${result.toFixed(2)} kg.`
    );
  }
</script>

<section class="container">
  <h1>CO2 Calculator</h1>
  <form id="co2Form" on:submit|preventDefault={processForm}>
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
      style="border: 1px solid black"
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

    <button
      style="padding: 2px 10px 2px 10px; color: white"
      class="bg-green-500 hover:bg-green-600 rounded-lg"
      type="submit">Bereken</button
    >
  </form>

  <section id="result">
    <p>
      De geschatte CO2-uitstoot voor {product} over {distance} km via {transportType}
      is
      {result.toFixed(2)} kg.
    </p>
  </section>
</section>
