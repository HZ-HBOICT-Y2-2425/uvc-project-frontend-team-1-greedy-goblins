<script>
  import { onMount } from "svelte";

  /**
   * @type {{ categories: any; }}
   */
  export let locationData;

  /**
   * @type {any[]}
   */
  let allCategories = [];
  /**
   * @type {string | any[]}
   */
  let productsToShow = [];

  // Haal de categorieën op bij onMount
  onMount(async () => {
    const response = await fetch(
      `http://localhost:3010/microserviceMarket/categorys`
    );
    allCategories = await response.json();
    updateProducts();
  });

  // Update de producten op basis van de locatie-categorieën
  function updateProducts() {
    if (!locationData?.categories || !allCategories.length) return;

    // Filter de categorieën die bij deze locatie horen
    const locationCategoryNames = locationData.categories;
    const relevantCategories = allCategories.filter((category) =>
      locationCategoryNames.includes(category.Name)
    );

    // Verzamel de producten uit de relevante categorieën
    productsToShow = relevantCategories.flatMap(
      (category) => category.Products
    );
  }

  $: updateProducts();
</script>

{#if productsToShow.length > 0}
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
    {#each productsToShow as product}
      <div class="border p-4 rounded shadow">
        <h3 class="font-bold">{product.Name}</h3>
      </div>
    {/each}
  </div>
{:else}
  <p>Loading products...</p>
{/if}
