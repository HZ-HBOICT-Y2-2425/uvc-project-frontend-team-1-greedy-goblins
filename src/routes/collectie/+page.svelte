<script>
    import "../../app.css";

    let kaart2 = false;
    let kaart3 = false;
    let kaart4 = false;
    let kaarten = [[false, false, false, false], [false]];

    function krijgKaart(groep, number) {
        kaarten[groep][number] = true
        console.log({number});
        console.log(kaarten[groep[number]]);
    }

    function kwartet(groep) {
        for (let i = 0; i < kaarten[groep].length; i++) {
            kaarten[groep][i] = false;
        }
        console.log(kaarten);
    }

    function zieCollectie() {
        console.log({kaarten});
    }
</script>

<h1>Mijn collectie</h1>
<h2>Groente</h2>
<div class="qwartet">
    {#if kaarten[0][0] === false}
        <p class="kaart">kaart 1</p>
    {:else }
        <p class="kaart collected">kaart 1</p>
    {/if}
    {#if kaarten[0][1] === false}
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
<h2>Fruit</h2>
<div class="qwartet">
    {#if kaarten[1][0] === false}
        <p class="kaart">kaart 5</p>
    {:else}
        <p class="kaart collected">kaart 5</p>
    {/if}
</div>

<br>
<p><button on:click={() =>krijgKaart(0, 1)}>kaart 1</button></p>
<br>
<p><button on:click={() =>krijgKaart(1, 0)}>kaart 5</button></p>
<p><button on:click={() =>kwartet(0)}>reset</button></p>
<p><button on:click={() => zieCollectie()}>collectie</button></p>

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