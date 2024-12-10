<script>
  import { onMount } from "svelte";

  /**
   * @type {{ categories: any[] }}
   */
  export let locationData;

  /**
   * @type {any[]}
   */
  let allCategories = [];
  /**
   * @type {Object}
   */
  let productsByCategory = {};

  // Haal de categorieën op bij onMount
  onMount(async () => {
    const response = await fetch(`http://localhost:3010/microserviceMarket/categorys`);
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

    // Groepeer de producten per categorie
    productsByCategory = relevantCategories.reduce((acc, category) => {
      acc[category.Name] = category.Products;
      return acc;
    }, {});
  }

  $: updateProducts();
</script>

{#if Object.keys(productsByCategory).length > 0}
  <div class="p-4">
    {#each Object.entries(productsByCategory) as [categoryName, products]}
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4">{categoryName}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {#each products as product}
            <div class="border p-4 rounded shadow">
              <h3 class="font-bold">{product.Name}</h3>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{:else}
  <p>Loading products...</p>
{/if}