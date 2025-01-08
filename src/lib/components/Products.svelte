<script>
  // @ts-nocheck

  import { onMount } from "svelte";
  import { placeOrder } from "../../routes/betaalpagina/placeOrder.js";
  import {
    cart,
    addToCart,
    removeFromCart,
    getItemsFromCart,
    resetCart,
  } from "../stores/cartStore";
  import { goto } from "$app/navigation";

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

  /**
   * @param {{ categories: any[]; }} locationData
   */
  function gotoPayment(locationData) {
    const products = getItemsFromCart();
    goto("/betaalpagina", { state: { locationData, products } });
  }

  $: updateProducts();
</script>

{#if Object.keys(productsByCategory).length > 0}
  <div class="p-4 space-y-6">
    {#each Object.entries(productsByCategory) as [categoryName, products]}
      <div class="border-b pb-4 mb-8">
        <h2 class="text-2xl font-bold text-green-700 mb-6 border-b-2 border-green-500 pb-2 text-center"
        >
          {categoryName}
        </h2>
        <div class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"
        >
          {#each products as product}
            <div class="bg-white border border-gray-200 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center"
            >
              <img
                src={product.Image}
                alt={product.Name}
                class="w-24 h-24 object-cover rounded-md mb-4"
              />
              <h3 class="text-lg font-bold text-gray-700 text-center mb-2">
                {product.Name}
              </h3>
              <p class="text-sm text-gray-500 mb-4">
                € {(product.Price || 0).toFixed(2)}
              </p>
              <div class="flex justify-between items-center space-x-4">
                <button
                  class="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
                  aria-label="Remove product"
                  on:click={() =>
                    removeFromCart(product, locationData.marketName)}
                >
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="text-gray-700 font-semibold text-lg">
                  {$cart[locationData.marketName]?.items[product.Name]
                    ?.amountProduct || 0}
                </span>
                <button
                  class="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
                  aria-label="Add product"
                  on:click={() => addToCart(product, locationData)}
                >
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}

    <button
      class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all hover:shadow-lg"
      on:click={() => {
        callOrder(locationData);
        gotoPayment(locationData);
        resetCart();
      }}
    >
      Plaats Bestelling
    </button>
  </div>
{:else}
  <p class="text-center text-gray-600 text-lg">Producten aan het laden...</p>
{/if}
