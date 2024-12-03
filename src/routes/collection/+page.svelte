<script>
  //import {i} from "vite/dist/node/types.d-aGj9QkWt.js";

  export const title = "Collection";

  let collecties = [{name: "groente", qwartet: false}, {name: "zuivel", qwartet:  false}, {name: "fruit", qwartet: false}];
  let kaarten = [
    [{name: "wortels", collected: false}, {name: "aardappel", collected: false}, {name: "radijs", collected: false}, {name: "rode biet", collected: false}],
    [{name: "verse melk", collected: false}, {name: "kaas", collected: false}, {name: "yogurt", collected: false}, {name: "boter", collected: false}],
    [{name: "aardbijen", collected: false}, {name: "appels", collected: false}, {name: "peren", collected: false}, {name: "perzikken", collected: false}]];
  //let objecten = [{name: "wortels", collected: false}];

  let packOpeningKaart1 = "";
  let packOpeningKaart2 = "";
  let packOpeningKaart3 = "";

  function krijgKaart(groep, number) {
    kaarten[groep][number].collected = true
    let qwartet = true;
    for (let i = 0; i < kaarten[groep].length; i++) {
      if (kaarten[groep][i].collected === false) {
        qwartet = false
      }
    }
    if (qwartet) {
      collecties[groep].qwartet = true;
    }
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
    collecties[groep].qwartet = false;
  }

  function packOpening() {
    let randomKaart1 = Math.floor(Math.random() * 4);
    let randomKaart2 = Math.floor(Math.random() * 4);
    let randomKaart3 = Math.floor(Math.random() * 4);
    packOpeningKaart1 ="kaart 1 = " + kaarten[0][randomKaart1].name;
    packOpeningKaart2 = "kaart 2 = " + kaarten[1][randomKaart2].name;
    packOpeningKaart3 = "kaart 3 = " + kaarten[2][randomKaart3].name;



    krijgKaart(0, randomKaart1);
    krijgKaart(1, randomKaart2);
    krijgKaart(2, randomKaart3);
  }
</script>

<div class="p-6">
  <h1 class="text-2xl font-bold">Collection</h1>
  <p>Hier komt je collectieoverzicht.</p>
</div>

<h1>Mijn collectie</h1>

{#each {length: collecties.length} as collectie, i}
  <h2>{collecties[i].name}</h2>
  <div class="qwartet">
    {#each {length: kaarten[i].length} as kaart, j}
      <p class={kaarten[i][j].collected ? 'collected' : 'kaart'}>|{kaarten[i][j].name}|</p>
    {/each}
    {#if collecties[i].qwartet}
    <button on:click={() => kwartet(i)} class="kaart" style="background-color: yellow">kwartet</button>
    {/if}
  </div>
{/each}

<p><button style="padding: 2px 10px 2px 10px; color: white" class="bg-green-500 hover:bg-green-600 rounded-lg" on:click={() =>packOpening()}>Pack Openen</button></p>
<p>{packOpeningKaart1}</p>
<p>{packOpeningKaart2}</p>
<p>{packOpeningKaart3}</p>

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
