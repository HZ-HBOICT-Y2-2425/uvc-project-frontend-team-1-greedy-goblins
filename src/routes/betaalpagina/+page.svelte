<script>
  import { goto } from "$app/navigation";
  import { cart, removeFromCart, addToCart } from "$lib/stores/cartStore";

  let errorMessage = "";

  $: totalPrice = Object.values($cart).reduce(
    (acc, store) =>
      acc +
      Object.values(store.items).reduce(
        (storeAcc, item) => storeAcc + (item.Price || 0) * item.amountProduct,
        0
      ),
    0
  );

  function denyPayment() {
    if (
      // @ts-ignore
      document.getElementById("bank nummer").value === "" ||
      // @ts-ignore
      document.getElementById("bank wachtwoord").value === ""
    ) {
      errorMessage = "één of meerdere van de velden zijn niet ingevuld";
    } else {
      goto("/");
    }
  }
</script>

<main class="p-4 space-y-8">
  <h1 class="text-center text-6xl">Betaal</h1>

  <h2 class="text-center text-red-600 text-4xl">
    Dit is niet een echte betalingspagina, geef niet je echte betalingsgegevens
    op!!!
  </h2>

  <div
    class="flex flex-col lg:flex-row lg:justify-around space-y-6 lg:space-y-0 lg:space-x-8"
  >
    {#if Object.keys($cart).length > 0}
      <!-- Winkelmand -->
      <div class="space-y-6 w-full lg:w-2/3">
        {#each Object.entries($cart) as [storeName, storeData]}
          <!-- Winkel- en productenblok -->
          <div
            class="bg-gray-100 border border-gray-200 p-6 rounded-lg shadow-lg"
          >
            <!-- Marktinformatie -->
            <div class="border-b pb-4 mb-4">
              <h3 class="text-2xl font-bold text-green-700 text-center">
                {storeName}
              </h3>
              <p class="text-center text-gray-600">
                {storeData.location.address}
              </p>
            </div>

            <!-- Productenlijst -->
            <ul class="space-y-4">
              {#each Object.entries(storeData.items) as [name, item]}
                <li
                  class="flex justify-between items-center bg-white p-4 rounded-md shadow-sm border border-gray-200"
                >
                  <!-- Productinformatie -->
                  <div>
                    <span class="block text-lg font-medium text-gray-800"
                      >{name}</span
                    >
                    <span class="text-sm text-gray-500"
                      >Prijs: € {(item.Price || 0).toFixed(2)}</span
                    >
                  </div>

                  <!-- Plus en min knoppen -->
                  <div class="flex items-center space-x-2">
                    <!-- Verwijder een item -->
                    <button
                      class="bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition"
                      on:click={() => removeFromCart({ Name: name }, storeName)}
                      aria-label="Verwijder {name} uit winkelmand"
                    >
                      <i class="fa-solid fa-minus"></i>
                    </button>

                    <!-- Producthoeveelheid -->
                    <span class="font-semibold text-gray-800"
                      >{item.amountProduct}</span
                    >

                    <!-- Voeg een item toe -->
                    <button
                      class="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-600 transition"
                      on:click={() =>
                        addToCart(
                          { Name: name, Price: item.Price },
                          {
                            marketName: storeName,
                            marketAdress: storeData.location.address,
                            marketLatitude: storeData.location.latitude,
                            marketLongitude: storeData.location.longitude,
                          }
                        )}
                      aria-label="Voeg {name} toe aan winkelmand"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    {/if}

    <!-- Betaalblok -->
    <div
      class="flex flex-col justify-center items-center bg-gray-100 border border-gray-200 p-4 lg:p-6 rounded-lg shadow-lg w-full lg:w-1/3"
    >
      <form class="space-y-4 w-full max-w-sm">
        <div>
          {#if totalPrice > 0}
            <p class="text-center text-2xl text-gray-800">
              Totaalprijs: €{totalPrice.toFixed(2)}
            </p>
          {/if}
        </div>
        <div>
          <label class="block text-gray-700 font-semibold" for="bank nummer"
            >Betaalrekening</label
          >
          <input
            class="border-2 border-gray-300 w-full p-2 rounded-md"
            type="text"
            id="bank nummer"
            name="bank nummer"
            placeholder="Voer je rekeningnummer in"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-semibold" for="bank wachtwoord"
            >Wachtwoord</label
          >
          <input
            class="border-2 border-gray-300 w-full p-2 rounded-md"
            type="password"
            id="bank wachtwoord"
            name="wachtwoord"
            placeholder="Voer je wachtwoord in"
          />
        </div>
      </form>
      <p class="text-red-600">{errorMessage}</p>
      <button
        class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded mt-4"
        on:click={() => denyPayment()}
      >
        Betaal
      </button>
      <h3 class="text-xs text-center mt-4 text-gray-600">
        Wij van LGhub zijn niet verantwoordelijk voor jouw gegevens.
      </h3>
    </div>
  </div>
</main>
