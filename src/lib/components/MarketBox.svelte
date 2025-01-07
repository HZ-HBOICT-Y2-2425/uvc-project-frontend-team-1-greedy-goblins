<script>
  /**
   * @type {any[]}
   */
   export let filteredLocations = []; // Ontvangt de data als prop
</script>

<main class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-4 mb-24">
  {#each filteredLocations as marketInfo}
    <button
      on:click={() => window.location.href=`/location/${marketInfo.marketID}`}
      class="relative text-white rounded-lg shadow-lg overflow-hidden"
      aria-label={marketInfo.marketName}
    >
      <!-- Afbeelding volledig zichtbaar -->
      <img
        src="{marketInfo.marketImage}"
        alt={marketInfo.marketName}
        class="object-cover w-full h-full min-h-32 max-h-40"
      />

      <!-- Overlay-balk onderaan -->
      <div class="absolute bottom-0 w-full bg-green-800 bg-opacity-90 text-white text-center py-2">
        <h2 class="text-base font-bold px-2">{marketInfo.marketName}</h2>
        <hr/>
        <h3 class="text-base font-semibold px-2">{marketInfo.marketAdress}</h3>
      </div>
    </button>
  {/each}
</main>

