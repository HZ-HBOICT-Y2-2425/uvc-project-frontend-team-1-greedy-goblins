<script>
  import { onMount } from "svelte";
  import { placeOrder } from "../../routes/location/placeOrder.js";
  import {
    cart,
    addToCart,
    removeFromCart,
    getItemsFromCart,
    resetCart,
  } from "../stores/cartStore";

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

    // Groepeer de producten per categorie
    productsByCategory = relevantCategories.reduce((acc, category) => {
      acc[category.Name] = category.Products;
      return acc;
    }, {});
  }

  /**
   * @param {{ categories: any[]; }} locationData
   */
  function callOrder(locationData) {
    const products = getItemsFromCart();
    placeOrder(locationData, products);
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
              <div class="flex justify-end w-full items-center">
                <button
                  class="fa-solid fa-minus rounded p-2 mt-2"
                  aria-label="Add product"
                  on:click={() => addToCart(product)}
                ></button>
                <span class="mx-2"
                  >{$cart[product.Name]?.amountProduct || 0}</span
                >
                <button
                  class="fa-solid fa-plus rounded p-2 mt-2"
                  aria-label="Remove product"
                  on:click={() => removeFromCart(product)}
                ></button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <button
      class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mb-20"
      on:click={() => {
        callOrder(locationData);
        resetCart();
      }}
    >
      Place Order
    </button>
  </div>
{:else}
  <p>Loading products...</p>
{/if}
