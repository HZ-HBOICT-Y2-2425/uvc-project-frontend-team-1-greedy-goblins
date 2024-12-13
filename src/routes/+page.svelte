<script>
  import "../app.css";
  import { onMount } from "svelte";
  import MarketBox from "../lib/components/MarketBox.svelte";
  import GoldenBar from "../lib/components/GoldenBar.svelte";

  /**
   * @type {any[]}
   */
  let marketInfo = []; // ik heb de code hierboven toegevoegd om warnings te vermijden
  let searchQuery = ""; // de standaard search query is leeg
  let showSearch = true; // deze boolean checkt of de zoekbalk is uitgeklapt
  let showFilter = true; // deze boolean checkt of de filter is uitgeklapt
  /**
   * @type {any[]}
   */
  let selectedCategories = []; // de standaard geselecteerde categorieën zijn leeg

  onMount(async () => {
    const response = await fetch("http://localhost:3010/microserviceMarket/MarketInfo");
    marketInfo = await response.json();
  });

  // dit stukje zorgt ervoor dat de categorieën uniek zijn en niet dubbel voorkomen
  $: uniqueCategories = [...new Set(marketInfo.flatMap(info => info.categories))];

  // dit stukje zorgt ervoor dat de zoekbalk en categorie filter werkt
  $: filteredLocations = marketInfo.filter(info =>
    info.marketName.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.every(category => info.categories.includes(category)))
  );

  /**
   * @param {any} category
   */
  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter(c => c !== category);
    } else {
      selectedCategories = [...selectedCategories, category];
    }
  }
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="LGHub Dashboard" />
</svelte:head>

<div class="flex items-center justify-start space-x-4 px-4 mt-3 mb-3 bg-white p-4 rounded-lg shadow-md">

    <!-- <button
    aria-label="Zoeken"
    class="text-white flex flex-col items-center p-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md focus:outline-none"
    on:click={() => showSearch = !showSearch}
  >
    <i class="fa-solid fa-magnifying-glass"></i>
    <span class="text-xs">Zoeken</span>
  </button> -->

  {#if showSearch}
    <input
      type="text"
      placeholder="Zoek..."
      class="p-2 w-64 rounded-lg border border-green-500 bg-green-50 text-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
      bind:value={searchQuery}
    />
  {/if}

  <!-- <button
    aria-label="Filter"
    class="text-white flex flex-col items-center p-2 bg-green-500 hover:bg-green-600 rounded-lg shadow-md focus:outline-none"
    on:click={() => showFilter = !showFilter}
  >
    <i class="fa-solid fa-sliders"></i>
    <span class="text-xs">Filter</span>
  </button> -->

  {#if showFilter}
      <h3 class="text-l font-bold text-green-700">Filter</h3>
      <div class="flex flex-wrap space-x-2">
        {#each uniqueCategories as category}
          <label class="flex items-center space-x-2 bg-green-100 text-green-700 p-2 rounded-lg">
            <input type="checkbox" value={category} on:change={() => toggleCategory(category)} checked={selectedCategories.includes(category)} class="form-checkbox text-green-500" />
            <span>{category}</span>
          </label>
        {/each}
      </div>
  {/if}
</div>

<!-- <GoldenBar>
  <h2 class="text-xl font-bold">Favorieten</h2>
</GoldenBar> -->

<main>
    <MarketBox {filteredLocations} />
</main>