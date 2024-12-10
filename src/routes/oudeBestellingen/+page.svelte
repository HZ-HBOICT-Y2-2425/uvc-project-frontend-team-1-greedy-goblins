<script>
  import { userLocation } from "./userLocation.js";
  import { calculateCo2Emissions } from "./co2Calculator.js";
  import { productEmissionCalculator } from "./productEmissionCalculator.js";
  import { calculateORSRoute } from "./distanceCalculator.js";
  import { orderStore } from "$lib/stores/orderDataStore.js";

  let userLatitude = 0;
  let userLongitude = 0;
  let distance = 0;
  let productEmission = 0;
  let transportEmission = 0.25;
  let totalEmission = 0;
  let loadingDistance = true;

  // Huidige locatie ophalen en schoolafstand berekenen
  userLocation()
    .then(async (coords) => {
      userLatitude = coords.latitude;
      userLongitude = coords.longitude;
      console.log(
        `Huidige locatie: Latitude: ${userLatitude}, Longitude: ${userLongitude}`
      );

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
        console.log(`Afstand tussen huidige locatie en boer: ${distance} km`);

        // Bereken de emissie voor de producten in het order
        productEmission = productEmissionCalculator(order.productsOrdered);

        // Bereken de totale CO2 uitstoot
        totalEmission =
          calculateCo2Emissions(productEmission, distance, transportEmission) ??
          0;

        console.log(`Totale Co2 verspilling: ${totalEmission} kg`);

        // Update de store met de nieuwe totalEmission voor dit order
        orderStore.update((store) => {
          const updatedOrderStore = store.orderStore.map((o) => {
            if (o.id === order.id) {
              return { ...o, totalEmission }; // Werk de emissie bij
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
        <span class="font-bold text-red-500">{order.totalEmission} kg</span>
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
