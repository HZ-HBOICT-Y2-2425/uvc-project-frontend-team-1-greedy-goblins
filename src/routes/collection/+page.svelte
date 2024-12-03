<script>
  //import {i} from "vite/dist/node/types.d-aGj9QkWt.js";

  export const title = "Collection";

  let collecties = ["groente", "zuivel", "fruit"];
  let kaarten = [
    [{name: "wortels", collected: false}, {name: "aardappel", collected: false}, {name: "radijs", collected: false}, {name: "rode biet", collected: false}],
    [{name: "verse melk", collected: false}, {name: "kaas", collected: false}, {name: "yogurt", collected: false}, {name: "boter", collected: false}],
    [{name: "aardbijen", collected: false}, {name: "appels", collected: false}, {name: "peren", collected: false}, {name: "perzikken", collected: false}]];
  //let objecten = [{name: "wortels", collected: false}];

  function krijgKaart(groep, number) {
    kaarten[groep][number].collected = true
    console.log({number});
    console.log(kaarten[groep[number]]);
  }

  function kwartet(groep) {
    let kwartet = true;
    for (let i = 0; i < kaarten[groep].length; i++) {
      if (kaarten[groep][i].collected === false) {
        kwartet = false
      }
    }
    if (kwartet === true) {
      for (let i = 0; i < kaarten[groep].length; i++) {
        kaarten[groep][i].collected = false;
      }
    }
    console.log(kaarten);
  }
</script>

<div class="p-6">
  <h1 class="text-2xl font-bold">Collection</h1>
  <p>Hier komt je collectieoverzicht.</p>
</div>

<h1>Mijn collectie</h1>

{#each {length: collecties.length} as collectie, i}
  <h2>{collecties[i]}</h2>
  <div class="qwartet">
    {#each {length: kaarten[i].length} as kaart, j}
      <p class={kaarten[i][j].collected ? 'collected' : 'kaart'}>|{kaarten[i][j].name}|</p>
    {/each}
    <button on:click={() => kwartet(i)} class="kaart" style="background-color: yellow">kwartet</button>
  </div>
{/each}

<br>
<p><button on:click={() =>krijgKaart(0, 0)}>kaart 1</button></p>
<p><button on:click={() =>krijgKaart(0, 1)}>kaart 2</button></p>
<p><button on:click={() =>krijgKaart(0, 2)}>kaart 3</button></p>
<p><button on:click={() =>krijgKaart(0, 3)}>kaart 4</button></p>
<br>
<p><button on:click={() =>krijgKaart(1, 0)}>kaart 5</button></p>

<style>
  .qwartet {
    display: flex;
  }

  .kaart {
    margin-left: 5px;
  }

  .collected {
    color: red;
    margin-left: 5px;
  }
</style>
