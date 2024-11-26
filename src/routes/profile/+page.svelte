<script>
    import "../../app.css";
    import { goto } from '$app/navigation';
    export let title = "Profile";
</script>

<i class="fa-regular fa-user fa-xl"></i>
<h1><i class="fa-regular fa-user fa-xl"></i></h1>

<h2><button>Wijzig profiel</button></h2>
<h2><button>Wijzig bestelgegevens</button></h2>
<h2><button on:click={() => goto('/co2')}>CO2 bespaart</button></h2>
<h2><button>Oude bestellingen</button></h2>
<h2><button>Bedrijfs overzicht</button></h2>