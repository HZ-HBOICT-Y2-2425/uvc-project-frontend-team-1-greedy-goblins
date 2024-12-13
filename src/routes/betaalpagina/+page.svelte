<script>
import {goto} from "$app/navigation";

let errorMessage = ""

function denyPayment() {
    if (document.getElementById("bank nummer").value === "" || document.getElementById("bank wachtwoord").value === "") {
        errorMessage = "één of meerdere van de velden zijn niet ingevuld";
    } else {
        goto("/")
    }
}
</script>

<h1 class="text-center text-6xl">Betaal</h1>
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
