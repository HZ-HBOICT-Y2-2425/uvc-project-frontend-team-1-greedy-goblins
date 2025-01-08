<script lang="ts">
  import { marketDistances } from "$lib/stores/marketDistances";

  export let filteredLocations: {
    marketID: string;
    marketName: string;
    marketImage: string;
    marketAdress: string;
  }[] = [];

  // Zorg ervoor dat `marketDistances` wordt getrokken vanaf de clientzijde
  $: distances = typeof window !== "undefined" ? $marketDistances : {};
</script>

<main
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 py-4 mb-24"
>
  {#each filteredLocations as marketInfo}
    <button
      on:click={() =>
        (window.location.href = `/location/${marketInfo.marketID}`)}
      class="relative text-white rounded-lg shadow-lg overflow-hidden"
      aria-label={marketInfo.marketName}
    >
      <img
        src={marketInfo.marketImage}
        alt={marketInfo.marketName}
        class="object-cover w-full h-full min-h-32 max-h-40"
      />

      <div
        class="absolute bottom-0 w-full bg-green-800 bg-opacity-90 text-white text-center py-2"
      >
        <h2 class="text-base font-bold px-2">{marketInfo.marketName}</h2>
        <hr />
        <h3 class="text-base font-semibold px-2">{marketInfo.marketCity}</h3>

        {#if distances[marketInfo.marketID] !== undefined}
          <p class="text-sm font-light px-2">
            Afstand: {distances[marketInfo.marketID].toFixed(2)} km
          </p>
        {:else}
          <p class="text-sm font-light px-2">Afstand wordt geladen...</p>
        {/if}
      </div>
    </button>
  {/each}
</main>
