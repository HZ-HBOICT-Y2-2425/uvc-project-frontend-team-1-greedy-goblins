<script>
  import {
    cart,
    addToCart,
    removeFromCart,
    resetCart,
  } from "../stores/cartStore";
  let isOpen = false;

  let totalPrice = 0;
  $: totalPrice = Object.values($cart).reduce(
    (acc, item) => acc + (item.Price || 0) * item.amountProduct,
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
    <!-- Winkelmand header -->
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

    <!-- Winkelmand items -->
    {#if Object.keys($cart).length > 0}
      <ul>
        {#each Object.entries($cart) as [name, item]}
          <li class="flex items-center justify-between border-b py-2">
            <span class="text-gray-700">{name} ({item.amountProduct})</span>
            <div class="flex items-center gap-4">
              <span class="text-gray-600">
                € {(item.Price || 0).toFixed(2)}
              </span>
              <button
                class="text-red-500 hover:text-red-600"
                on:click={() => removeFromCart({ Name: name })}
                aria-label="Verwijder item"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </li>
        {/each}
      </ul>

      <!-- Totaalprijs -->
      <div class="mt-4 text-right font-bold text-gray-700">
        Totale prijs: €{totalPrice.toFixed(2)}
      </div>
    {:else}
      <p class="text-gray-500 text-center">Je winkelmand is leeg.</p>
    {/if}

    <!-- Checkout knop -->
    <button
      class="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-500 transition duration-300"
    >
      Ga naar betalen
    </button>
  </div>
{/if}
