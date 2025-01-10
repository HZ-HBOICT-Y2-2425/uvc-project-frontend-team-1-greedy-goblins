<script>
  //import {i} from "vite/dist/node/types.d-aGj9QkWt.js";
  import { onMount } from "svelte";

  export const title = "Collection";

  let collectieInfo = [];

  onMount(async () => {
    const response = await fetch(
      "http://localhost:3010/microserviceCard/collecties"
    );
    collectieInfo = await response.json();
  });

  let collecties = [{name: "groente", qwartet: false, uncollected: "/kaarten/uncollected/Groente_uncollected.png"}, {name: "zuivel", qwartet:  false, uncollected: "/kaarten/uncollected/Zuivel_uncollected.png"}, {name: "fruit", qwartet: false, uncollected: "/kaarten/uncollected/Fruit_uncollected.png"}, {name: "vlees", qwartet: false, uncollected: "/kaarten/uncollected/Vlees_uncollected.png"}, {name: "vis", qwartet: false, uncollected: "/kaarten/uncollected/Vis_uncollected.png"}];
  let kaarten = [
    [{name: "wortels", collected: false, kaart: "/kaarten/groente/Groente_wortels.png"}, {name: "aardappels", collected: false}, {name: "radijs", collected: false}, {name: "rode biet", collected: false}],
    [{name: "verse melk", collected: false}, {name: "kaas", collected: false}, {name: "yogurt", collected: false}, {name: "boter", collected: false}],
    [{name: "aardbijen", collected: false}, {name: "appels", collected: false}, {name: "peren", collected: false}, {name: "perzikken", collected: false}],
    [{name: "kip", collected: false}, {name: "koe", collected: false}, {name: "varken", collected: false}, {name: "schaap", collected: false}],
    [{name: "zalm", collected: false}, {name: "haring", collected: false}, {name: "kabbeljouw", collected: false}, {name: "tonijn", collected: false}]];

  let packOpeningKaart1 = "";
  let packOpeningKaart2 = "";
  let packOpeningKaart3 = "";

  async function krijgKwartet(groep) {
    const url = `http://localhost:3010/microserviceCard/collectie?id=${groep + 1}`;
    try {
      const response = await fetch(url, {
        method: 'PUT'
      });

      const contentType = response.headers.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non Json response from server')
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Somehting went wrong");
      }

      const data = await response.json();
      console.log('Response:', data);
      alert(`Status toggled: ${data.message}`);
    } catch (error) {
      console.error('Error:', error);
      alert(`Error: ${error.message}`);
    }
  }

  async function krijgKaart(groep, number) {
    const url = `http://localhost:3010/microserviceCard/kaart?collectieID=${groep + 1}&kaartID=${(number + 1) + (4 * groep)}`
    if (collectieInfo[groep].kaarten[number].collected === false) {
      try {
        const response = await fetch(url, {
          method: 'PUT',
        });

        // Check for non-JSON responses (like HTML error pages)
        const contentType = response.headers.get('Content-Type');
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Received non-JSON response from server');
        }

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Something went wrong');
        }

        const data = await response.json();
        console.log('Response:', data);
        alert(`je hebt de ${collectieInfo[groep].kaarten[number].Name} kaart gekrekgen!`);
      } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
      }
    }
    console.log(collectieInfo[groep].kaarten[number].collected)
    collectieInfo[groep].kaarten[number].collected = true;
    console.log(collectieInfo[groep].kaarten[number].collected)
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
  //asyncCall()

    /**
     *  for (let i = 0; i < collectieNummers.length; i++) {
     *       //if (collectieInfo[i].kwartet === false) {
     *         let qwartet = true;
     *         for (let j = 0; j < collectieInfo[collectieNummers[i]].kaarten.length; j++) {
     *           let kaarten = []
     *           console.log(collectieInfo[collectieNummers[i]].kaarten)
     *           kaarten[j] = getCards((i + 1), ((j + 1) + (i * 4)))
     *           if (kaarten[j].collected === false) {
     *             console.log(collectieInfo[collectieNummers[i]].kaarten[j].Name)
     *             qwartet = false;
     *             console.log("no kwartet")
     *           }
     *           console.log("kaarten" + kaarten[0].collected)
     *         }
     *         if (qwartet) {
     *           krijgKwartet(i);
     *         }
     *       }
     *     //}
     *  */
  }

  async function getCards(groep, kaart) {
    const url = `http://localhost:3010/microserviceCard/kaart?collectieID=${groep}&kaartID=${kaart}`;
    const response = await fetch(url, {
      method: 'PUT',
    });
    return response
  }

  function resolveAfter2Seconds() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    })
  }

  async function asyncCall() {
    console.log("waiting");
    const result = await resolveAfter2Seconds();
    console.log(result)
  }
</script>

<h1 class="titel">Mijn collectie</h1>
{#if collectieInfo}

  <p style="text-align: center"><button style="padding: 2px 10px 2px 10px; color: white" class="bg-green-500 hover:bg-green-600 rounded-lg" on:click={() =>packOpening(3)}>Pack Openen</button></p>
  <p>{packOpeningKaart1}</p>
  <p>{packOpeningKaart2}</p>
  <p>{packOpeningKaart3}</p>



  {#each collectieInfo as collectie}
    <hr/>
    <h2 class="collectie">{collectie.Name}</h2>
    <div class="qwartet">
      {#each collectie.kaarten as kaart}
        {#if kaart.collected}
          <img class="kaart" alt="{kaart.name}" src="{kaart.img}">
        {:else }
          <img class="kaart" alt="nog niet gekregen" src="{collectie.UncollectedKaart}">
        {/if}
      {/each}
    </div>
    <!-- {#if collectie.kwartet}
    <p style="text-align: center"><button  on:click={() => kwartet(collectie.collectieID)} style="background-color: yellow; padding: 2px 10px 2px 10px" class="rounded-lg">kwartet</button></p>
  {/if} -->
  {/each}
{/if}

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
</style>
