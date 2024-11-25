<script>
    import "../app.css";
    import { goto } from '$app/navigation';
  </script>
  
  <svelte:head>
    <title>Dashboard</title>
    <meta name="description" content="LGHub Dashboard" />
  </svelte:head>
  
  <main class="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4 py-6">
    <button
      on:click={() => goto('/kaart')}
      class="bg-green-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-green-600"
      aria-label="Ga naar Kaart"
    >
      <img src="kaart.png" alt="Kaart" class="h-500 w-500 mb-4" />
      <h2 class="text-lg font-bold">Kaart</h2>
    </button>
  
    <button
      on:click={() => goto('/favorieten')}
      class="bg-yellow-500 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-yellow-600"
      aria-label="Ga naar Favorieten"
    >
      <img src="Logo_LGHub.png" alt="Favorieten" class="h-500 w-500 mb-4" />
      <h2 class="text-lg font-bold">Favorieten</h2>
    </button>
  
    <button
      on:click={() => goto('/collection')}
      class="bg-gray-800 text-white rounded-lg shadow-lg p-6 flex flex-col justify-center items-center hover:bg-gray-900"
      aria-label="Ga naar Collection"
    >
      <img src="collection.png" alt="Collection" class="h-200 w-200 mb-4" />
      <h2 class="text-lg font-bold">Collection</h2>
    </button>
  </main>
