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

{#if locationData}
  <div class="bg-yellow-500 text-center py-2 font-bold text-lg">
    {locationData.marketAdress}
  </div>

  <main class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-4 my-2">
    <div class="bg-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-green-600"
    >
      <p class="font-bold">Naam:</p>
      <p>{locationData.marketName}</p>
    </div>

    <div class="bg-cyan-500 text-black rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-cyan-600"
    >
      <p class="font-bold">Omschrijving:</p>
      <p>{locationData.marketDesc}</p>
    </div>

    <div class="bg-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-green-600"
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
