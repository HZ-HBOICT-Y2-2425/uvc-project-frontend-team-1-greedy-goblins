<script>
  //import {i} from "vite/dist/node/types.d-aGj9QkWt.js";

  export const title = "Collection";

  let collecties = [{name: "groente", qwartet: false, uncollected: "/kaarten/uncollected/Groente_uncollected.png"}, {name: "zuivel", qwartet:  false, uncollected: "/kaarten/uncollected/Zuivel_uncollected.png"}, {name: "fruit", qwartet: false, uncollected: "/kaarten/uncollected/Fruit_uncollected.png"}, {name: "vlees", qwartet: false, uncollected: "/kaarten/uncollected/Vlees_uncollected.png"}, {name: "vis", qwartet: false, uncollected: "/kaarten/uncollected/Vis_uncollected.png"}];
  let kaarten = [
    [{name: "wortels", collected: false, kaart: "/kaarten/groente/Groente_wortel.png"}, {name: "aardappel", collected: false}, {name: "radijs", collected: false}, {name: "rode biet", collected: false}],
    [{name: "verse melk", collected: false}, {name: "kaas", collected: false}, {name: "yogurt", collected: false}, {name: "boter", collected: false}],
    [{name: "aardbijen", collected: false}, {name: "appels", collected: false}, {name: "peren", collected: false}, {name: "perzikken", collected: false}],
    [{name: "kip", collected: false}, {name: "koe", collected: false}, {name: "varken", collected: false}, {name: "schaap", collected: false}],
    [{name: "zalm", collected: false}, {name: "haring", collected: false}, {name: "kabbeljouw", collected: false}, {name: "tonijn", collected: false}]];

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
      collectieNummers[i] = randomCollectie;
    }
    /**
     * let randomKaarten = []
     *     for (let i = 0; i < collectieNummers.length; i++) {
     *       let randomKaart = randomNumberGenerator(kaarten[collectieNummers[i]].length)
     *       randomKaarten[i] = randomKaart;
     *       krijgKaart(collectieNummers[i], randomKaarten[i]);
     *     }
     */
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

<h1 class="titel">Mijn collectie</h1>

{#each {length: collecties.length} as collectie, i}
  <h2 class="collectie">{collecties[i].name}</h2>
  <div class="qwartet">
    {#each {length: kaarten[i].length} as kaart, j}
      {#if kaarten[i][j].collected}
        <img class="kaart" alt="{kaarten[i][j].name}" src="{kaarten[i][j].kaart}">
      {:else }
        <img class="kaart" alt="kaart nog niet gekregen" src="{collecties[i].uncollected}">
      {/if}
    {/each}
  </div>
  {#if collecties[i].qwartet}
    <p style="text-align: center"><button  on:click={() => kwartet(i)} style="background-color: yellow; padding: 2px 10px 2px 10px" class="rounded-lg">kwartet</button></p>
  {/if}
{/each}

<p style="text-align: center"><button style="padding: 2px 10px 2px 10px; color: white" class="bg-green-500 hover:bg-green-600 rounded-lg" on:click={() =>packOpening(3)}>Pack Openen</button></p>
<p>{packOpeningKaart1}</p>
<p>{packOpeningKaart2}</p>
<p>{packOpeningKaart3}</p>
<br>
<br>
<br>
<br>

<style>
  .titel {
    text-align: center;
    font-size: 50px;
  }

  .collectie {
    text-align: center;
    font-size: 30px;
  }

  .qwartet {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .kaart {
    margin-left: 5px;
    width: 250px;
  }

  @media only screen and (max-width: 413px) {
    .kaart {
      margin-left: 3px;
      margin-bottom: 3px;
      width: 180px;
    }
  }

  .collected {
    color: red;
    margin-left: 5px;
  }
</style>
