<script>
  /**
   * @type {any[]}
   */
   export let filteredLocations = []; // Ontvangt de data als prop
</script>

<main class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-4 mb-24">
  {#each filteredLocations as marketInfo}
    <button
      on:click={() => window.location.href=`/location/${marketInfo.marketID}`}
      class="bg-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-green-600"
      aria-label={marketInfo.marketName}
    >
      <img
        src="farmer.png"
        alt={marketInfo.marketName}
        class="h-48 w-48 mb-4 object-cover"
      />
      <h2 class="text-lg font-bold">{marketInfo.marketName}</h2>
    </button>
  {/each}
</main>
