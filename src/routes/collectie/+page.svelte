<script>
    import "../../app.css";

    let kaart1 = false;
    let kaart2 = false;
    let kaart3 = false;
    let kaart4 = false;
    let kaarten = [kaart1, kaart2, kaart3, kaart4];

    function eersteKaart() {
        kaart1 = kaart1 === false;
    }

    function krijgKaart(number) {
        kaarten[number] = true;
        console.log({number});
        console.log(kaarten[number]);
        console.log(kaart1);
    }

    function kwartet() {
        kaart1 = false;
        kaart2 = false;
        kaart3 = false;
        kaart4 = false;
        for (let i = 0; i < kaarten.length; i++) {
            kaarten[i] = false;
        }
    }
</script>

<h1>Mijn collectie</h1>
<div class="qwartet">
    {#if kaarten[0] === false}
        <p class="kaart">kaart 1</p>
    {:else }
        <p class="kaart collected">kaart 1</p>
    {/if}
    {#if kaart2 === false}
        <p class="kaart">kaart 2</p>
    {:else }
        <p class="kaart collected">kaart 2</p>
    {/if}
    {#if kaart3 === false}
        <p class="kaart">kaart 3</p>
    {:else }
        <p class="kaart collected">kaart 3</p>
    {/if}
    {#if kaart4 === false}
        <p class="kaart">kaart 4</p>
    {:else }
        <p class="kaart collected">kaart 4</p>
    {/if}
</div>

<button on:click={() =>eersteKaart()}>kaart 1 {kaart1}</button>
<p><button on:click={() =>krijgKaart(0)}>kaart 1</button></p>
<p><button on:click={() =>kwartet()}>reset</button></p>

<style>
    .qwartet {
        display: flex;
    }

    .kaart {
        margin-left: 5px;
    }

    .collected {
        color: red;
    }
</style>