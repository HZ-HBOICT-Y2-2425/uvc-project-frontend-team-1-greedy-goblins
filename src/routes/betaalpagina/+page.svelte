<script>
  import { page } from "$app/stores";

  /**
   * @type {{ marketName: any; marketAdress: any; marketDesc: any; categories: any[]; }}
   */
  let locationData;
  /**
   * @type {string | any[]}
   */
  let products = [];

  $: {
    const { state } = $page;
    // @ts-ignore
    locationData = state?.locationData;
    // @ts-ignore
    products = state?.products ? Object.values(state.products) : [];
  }
</script>

<main class="p-4 space-y-8">
  <h1 class="text-2xl font-bold text-center">Betaal</h1>

  {#if locationData}
    <section class="bg-gray-100 p-4 rounded shadow-md">
      <h2 class="text-xl font-semibold mb-4">Marktinformatie</h2>
      <p class="text-sm mb-2">
        <strong>Naam:</strong>
        {locationData.marketName}
      </p>
      <p class="text-sm mb-2">
        <strong>Adres:</strong>
        {locationData.marketAdress}
      </p>
    </section>
  {:else}
    <p class="text-center text-gray-500">Geen marktinformatie beschikbaar.</p>
  {/if}

  {#if products.length > 0}
    <section class="bg-gray-100 p-4 rounded shadow-md">
      <h2 class="text-xl font-semibold mb-4">Producten in Winkelwagen</h2>
      <ul class="space-y-4">
        {#each products as product, index}
          <li
            class="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center justify-between"
          >
            <p class="text-sm font-medium">
              <strong>Naam:</strong>
              {product.Name}
            </p>
            <p class="text-sm mt-2 sm:mt-0">
              <strong>Aantal:</strong>
              {product.amountProduct || 1}
            </p>
          </li>
        {/each}
      </ul>
    </section>
  {:else}
    <p class="text-center text-gray-500">Je winkelwagen is leeg.</p>
  {/if}
</main>
