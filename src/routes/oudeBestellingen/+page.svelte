<script>
  import { userLocation } from "./userLocation.js";
  import { calculateCo2Emissions } from "./co2Calculator.js";
  import { productEmissionCalculator } from "./productEmissionCalculator.js";
  import { calculateORSRoute } from "./distanceCalculator.js";
  import { orderStore } from "$lib/stores/orderDataStore.js";

  let userLatitude = 0;
  let userLongitude = 0;
  let distance = 0;
  let productFactor = 0;
  let userEmission = 0;
  let storeEmission = 0;
  let totalEmissionSaved = 0;
  let loadingDistance = true;

  // Huidige locatie ophalen en schoolafstand berekenen
  userLocation()
    .then(async (coords) => {
      userLatitude = coords.latitude;
      userLongitude = coords.longitude;

      // Loop door de orders in de store
      for (const order of $orderStore.orderStore) {
        // Bereken afstand naar de school
        const routeInfo = await calculateORSRoute(
          userLatitude,
          userLongitude,
          order.storeLatitude,
          order.storeLongitude
        );

        distance = routeInfo.distanceKm;

        productFactor = productEmissionCalculator(order.productsOrdered);

        storeEmission = productFactor * 165;

        userEmission =
          calculateCo2Emissions(productFactor, distance, 0.08) ?? 0;

        totalEmissionSaved = Math.floor(storeEmission - userEmission);
        console.log("Total Emission Saved: ", totalEmissionSaved);

        // Update de store met de nieuwe totalEmission voor dit order
        orderStore.update((store) => {
          const updatedOrderStore = store.orderStore.map((o) => {
            if (o.id === order.id) {
              return { ...o, totalEmissionSaved };
            }
            return o;
          });
          return { ...store, orderStore: updatedOrderStore };
        });
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

<section class="space-y-6">
  {#each $orderStore.orderStore as order}
    <div class="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <p class="text-xl font-semibold text-gray-800">
        {order.id} - {order.nameStore} - {order.storeAddress}
      </p>
      <p class="text-gray-600">
        {order.productsOrdered.length} producten - Total Emission:
        <span class="font-bold text-red-500">{order.totalEmissionSaved} kg</span
        >
      </p>
      <ul class="space-y-2">
        {#each order.productsOrdered as product}
          <li class="flex justify-between text-gray-700">
            <span>{product.amountProduct}x {product.nameProduct}</span>
          </li>
        {/each}
      </ul>
    </div>
  {/each}
</section>
