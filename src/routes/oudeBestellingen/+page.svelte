<script>
  import { userLocation } from "./userLocation.js";
  import { calculateCo2Emissions } from "./co2Calculator.js";
  import { productEmissionCalculator } from "./productEmissionCalculator.js";
  import { calculateORSRoute } from "./distanceCalculator.js";
  import { orderStore, resetOrderStore } from "$lib/stores/orderDataStore.js";
  import { goto } from "$app/navigation";
  import { graphDataStore } from "$lib/stores/graphDataStore.js";

  let userLatitude = 0;
  let currentPage = 1;
  const itemsPerPage = 5;
  let userLongitude = 0;
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
        const routeInfo = await calculateORSRoute(
          userLatitude,
          userLongitude,
          order.storeLatitude,
          order.storeLongitude
        );

        distance = routeInfo.distanceKm;
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

      dataLoading = false;
    })
    .catch((error) => {
      console.error(
        "Fout bij het berekenen van de Co2 verspilling",
        error.message
      );
    });
</script>

<button
  class="w-full py-2 text-white rounded disabled:cursor-not-allowed disabled:bg-gray-300 bg-red-600 hover:bg-red-500"
  on:click={() => goto("co2Graph")}
  disabled={dataLoading}
>
  CO2 Grafiek
</button>

<section class="space-y-6">
  {#each paginatedOrders as order}
    <div class="bg-white rounded-lg shadow-lg p-6 space-y-4">
      <p class="text-xl font-semibold text-gray-800">
        {order.nameStore} - {order.storeAddress}
      </p>
      <p class="text-gray-600">
        {order.productsOrdered.length} producten - Total Emission:
        <span class="font-bold text-red-500">
          {#if dataLoading}
            loading....
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
