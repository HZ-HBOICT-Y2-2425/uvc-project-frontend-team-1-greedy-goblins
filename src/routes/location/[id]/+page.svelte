<script>
  import { onMount } from "svelte";
  import { page } from "$app/stores";

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

  <main class="grid grid-cols-1 gap-4 px-4 py-4 mb-24">
    <section
      class="bg-green-500 text-white rounded-lg shadow-lg p-3 flex flex-col justify-center items-center"
    >
      <p class="font-bold">Naam:</p>
      <p>{locationData.marketName}</p>
    </section>

    <section
      class="bg-green-700 text-white rounded-lg shadow-lg p-3 flex flex-col justify-center items-center"
    >
      <p class="font-bold">Categoriën:</p>
      <p>{locationData.categories}</p>
    </section>

    <section
      class="bg-green-500 text-black rounded-lg shadow-lg p-12 mx-8 flex flex-col justify-center items-center"
    >
      <p class="font-bold">Omschrijving:</p>
      <p>{locationData.marketDesc}</p>
    </section>
  </main>

  <div class="bg-yellow-500 text-center py-2 font-bold text-lg">
    Producten bij deze vestiging
  </div>
{:else}
  <p>Loading...</p>
{/if}
