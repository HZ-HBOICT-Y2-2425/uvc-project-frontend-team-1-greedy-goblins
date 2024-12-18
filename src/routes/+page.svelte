<script>
  import "../app.css";
  import { onMount } from "svelte";
  import MarketBox from "../lib/components/MarketBox.svelte";

  /**
   * @type {any[]}
   */
  let marketInfo = [];
  let searchQuery = "";
  let showSearch = true;
  let showFilter = false;
  let userLocation = { lat: null, lng: null }; // Huidige locatie van gebruiker
  /**
   * @type {any[]}
   */
  let selectedCategories = [];

  onMount(async () => {
    // Fetch de marketInfo data
    const response = await fetch("http://localhost:3010/microserviceMarket/MarketInfo");
    marketInfo = await response.json();

    // Huidige locatie ophalen
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        userLocation = {
          // @ts-ignore
          lat: position.coords.latitude,
          // @ts-ignore
          lng: position.coords.longitude,
        };

        console.log("Huidige locatie:", userLocation);

        // Bereken de afstand naar elke market
        marketInfo.forEach((info) => {
          if (userLocation.lat && userLocation.lng) {
            const distance = calculateDistance(
              userLocation.lat,
              userLocation.lng,
              info.marketLatitude,
              info.marketLongitude
            ).toFixed(2);

            console.log(`Afstand naar ${info.marketName}: ${distance} km`);
          }
        });
      });
    } else {
      console.error("Locatiebepaling is niet beschikbaar in deze browser.");
    }
  });

  /**
   * @param {number} lat1
   * @param {number} lon1
   * @param {number} lat2
   * @param {number} lon2
   */
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const toRad = (/** @type {number} */ x) => (x * Math.PI) / 180;
    const R = 6371; // Straal van de aarde in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Afstand in kilometers
  }


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
      <input
        type="text"
        placeholder="Zoek..."
        class="flex-1 p-2 rounded-lg border border-green-500 bg-green-50 text-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
        bind:value={searchQuery}
      />
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
          <label class="flex items-center space-x-2 bg-green-100 text-green-700 p-2 rounded-lg"
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

<main>
  <MarketBox {filteredLocations} />
</main>
