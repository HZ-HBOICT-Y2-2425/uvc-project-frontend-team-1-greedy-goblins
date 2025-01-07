<script>
  import { onMount } from "svelte";

  /**
     * @type {any}
     */
  let map;
  let markers = [];
  let isGoogleMapsLoaded = false;

  onMount(async () => {
    try {
      await loadGoogleMapsScript();
      const locations = await fetchLocations();
      initMap(locations);
    } catch (error) {
      console.error("Error fetching or initializing map data:", error);
    }
  });

  // Laad het Google Maps script dynamisch
  function loadGoogleMapsScript() {
    return new Promise((resolve, reject) => {
      if (isGoogleMapsLoaded) {
        resolve(undefined);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBNB5_ZQ4ddym9tPSwplKCjhZJyp2cRtXg&libraries=places";
      script.async = true;
      script.defer = true;

      script.onload = () => {
        isGoogleMapsLoaded = true;
        resolve(undefined);
      };

      script.onerror = (error) => reject(error);

      document.body.appendChild(script);
    });
  }

  // fetch locations (evt anders doen)
  async function fetchLocations() {
    const response = await fetch("http://localhost:3010/microserviceMarket/MarketInfo");
    if (!response.ok) {
      throw new Error("Failed to fetch locations");
    }
    return await response.json();
  }

  // Initialiseer de kaart methode
  /**
     * @param {any[]} locations
     */
  function initMap(locations) {
    // @ts-ignore
    if (!window.google || !window.google.maps) {
      throw new Error("Google Maps API is not loaded");
    }
    // @ts-ignore
    const googleMaps = window.google.maps;

    // Initialiseer de kaart
    map = new googleMaps.Map(document.getElementById("map"), {
      center: { lat: 51.4416, lng: 3.6145 }, // standaard locatie staat nu op middelburg
      zoom: 10, // zoom op de kaart
      mapId: "ca051f9f7d9a8a1c", // map id in google console gelinkt aan (Atilla) google account
    });

    // dit voegt markers toe voor elke locatie
    locations.forEach((location) => {
      const marker = new googleMaps.Marker({
        position: { lat: location.marketLatitude, lng: location.marketLongitude },
        map: map,
        title: location.Name,
        icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      });

      // dit maakt een info window voor de marker, css is wel inline nu, evt nog anders maken
      const infoWindow = new googleMaps.InfoWindow({
        content: `
        <div>
          <h2 style="margin: 0; font-size: 1.5em; font-weight: bold;">${location.marketName}</h2>
          <br>
          <p>${location.description}</p>
          <br>
          <p><b>Adres:</b> ${location.marketAdress}</p>
          <br>
          <button onclick="window.location.href='/location/${location.marketID}'"
            style="
              background-color: #28a745;
              color: white;
              border: none;
              padding: 8px 12px;
              font-size: 1em;
              border-radius: 4px;
              cursor: pointer;
            ">
            Bekijk Markt
          </button>
        </div>
      `,
      });

      // wat er gebeurd als je op de marker klikt
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

<div id="map"></div>

<style>
  #map {
    height: 500px;
    width: 100%;
  }
</style>
