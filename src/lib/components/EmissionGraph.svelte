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

      // Bereken de totalen
      const totalStoreEmission = graphData.reduce(
        (sum, entry) => sum + entry.storeEmission,
        0
      );
      const totalUserEmission = graphData.reduce(
        (sum, entry) => sum + entry.userEmission,
        0
      );
      const totalEmissionSaved = graphData.reduce(
        (sum, entry) => sum + entry.totalEmissionSaved,
        0
      );

      chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Totaal"],
          datasets: [
            {
              label: "Winkel CO2-uitstoot (kg)",
              data: [totalStoreEmission],
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
              borderWidth: 1,
            },
            {
              label: "Jouw CO2-uitstoot (kg)",
              data: [totalUserEmission],
              backgroundColor: "rgba(75, 192, 192, 0.5)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
            {
              label: "Bespaarde CO2 (kg)",
              data: [totalEmissionSaved],
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 1,
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
                text: "Categorieën",
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

<div class="flex flex-col items-center">
  <div class="w-full h-96">
    <canvas id="co2Graph" class="w-full h-full"></canvas>
  </div>
</div>
