<script>
  import { userLocation } from "./userLocation.js";
  import { calculateCo2Emissions, handleFormSubmit } from "./co2Calculator.js";
  import { productEmissionCalculator } from "./productEmissionCalculator.js";
  import { calculateORSRoute } from "./distanceCalculator.js";
  import { orderStore } from "$lib/stores/orderDataStore.js";

  let userLatitude = 0;
  let userLongitude = 0;
  let distance = 0;
  let productEmission = 0;
  let loadingDistance = true;

  // Huidige locatie ophalen en schoolafstand berekenen
  userLocation()
    .then(async (coords) => {
      userLatitude = coords.latitude;
      userLongitude = coords.longitude;
      console.log(
        `Huidige locatie: Latitude: ${userLatitude}, Longitude: ${userLongitude}`
      );

      for (const order of $orderStore.orderStore) {
        // Bereken afstand naar de school
        const routeInfo = await calculateORSRoute(
          userLatitude,
          userLongitude,
          order.storeLatitude,
          order.storeLongitude
        );

        distance = routeInfo.distanceKm;
        console.log(`Afstand tussen huidige locatie en boer: ${distance} km`);

        productEmission = productEmissionCalculator(order.productsOrdered);
      }
    })
    .catch((error) => {
      console.error(
        "Fout bij het berekenen van de Co2 verspilling",
        error.message
      );
      loadingDistance = false;
    });
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
