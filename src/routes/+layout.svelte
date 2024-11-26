<script>
  import "../app.css";
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import {goto} from "$app/navigation";
</script>

<header class="bg-green-600 text-white flex items-center justify-between px-4 py-3">
  <button on:click={() => goto('/')}><img src="Logo_LGHub.png" alt="logo" class="h-20" /></button>
  <h1 class="text-lg font-bold">Welkom, (naam)</h1>
  <button
    on:click={() => goto('/profile')}
    class="h-20 w-20 rounded-full bg-gray-300 text-black"
    aria-label="Open profiel"
  >
    <i class="fa-regular fa-user fa-xl"></i>
  </button>
</header>

<slot />
