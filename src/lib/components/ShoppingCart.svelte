<script>
  import {
    cart,
    addToCart,
    removeFromCart,
    resetCart,
  } from "../stores/cartStore";
  import { placeOrder } from "../../routes/betaalpagina/placeOrder.js";
  import { goto } from "$app/navigation";
  let isOpen = false;

  // Totale prijs berekenen
  $: totalPrice = Object.values($cart).reduce(
    (acc, store) =>
      acc +
      Object.values(store.items).reduce(
        (storeAcc, item) => storeAcc + (item.Price || 0) * item.amountProduct,
        0
      ),
    0
  );
</script>

<!-- Winkelmand-knop -->
<button
  class="fixed bottom-20 right-6 flex items-center justify-center bg-green-600 text-white w-16 h-16 rounded-full shadow-lg hover:bg-green-500 transition duration-300 ease-in-out"
  on:click={() => (isOpen = !isOpen)}
  aria-label="Toggle winkelmand"
>
  <i class="fa-solid fa-cart-shopping text-2xl"></i>
</button>

<!-- Winkelmandje paneel -->
{#if isOpen}
  <div
    class="fixed bottom-20 right-6 w-72 max-h-[50vh] bg-white border border-gray-200 shadow-lg rounded-lg p-4 overflow-y-auto z-20"
  >
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-700">Jouw Winkelmand</h2>
      <button
        class="text-red-500 hover:text-red-600"
        on:click={() => (isOpen = false)}
        aria-label="Sluit winkelmand"
      >
        <i class="fa-solid fa-xmark text-xl"></i>
      </button>
    </div>

    {#if Object.keys($cart).length > 0}
      {#each Object.entries($cart) as [storeName, storeData]}
        <div class="mb-4 border-b pb-2">
          <h3 class="text-green-600 font-bold">{storeName}</h3>
          <p class="text-sm text-gray-500">{storeData.location.address}</p>

          <!-- Producten per winkel -->
          <ul>
            {#each Object.entries(storeData.items) as [name, item]}
              <li class="flex justify-between items-center py-2">
                <span>{name} ({item.amountProduct})</span>
                <span>€ {(item.Price || 0).toFixed(2)}</span>
                <button
                  class="text-red-500 hover:text-red-600"
                  on:click={() => removeFromCart({ Name: name }, storeName)}
                  aria-label="Verwijder {name} uit winkelmand"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {/each}

      <!-- Totaalprijs -->
      <div class="font-bold text-right mt-2">
        Totale prijs: €{totalPrice.toFixed(2)}
      </div>
    {:else}
      <p class="text-gray-500 text-center">Je winkelmand is leeg.</p>
    {/if}

    <!-- Winkelmand resetten -->
    <button
      class="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
      on:click={() => goto("/betaalpagina")}
      disabled={Object.keys($cart).length === 0}
    >
      Bestellen
    </button>
    <button
      class="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-500"
      on:click={resetCart}
    >
      Leeg winkelmand
    </button>
  </div>
{/if}
