<script>
  import { userLocation } from "../../lib/calculators/userLocation.js";
  import { calculateCo2Emissions } from "../../lib/calculators/co2Calculator.mjs";
  import { productEmissionCalculator } from "../../lib/calculators/productEmissionCalculator.mjs";
  import { calculateORSRoute } from "$lib/calculators/distanceCalculator.mjs";
  import { orderStore, resetOrderStore } from "$lib/stores/orderDataStore.js";
  import { marketDistances } from "$lib/stores/marketDistances";
  import { graphDataStore } from "$lib/stores/graphDataStore.js";
  import EmissionGraph from "$lib/components/EmissionGraph.svelte";

  let userLatitude = 0;
  let userLongitude = 0;
  let currentPage = 1;
  const itemsPerPage = 5;
  let distance = 0;
  let productFactor = 0;
  let userEmission = 0;
  let storeEmission = 0;
  let totalEmissionSaved = 0;
  let dataLoading = true;

  $: paginatedOrders = [...$orderStore.orderStore]
    .reverse()
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  $: totalPages = Math.ceil($orderStore.orderStore.length / itemsPerPage);

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  function previousPage() {
    if (currentPage > 1) currentPage--;
  }

  userLocation()
    .then(async (coords) => {
      userLatitude = coords.latitude;
      userLongitude = coords.longitude;

      let graphData = [];

      for (const order of $orderStore.orderStore) {
        // Check if the distance is already stored in `marketDistances`
        const preCalculatedDistance = $marketDistances[order.storeID];
        if (preCalculatedDistance !== undefined) {
          // Use the pre-calculated distance from marketDistances store
          distance = preCalculatedDistance;
        } else {
          // If no pre-calculated distance exists, calculate it and update the store
          const routeInfo = await calculateORSRoute(
            userLatitude,
            userLongitude,
            order.storeLatitude,
            order.storeLongitude
          );
          distance = routeInfo.distanceKm;

          // Store the calculated distance in the marketDistances store
          marketDistances.update((distances) => {
            distances[order.storeID] = distance;
            return distances;
          });
        }

        // Emissions calculation using the reused/pre-calculated distance
        productFactor = productEmissionCalculator(order.productsOrdered);
        storeEmission = productFactor * 165 * 0.2;
        userEmission =
          calculateCo2Emissions(productFactor, distance, 0.18) ?? 0;
        totalEmissionSaved = Math.floor(storeEmission - userEmission);

        graphData.push({
          storeName: order.nameStore,
          storeEmission,
          userEmission,
          totalEmissionSaved,
        });

        orderStore.update((store) => {
          const updatedOrderStore = store.orderStore.map(
            (/** @type {{ id: any; }} */ o) => {
              if (o.id === order.id) {
                return { ...o, totalEmissionSaved };
              }
              return o;
            }
          );
          return { ...store, orderStore: updatedOrderStore };
        });
      }

      graphDataStore.set(graphData);
    })
    .catch((error) => {
      console.error(
        "Fout bij het berekenen van de Co2 verspilling",
        error.message
      );
    });

  dataLoading = false;
</script>

<main class="bg-gray-100 p-6 space-y-6">
  <section class="space-y-6">
    <EmissionGraph />
  </section>

  <section class="space-y-6 mt-12">
    {#each paginatedOrders as order}
      <div class="bg-white rounded-lg shadow-lg p-6 space-y-4">
        <p class="text-xl font-semibold text-gray-800">
          {order.nameStore} - {order.storeAddress}
        </p>
        <p class="text-gray-600">
          {order.productsOrdered.length} product(en) - Bespaarde
          <abbr title="Ten opzichte van de gebruikelijke uitstoot"
          >CO2 uitstoot</abbr
          >:
          <span class="font-bold text-green-500">
            {#if dataLoading}
              Aan het laden....
            {:else}
              {order.totalEmissionSaved} kg
            {/if}
          </span>
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

    <div class="flex justify-between items-center">
      <button
        class="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
        on:click={previousPage}
        disabled={currentPage === 1}
      >
        Vorige
      </button>
      <span class="text-gray-600 mb-40">
        Pagina {currentPage} van {totalPages}
      </span>
      <button
        class="px-4 py-2 bg-gray-200 text-gray-600 rounded disabled:opacity-50"
        on:click={nextPage}
        disabled={currentPage === totalPages}
      >
        Volgende
      </button>
    </div>
  </section>
</main>
