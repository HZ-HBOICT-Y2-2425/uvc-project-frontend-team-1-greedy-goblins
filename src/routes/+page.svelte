<script>
  import "../app.css";
  import { onMount } from "svelte";

  /**
   * @type {any[]}
   */
  let location = []; // ik heb de code hierboven toegevoegd om warnings te vermijden
  let searchQuery = ""; // de standaard search query is leeg
  let showSearch = false; // deze boolean checkt of de zoekbalk is uitgeklapt

  onMount(async () => {
    const response = await fetch("http://localhost:3010/microserviceMarket/locations");
    location = await response.json();
  });

  // dit stukje zorgt ervoor dat de zoekbalk filter werkt
  $: filteredLocations = location.filter(locatie =>
    locatie.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="LGHub Dashboard" />
</svelte:head>

<div class="flex items-center justify-start space-x-4 px-4 mt-3 mb-3  ">
  <button
    aria-label="Zoeken"
    class="text-white flex flex-col items-center p-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md focus:outline-none"
    on:click={() => showSearch = !showSearch}
  >
    <i class="fa-solid fa-magnifying-glass"></i>
    <span class="text-xs">Zoeken</span>
  </button>

  <!--
  <button
    aria-label="Filter"
    class="text-white flex flex-col items-center p-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md focus:outline-none"
  >
    <i class="fa-solid fa-sliders"></i>
    <span class="text-xs">Filter</span>
  </button>
  -->

  {#if showSearch}
    <input
      type="text"
      placeholder="Zoek..."
      class="p-2 w-64 rounded-lg border border-green-500 bg-green-50 text-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
      bind:value={searchQuery}
    />
  {/if}
</div>

<div class="bg-yellow-500 text-center py-2 font-bold text-lg">
  Uw favoriete plaatsen
</div>

<main class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-4 mb-24">
  {#each filteredLocations as locatie}
    <button
      class="bg-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-green-600"
      aria-label={locatie.Name}
    >
      <img
        src="farmer.png"
        alt={locatie.Name}
        class="h-48 w-48 mb-4 object-cover"
      />
      <h2 class="text-lg font-bold">{locatie.Name}</h2>
    </button>
  {/each}
</main>
