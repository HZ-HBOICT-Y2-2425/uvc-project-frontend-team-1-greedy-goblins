<script>
import {goto} from "$app/navigation";
import { page } from "$app/stores";

let errorMessage = ""

function denyPayment() {
    if (document.getElementById("bank nummer").value === "" || document.getElementById("bank wachtwoord").value === "") {
        errorMessage = "één of meerdere van de velden zijn niet ingevuld";
    } else {
        goto("/")
    }
}

/**
 * @type {{ marketName: any; marketAdress: any; marketDesc: any; categories: any[]; }}
 */
let locationData;
/**
 * @type {string | any[]}
 */
let products = [];

$: {
    const { state } = $page;
    // @ts-ignore
    locationData = state?.locationData;
    // @ts-ignore
    products = state?.products ? Object.values(state.products) : [];
}
</script>

<main class="p-4 space-y-8">
  <h1 class="text-center text-6xl">Betaal</h1>

  {#if locationData}
    <section class="bg-gray-100 p-4 rounded shadow-md">
      <h2 class="text-xl font-semibold mb-4">Marktinformatie</h2>
      <p class="text-sm mb-2">
        <strong>Naam:</strong>
        {locationData.marketName}
      </p>
      <p class="text-sm mb-2">
        <strong>Adres:</strong>
        {locationData.marketAdress}
      </p>
    </section>
  {:else}
    <p class="text-center text-gray-500">Geen marktinformatie beschikbaar.</p>
  {/if}

  {#if products.length > 0}
    <section class="bg-gray-100 p-4 rounded shadow-md">
      <h2 class="text-xl font-semibold mb-4">Producten in Winkelwagen</h2>
      <ul class="space-y-4">
        {#each products as product, index}
          <li
            class="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center justify-between"
          >
            <p class="text-sm font-medium">
              <strong>Naam:</strong>
              {product.Name}
            </p>
            <p class="text-sm mt-2 sm:mt-0">
              <strong>Aantal:</strong>
              {product.amountProduct || 1}
            </p>
          </li>
        {/each}
      </ul>
    </section>
  {:else}
    <p class="text-center text-gray-500">Je winkelwagen is leeg.</p>
  {/if}
  <h2 class="text-center text-red-600 text-4xl">Dit is niet een echte betalings pagina, geef niet je echte betalingsgegevens op!!!</h2>

  <div class="flex flex-col justify-center items-center">
    <form>
      <label class="" for="bank nummer">Betaalrekening</label><br>
      <input class="border-2 border-black border-solid" type="text" id="bank nummer" name="bank nummer"><br>
      <label class="" for="bank wachtwoord">wachtwoord</label><br>
      <input class="border-2 border-black border-solid" type="password" id="bank wachtwoord" name="wachtwoord"><br>
    </form>
    <p class="text-red-600">{errorMessage}</p>
    <button
            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-2"
            on:click={() => denyPayment()}>Betaal
    </button>
  </div>

  <h3 class="text-xs text-center">Wij van LGhub zijn niet verantwoordelijk voor jouw gegevens</h3>
</main>
