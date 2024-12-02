<script>
  import { onMount } from "svelte";

  /**
   * @type {any}
   */
  let map;
  let markers = [];

  onMount(() => {
    // @ts-ignore
    if (window.google && window.google.maps) {
      initMap();
    } else {
      console.error('Google Maps API is not loaded');
    }
  });

  function initMap() {
    // @ts-ignore
    const googleMaps = window.google.maps;
    map = new googleMaps.Map(document.getElementById("map"), {
      center: { lat: 51.4416, lng: 3.6145 },
      zoom: 10,
    });

    const farmers = [
      { name: "Boer 1", lat: 51.4416, lng: 3.6145 },
      { name: "Boer 2", lat: 51.4470, lng: 3.5960 },
    ];

    farmers.forEach((farmer) => {
      const marker = new googleMaps.Marker({
        position: { lat: farmer.lat, lng: farmer.lng },
        map: map,
        title: farmer.name,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });

      const infoWindow = new googleMaps.InfoWindow({
        content: `<h3>${farmer.name}</h3>`,
      });

      marker.addListener("click", () => {
        infoWindow.open(map, marker);
      });

      markers.push(marker);
    });
  }
</script>

<svelte:head>
  <title>Kaart</title>
</svelte:head>

<div id="map" style="height: 500px; width: 100%;"></div>

<style>
  #map {
    height: 500px;
    width: 100%;
  }
</style>
