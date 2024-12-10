<script>
  import { goto } from "$app/navigation";
</script>

<section class="flex flex-col items-center bg-gray-100 min-h-screen pt-8">
  <!-- Profiel pictogram -->
  <div
    class="bg-gray-300 rounded-full w-20 h-20 flex items-center justify-center"
  >
    <i class="fa-regular fa-user fa-xl text-gray-600"></i>
  </div>

  <h2 class="mt-4 text-xl font-semibold text-gray-800">Naam</h2>

  <div class="w-full mt-6 space-y-4 px-6">
    <button
      class="w-full py-3 bg-red-200 hover:bg-red-300 text-gray-800 font-medium"
      type="button"
    >
      Wijzig profiel
    </button>
    <button
      class="w-full py-3 bg-red-200 hover:bg-red-300 text-gray-800 font-medium"
      type="button"
    >
      Wijzig bestelgegevens
    </button>
    <button
      class="w-full py-3 bg-red-200 hover:bg-red-300 text-gray-800 font-medium"
      type="button"
      on:click={() => goto("/co2")}
    >
      CO2 Bespaart
    </button>
    <button
      class="w-full py-3 bg-red-200 hover:bg-red-300 text-gray-800 font-medium"
      type="button"
    >
      Oude bestellingen
    </button>
    <button
      class="w-full py-3 bg-red-200 hover:bg-red-300 text-gray-800 font-medium"
      type="button"
    >
      BedrijfsOverzicht
    </button>
  </div>
</section>
