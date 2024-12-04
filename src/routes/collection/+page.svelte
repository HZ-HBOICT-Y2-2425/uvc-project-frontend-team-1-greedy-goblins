<script>
  //import {i} from "vite/dist/node/types.d-aGj9QkWt.js";

  export const title = "Collection";

  let collecties = [{name: "groente", qwartet: false}, {name: "zuivel", qwartet:  false}, {name: "fruit", qwartet: false}, {name: "vlees", qwartet: false}, {name: "placeholder", qwartet: false}];
  let kaarten = [
    [{name: "wortels", collected: false}, {name: "aardappel", collected: false}, {name: "radijs", collected: false}, {name: "rode biet", collected: false}],
    [{name: "verse melk", collected: false}, {name: "kaas", collected: false}, {name: "yogurt", collected: false}, {name: "boter", collected: false}],
    [{name: "aardbijen", collected: false}, {name: "appels", collected: false}, {name: "peren", collected: false}, {name: "perzikken", collected: false}],
    [{name: "kip", collected: false}, {name: "koe", collected: false}, {name: "varken", collected: false}, {name: "schaap", collected: false}],
    [{name: "", collected: false}, {name: "", collected: false}, {name: "", collected: false}, {name: "", collected: false}]];
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

  function randomNumberGenerator(max) {
    return Math.floor(Math.random() * max);
  }

  function packOpening(aantalKaarten) {
    let collectieNummers = [];
    for (let i = 0; i < aantalKaarten; i++) {
      let randomCollectie = randomNumberGenerator(collecties.length);
      for (let j = 0; j <= collectieNummers.length; j++) {
        for (let k = 0; k < collectieNummers.length; k ++) {
          if (randomCollectie === collectieNummers[k]) {
            if (randomCollectie === collecties.length - 1) {
              randomCollectie = 0
            }
            randomCollectie++;
          }
        }
      }
      /*
      if (collectieNummers.length === 0) {
        collectieNummers[i] = randomCollectie;
      } else {
        for (let j = 0; j < collectieNummers.length; j += 0) {
          for (let k = 0; k < collectieNummers.length; k ++) {
            if (randomCollectie === collectieNummers[k]) {
              randomCollectie = randomNumberGenerator(collecties.length);
              duplicate = true;
            } else {
              collectieNummers[i] = randomCollectie;
              j++;
              duplicate = false;
            }
          }
        }
      }
       */
      console.log(randomCollectie);
      collectieNummers[i] = randomCollectie;
    //console.log(collectieNummers);
    }
    let randomKaart1 = randomNumberGenerator(kaarten[collectieNummers[0]].length);
    let randomKaart2 = randomNumberGenerator(kaarten[collectieNummers[1]].length);
    let randomKaart3 = randomNumberGenerator(kaarten[collectieNummers[2]].length);
    packOpeningKaart1 ="kaart 1 = " + kaarten[collectieNummers[0]][randomKaart1].name + ", " + collectieNummers[0];
    packOpeningKaart2 = "kaart 2 = " + kaarten[collectieNummers[1]][randomKaart2].name + ", " + collectieNummers[1];
    packOpeningKaart3 = "kaart 3 = " + kaarten[collectieNummers[2]][randomKaart3].name + ", " + collectieNummers[2];



    krijgKaart(collectieNummers[0], randomKaart1);
    krijgKaart(collectieNummers[1], randomKaart2);
    krijgKaart(collectieNummers[2], randomKaart3);
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

<p><button style="padding: 2px 10px 2px 10px; color: white" class="bg-green-500 hover:bg-green-600 rounded-lg" on:click={() =>packOpening(3)}>Pack Openen</button></p>
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
