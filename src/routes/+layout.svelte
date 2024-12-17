<script>
  import "../app.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { goto } from "$app/navigation";
  import ShoppingCart from "$lib/components/ShoppingCart.svelte";
</script>

<header
  class="bg-green-600 text-white flex items-center justify-between h-32 px-6 py-3 w-full"
>
  <div class="flex flex-col items-center gap-2 flex-shrink-0">
    <button
      on:click={() => goto("/profile")}
      aria-label="Gebruiker"
      class="text-white flex flex-col items-center"
    >
      <i class="fa-solid fa-user fa-2x"></i>
      <span class="text-xs">Profiel</span>
    </button>
  </div>

  <div
    class="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center"
  >
    <button
      class="bg-transparent border-none p-0 m-0 flex flex-col items-center justify-center"
      on:click={() => goto("/")}
    >
      <img src="/Logo_LGHub.png" alt="Logo" class="h-20 mb-2 object-contain" />
      <!---Dummy Name-->
      <h1 class="text-lg font-bold">Welkom Dirk</h1>
    </button>
  </div>

  <!-- <div class="flex flex-col items-center gap-2 flex-shrink-0">
    <button
      aria-label="Winkelwagen"
      class="text-white flex flex-col items-center"
      on:click={() => goto("/winkelwagen")}
    >
      <i class="fa-solid fa-cart-shopping fa-2x"></i>
      <span class="text-xs">Winkelwagen</span>
    </button>
  </div> -->
</header>

<main class="pb-20">
  <slot />
</main>
<ShoppingCart />

<footer
  class="fixed bottom-0 left-0 right-0 bg-green-600 text-white flex justify-around items-center py-3"
>
  <!-- <button
    on:click={() => goto("/vrienden")}
    class="flex flex-col items-center"
    aria-label="Ga naar Vrienden"
  >
    <i class="fa-solid fa-user-group fa-2x"></i>
    <span class="text-xs">Vrienden</span>
  </button> -->
  <button
    on:click={() => goto("/kaart")}
    class="flex flex-col items-center"
    aria-label="Ga naar Kaart"
  >
    <i class="fa-solid fa-location-dot fa-2x"></i>
    <span class="text-xs">Kaart</span>
  </button>
  <!-- <button
    on:click={() => goto("/collection")}
    class="flex flex-col items-center"
    aria-label="Ga naar Collectie"
  >
    <i class="fa-solid fa-id-card-clip fa-2x"></i>
    <span class="text-xs">Collectie</span>
  </button> -->

  <button
    on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    class="flex flex-col items-center"
    aria-label="Scroll naar boven"
  >
    <i class="fa-solid fa-arrow-up fa-2x"></i>
    <span class="text-xs">Terug naar boven</span>
  </button>
</footer>
