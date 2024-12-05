<script>
  import { userLocation } from "./userLocation.js";
  import { calculateCo2Emissions, handleFormSubmit } from "./co2Calculator.js";
  import { productEmissionCalculator } from "./productEmissionCalculator.js";
  import { calculateORSRoute } from "./distanceCalculator.js";
  import { orderStore } from "$lib/stores/orderDataStore.js";

  let userLatitude = 0;
  let userLongitude = 0;
  let result = 0;
  let product = "kaas";
  let transportType = "vrachtwagen";
  let distance = 0;
  let loadingDistance = true;
  let ordersWithEmissions = [];

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

  $: {
    ordersWithEmissions = $orderStore.orderStore.map((order) => {
      const totalProductEmission = productEmissionCalculator(
        order.productsOrdered
      );
      return {
        ...order,
        totalProductEmission,
      };
    });
  }
</script>

<section>
  {#each $orderStore.orderStore as order}
    <p>
      {order.id} - {order.nameStore} - {order.storeAddress} -
      {order.productsOrdered.length} producten
    </p>
    <ul>
      {#each order.productsOrdered as product}
        <li>{product.amountProduct}x {product.nameProduct}</li>
      {/each}
    </ul>
  {/each}
</section>
