<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import Products from "$lib/components/Products.svelte";

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

<svelte:head>
  {#if locationData}
    <title>LGHub-{locationData.marketName}</title>
  {:else}
    <title>Loading...</title>
  {/if}
  <meta name="description" content="LGHub MarketOverview" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

{#if locationData}
  <div
    class="relative flex flex-col justify-center items-center border-green-500"
  >
    <img
      src={locationData.marketImage}
      alt={locationData.marketName}
      class=" md:h-1/4 md:w-1/4"
    />
    <div
      class="absolute bottom-0 w-full bg-green-800 bg-opacity-90 text-white text-center py-2"
    >
      <h1 class="text-base font-bold px-2">
        {locationData.marketName}
      </h1>
      <hr />
      <h2 class="text-base font-semibold px-2">
        {locationData.marketAdress}
      </h2>
      <hr />
      <h3 class="text-base font-semibold px-2">
        <p>21 Km verderop</p>
      </h3>
    </div>
  </div>

  <main class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-4">
    <div
      class="bg-cyan-500 text-black rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-cyan-600"
    >
      <p class="font-bold">Omschrijving:</p>
      <p>{locationData.marketDesc}</p>
    </div>

    <div
      class="bg-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-green-600"
    >
      <p class="font-bold">Categoriën:</p>
      <p>{locationData.categories}</p>
    </div>
  </main>

  <div class="bg-yellow-500 text-center py-2 font-bold text-lg">
    Producten bij deze vestiging
  </div>

  <section>
    <Products {locationData} />
  </section>
{:else}
  <p>Loading...</p>
{/if}
