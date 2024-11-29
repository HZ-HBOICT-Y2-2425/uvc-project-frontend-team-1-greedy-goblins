<script>
  import "../../app.css";
  import { goto } from '$app/navigation';
  export const title = "Profile";
</script>

<h2 style="text-align: center"><i class="fa-regular fa-user fa-xl" style="align-items: center"></i></h2>

<!--
<h2 style="text-align: center"><button>Wijzig profiel</button></h2>
<h2><button>Wijzig bestelgegevens</button></h2>
-->
<h2 style="text-align: center; padding: 10px, 1px"><button style="padding: 2px 10px 2px 10px" class="bg-green-500 hover:bg-green-600 rounded-lg" type="button" on:click={() => goto('/co2')}>CO2 bespaart</button></h2>
<!--
<h2><button>Oude bestellingen</button></h2>
<h2><button>Bedrijfs overzicht</button></h2>
-->