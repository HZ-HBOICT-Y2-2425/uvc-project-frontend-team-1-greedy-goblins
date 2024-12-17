<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Products from "$lib/components/Products.svelte";
  import GoldenBar from "$lib/components/GoldenBar.svelte";

  /**
   * @type * {any}
   */
  let locationData;
  const id = $page.params.id;

  onMount(async () => {
    const response = await fetch(
      `http://localhost:3010/microserviceMarket/MarketInfo/${id}`
    );
    locationData = await response.json();
  });
</script>

{#if locationData}
  <div class="bg-yellow-500 text-center py-2 font-bold text-lg">
    {locationData.marketAdress}
  </div>

  <div
  class=" flex flex-col justify-center items-center"
>
  <img src="{locationData.marketImage}" alt="{locationData.marketName}" class="mb-6 object-cover h-1/4 w-1/4" />
</div>

  <main class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-4 my-2">
    <div
      class="bg-green-600 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center"
    >
      <p class="font-bold">Naam:</p>
      <p>{locationData.marketName}</p>
    </div>

    <div
      class="bg-cyan-600 text-black rounded-lg shadow-lg p-6 flex flex-col justify-center items-center"
    >
      <p class="font-bold">Omschrijving:</p>
      <p>{locationData.marketDesc}</p>
    </div>

    <div
      class="bg-green-600 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center"
    >
      <p class="font-bold">Categoriën:</p>
      <p>{locationData.categories}</p>
    </div>
  </main>

  <GoldenBar>Producten bij deze locatie</GoldenBar>

  <section>
    <Products {locationData} />
  </section>
{:else}
  <p>Aan het laden...</p>
{/if}
