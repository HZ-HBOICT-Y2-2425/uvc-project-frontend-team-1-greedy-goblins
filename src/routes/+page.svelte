<script>
  import "../app.css";
  import { onMount } from "svelte";
  import MarketBox from "../lib/components/MarketBox.svelte";
  import GoldenBar from "$lib/components/GoldenBar.svelte";

  /**
   * @type {any[]}
   */
  let marketInfo = [];
  let searchQuery = "";
  let showSearch = true;
  let showFilter = false;
  /**
   * @type {any[]}
   */
  let selectedCategories = [];

  onMount(async () => {
    const response = await fetch(
      "http://localhost:3010/microserviceMarket/MarketInfo"
    );
    marketInfo = await response.json();
  });

  $: uniqueCategories = [
    ...new Set(marketInfo.flatMap((info) => info.categories)),
  ];

  $: filteredLocations = marketInfo.filter(
    (info) =>
      info.marketName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.every((category) =>
          info.categories.includes(category)
        ))
  );

  /**
   * @param {any} category
   */
  function toggleCategory(category) {
    if (selectedCategories.includes(category)) {
      selectedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      selectedCategories = [...selectedCategories, category];
    }
  }
</script>

<svelte:head>
  <title>Dashboard</title>
  <meta name="description" content="LGHub Dashboard" />
</svelte:head>

<div class="space-y-3 p-4 bg-gray-50 rounded-lg shadow-sm">
  <div class="flex items-center space-x-2">
    {#if showSearch}
      <div class="relative flex-1">
        <i class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"></i>
        <input 
          type="text"
          placeholder="Zoek..."
          class="w-full pl-10 p-2 rounded-lg border border-green-500 bg-green-50 text-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
          bind:value={searchQuery}
        />
      </div>
    {/if}

    <button
      aria-label="Filter"
      class="flex items-center space-x-1 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md focus:outline-none"
      on:click={() => (showFilter = !showFilter)}
    >
      <i class="fa-solid fa-sliders"></i>
      <span class="text-sm">Filter</span>
    </button>
  </div>

  {#if showFilter}
    <div class="bg-white p-4 border border-gray-200 rounded-lg">
      <h3 class="text-sm font-bold text-green-700 mb-2">Filter by Category</h3>
      <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {#each uniqueCategories as category}
          <label
            class="flex items-center space-x-2 bg-green-100 text-green-700 p-2 rounded-lg"
          >
            <input
              type="checkbox"
              value={category}
              on:change={() => toggleCategory(category)}
              checked={selectedCategories.includes(category)}
              class="form-checkbox text-green-500 w-5 h-5"
            />
            <span class="text-sm">{category}</span>
          </label>
        {/each}
      </div>
    </div>
  {/if}
</div>

<GoldenBar>Locaties bij jou in de buurt</GoldenBar>
<main>
  <MarketBox {filteredLocations} />
</main>
