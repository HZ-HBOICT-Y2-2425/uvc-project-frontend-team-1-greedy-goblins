<script>
    import "../app.css";
    import { goto } from '$app/navigation';
  </script>
  
  <svelte:head>
    <title>Dashboard</title>
    <meta name="description" content="LGHub Dashboard" />
  </svelte:head>

  <div class="bg-yellow-500 text-center py-2 font-bold text-lg">
    Uw favoriete plaatsen
  </div>  

  <main class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-6">
    <button
      class="bg-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-green-600"
      aria-label="Coop"
    >
      <img src="coop.png" alt="Coop" class="h-500 w-500 mb-4" />
      <h2 class="text-lg font-bold">Coop Ruben Langestraat 2, 4542 AE Hoek</h2>
    </button>
  
    <button
      class="bg-yellow-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-yellow-600"
      aria-label="tollenaar"
    >
      <img src="tollenaar.png" alt="Tollenaar" class="h-500 w-500 mb-4" />
      <h2 class="text-lg font-bold">Boerderijwinkel Tollenaar, Hoekseweg 1, 4542 PT Hoek</h2>
    </button>
  
    <button
      class="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-gray-900"
      aria-label="pitteperk"
    >
      <img src="pitteperk.png" alt="pitteperk" class="h-200 w-200 mb-4" />
      <h2 class="text-lg font-bold">Zorg- en Kaasboerderij Pitteperk, Breeweg 21, 4371 SB Koudekerke</h2>
    </button>

    <div class="bg-yellow-500 text-center py-2 font-bold text-lg">
      Locaties in de buurt
    </div>  

    <button
      class="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-gray-900"
      aria-label="pitteperk"
    >
      <img src="klepperhoeve.png" alt="pitteperk" class="h-200 w-200 mb-4" />
      <h2 class="text-lg font-bold">kinderboerderij klepperhoeve, Meiveldpad 55, 4336 XW Middelburg</h2>
    </button>
  </main>
