<script>
  import "../app.css";
  import { onMount } from "svelte";
  import MarketBox from "../lib/components/MarketBox.svelte";
  import GoldenBar from "$lib/components/GoldenBar.svelte";
  import { page } from "$app/stores";
  import { userLocation } from "$lib/calculators/userLocation.js";
  import { calculateORSRoute } from "$lib/calculators/distanceCalculator.js";
  import { marketDistances } from "$lib/stores/marketDistances";
  import {
    userLocationStore,
    updateUserLocation,
    hasLocationChanged,
  } from "$lib/stores/userLocationStore.js"; // User location store

  let success = false;

  $: {
    const url = $page.url;
    if (url?.searchParams?.get("success") === "true") {
      showSuccessMessage();
    }
  }

  function showSuccessMessage() {
    success = true;
    setTimeout(() => {
      success = false;
    }, 5000);
  }

  /**
   * Market Data
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

  // On component mount
  onMount(async () => {
    try {
      const response = await fetch(
        "http://localhost:3010/microserviceMarket/market-info"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch market info.");
      }
      marketInfo = await response.json();

      const coords = await userLocation();

      const locationChanged = hasLocationChanged(
        coords.latitude,
        coords.longitude
      );

      updateUserLocation(coords.latitude, coords.longitude);

      await recalculateDistances(
        coords.latitude,
        coords.longitude,
        locationChanged
      );
    } catch (error) {
      console.error("Initialization error:", error);
    }
  });

  const recalculateDistances = async (
    /** @type {number} */ latitude,
    /** @type {number} */ longitude,
    /** @type {boolean} */ locationChanged
  ) => {
    const distances = $marketDistances;

    for (const market of marketInfo) {
      if (
        !locationChanged &&
        distances[market.marketID] &&
        distances[market.marketID] !== 0
      ) {
        continue;
      }

      try {
        const routeInfo = await calculateORSRoute(
          latitude,
          longitude,
          market.marketLatitude,
          market.marketLongitude
        );

        distances[market.marketID] = routeInfo.distanceKm;
      } catch (error) {
        console.error(
          `Error calculating distance for ${market.marketName}:`,
          error
        );
      }
    }

    marketDistances.set(distances);
  };

  $: sortedMarketInfo = marketInfo
    .map((market) => ({
      ...market,
      distance: $marketDistances[market.marketID] || Infinity,
    }))
    .sort((a, b) => a.distance - b.distance);

  $: uniqueCategories = [
    ...new Set(marketInfo.flatMap((info) => info.categories)),
  ];

  $: filteredLocations = sortedMarketInfo.filter(
    (info) =>
      info.marketName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategories.length === 0 ||
        selectedCategories.every((category) =>
          info.categories.includes(category)
        ))
  );

  // Toggle category for filters
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
        <i
          class="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500"
        ></i>
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
  {#if success}
    <div
      class="bg-green-200 px-6 py-4 mx-2 my-4 rounded-md text-lg flex items-center justify-center text-center mx-auto max-w-lg"
    >
      <svg
        viewBox="0 0 24 24"
        class="text-green-600 w-5 h-5 sm:w-5 sm:h-5 mr-3"
      >
        <path
          fill="currentColor"
          d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
        ></path>
      </svg>
      <span class="text-green-800">Je bestelling is geplaatst!!!</span>
    </div>
  {/if}
  <MarketBox {filteredLocations} />
</main>
