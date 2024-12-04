<script>
  import { userLocation } from "./userLocation.js";
  import { calculateCo2Emissions, handleFormSubmit } from "./co2Calculator.js";
  import { calculateORSRoute } from "./distanceCalculator.js";

  let userLatitude = 0;
  let userLongitude = 0;
  let result = 0;
  let product = "kaas";
  let transportType = "vrachtwagen";
  let distance = 0;
  let loadingDistance = true; // Voor laadindicator

  // Huidige locatie ophalen en schoolafstand berekenen
  userLocation()
    .then(async (coords) => {
      userLatitude = coords.latitude;
      userLongitude = coords.longitude;
      console.log(
        `Huidige locatie: Latitude: ${userLatitude}, Longitude: ${userLongitude}`
      );

      try {
        // Bereken afstand naar de school
        const routeInfo = await calculateORSRoute(
          userLatitude,
          userLongitude,
          51.49540710449219,
          3.609536647796631
        );

        distance = routeInfo.distanceKm;
        console.log(`Afstand tussen huidige locatie en school: ${distance} km`);
      } catch (error) {
        console.error("Fout tijdens het berekenen van de afstand: ", error);
        distance = 0;
      } finally {
        loadingDistance = false;
      }
    })
    .catch((error) => {
      console.error("Fout bij het ophalen van de locatie: ", error.message);
      loadingDistance = false;
    });

  // Formulierverwerking
  /**
   * @param {{ preventDefault: () => void; }} event
   */
  function processForm(event) {
    event.preventDefault();
    if (loadingDistance) {
      alert("Wacht totdat de afstand is berekend.");
      return;
    }
    if (distance === 0) {
      alert("Afstand niet beschikbaar. Controleer uw locatie.");
      return;
    }
    result = handleFormSubmit(product, distance, transportType);
    console.log(
      `De geschatte CO2-uitstoot voor ${product} over ${distance} km via ${transportType} is ${result.toFixed(2)} kg.`
    );
  }
</script>

<section class="container">
  <h1>CO2 Calculator</h1>

  {#if loadingDistance}
    <p>Afstand wordt berekend... Even geduld aub.</p>
  {:else}
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
        type="submit"
      >
        Bereken
      </button>
    </form>

    <section id="result">
      <p>
        De geschatte CO2-uitstoot voor {product} over {distance} km via {transportType}
        is
        {result.toFixed(2)} kg.
      </p>
    </section>
  {/if}
</section>
