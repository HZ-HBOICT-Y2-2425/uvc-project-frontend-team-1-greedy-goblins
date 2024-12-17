<script>
  /**
   * @type {any[]}
   */
   export let filteredLocations = []; // Ontvangt de data als prop
</script>

<main class="grid grid-cols-3 sm:grid-cols-5 gap-4 px-4 py-4 mb-24">
  {#each filteredLocations as marketInfo}
    <button
      on:click={() => window.location.href=`/location/${marketInfo.marketID}`}
      class="bg-green-500 text-white rounded-lg shadow-lg p-10 flex flex-col justify-center items-center hover:bg-green-600"
      aria-label={marketInfo.marketName}
    >
      <img
        src="{marketInfo.marketImage}"
        alt={marketInfo.marketName}
        class="mb-4 object-cover"
      />
      <h2 class="text-lg font-bold">{marketInfo.marketName}</h2>
    </button>
  {/each}
</main>
