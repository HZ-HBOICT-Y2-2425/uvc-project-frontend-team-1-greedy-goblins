<script>
  import "../app.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import { goto } from "$app/navigation";
</script>

<header
  class="bg-green-600 text-white flex items-center justify-between max-h-full px-6 py-2 w-full"
>
  <div class="flex items-center gap-2">
    <button
      class="bg-transparent border-none p-0 m-0 flex flex-col items-center justify-center"
      on:click={() => goto("/")}
    >
      <img src="/Logo_LGHub.png" alt="Logo" class="h-16 object-contain h-" />
    </button>
    <div>
      <h1 class="text-lg font-bold">LGHub</h1>
      <p class="text-sm">Local Groceries Hub</p>
    </div>
  </div>
</header>

<main class="pb-20">
  <slot />
</main>

<footer
  class="fixed bottom-0 left-0 right-0 bg-green-600 text-white flex justify-around items-center py-3"
>
  <button
    on:click={() => goto("/")}
    aria-label="Startpagina"
    class="text-white flex flex-col items-center"
  >
    <i class="fa-solid fa-house fa-2x"></i>
    <span class="text-xs">Startpagina</span>
  </button>
  <button
    on:click={() => goto("/profile")}
    aria-label="Profiel"
    class="text-white flex flex-col items-center"
  >
    <i class="fa-solid fa-user fa-2x"></i>
    <span class="text-xs">Profiel</span>
  </button>
  <button
    on:click={() => goto("/kaart")}
    class="flex flex-col items-center"
    aria-label="Ga naar Kaart"
  >
    <i class="fa-solid fa-location-dot fa-2x"></i>
    <span class="text-xs">Kaart</span>
  </button>
  <button
    on:click={() => goto("/collection")}
    class="flex flex-col items-center"
    aria-label="Ga naar Collectie"
    disabled
  >
    <i class="fa-solid fa-id-card-clip fa-2x"></i>
    <span class="text-xs">Collectie</span>
  </button>

  <button
    on:click={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    class="flex flex-col items-center"
    aria-label="Scroll naar boven"
  >
    <i class="fa-solid fa-arrow-up-long fa-2x"></i>
    <span class="text-xs">Terug naar boven</span>
  </button>
</footer>
