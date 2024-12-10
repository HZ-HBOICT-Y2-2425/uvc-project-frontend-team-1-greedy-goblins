<script>
  import { goto } from "$app/navigation";
  import { graphDataStore } from "$lib/stores/graphDataStore.js";
  import { onMount } from "svelte";
  import Chart from "chart.js/auto";

  /** @type {{ storeName: string, storeEmission: number, userEmission: number, totalEmissionSaved: number }[]} */
  let graphData = [];
  /** @type {Chart | null} */
  let chart = null;

  // Haal data op uit de store
  onMount(() => {
    graphDataStore.subscribe((data) => {
      graphData = data.flat();
      createChart();
    });
  });

  // Functie om de grafiek te maken
  function createChart() {
    const canvas = document.getElementById("co2Graph");
    if (canvas) {
      const ctx = /** @type {CanvasRenderingContext2D} */ (
        // @ts-ignore
        canvas.getContext("2d")
      );

      if (chart) {
        chart.destroy();
      }

      chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: graphData.map((entry) => entry.storeName),
          datasets: [
            {
              label: "Winkel CO2-uitstoot (kg)",
              data: graphData.map((entry) => entry.storeEmission),
              borderColor: "rgba(255, 99, 132, 1)",
              tension: 0.4,
            },
            {
              label: "Jouw CO2-uitstoot (kg)",
              data: graphData.map((entry) => entry.userEmission),
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.4,
            },
            {
              label: "Bespaarde CO2 (kg)",
              data: graphData.map((entry) => entry.totalEmissionSaved),
              borderColor: "rgba(54, 162, 235, 1)",
              tension: 0.4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Winkels",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "CO2-uitstoot (kg)",
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
          },
        },
      });
    }
  }
</script>

<button
  class="w-full py-2 bg-red-500 text-white"
  on:click={() => goto("oudeBestellingen")}
>
  Oude Bestellingen
</button>

<div class="w-full h-96">
  <canvas id="co2Graph" class="w-full h-full"></canvas>
</div>
