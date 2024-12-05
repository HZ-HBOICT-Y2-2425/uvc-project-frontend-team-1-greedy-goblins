// Functie om afstand en reistijd op te halen via ORS API
/**
 * @param {number} lat1
 * @param {number} lon1
 * @param {number} lat2
 * @param {number} lon2
 * @param {string} profile
 */
export async function calculateORSRoute(lat1, lon1, lat2, lon2, profile = "driving-car") {
    const apiKey = "5b3ce3597851110001cf62488cf0118fe70b42f283bee6f702bc22de"; 
    const url = `https://api.openrouteservice.org/v2/directions/${profile}`;
  
    const body = {
      coordinates: [
        [lon1, lat1], 
        [lon2, lat2],
      ],
      instructions: false,
    };


  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: apiKey,
      },
      body: JSON.stringify(body),
    });
  
    if (!response.ok) {
      throw new Error("Fout bij het ophalen van routegegevens via OpenRouteService");
    }
  
    const data = await response.json();
  
    const distanceMeters = data.routes[0].summary.distance;
    const travelTimeSeconds = data.routes[0].summary.duration;
  
    return {
      distanceKm: Math.floor(distanceMeters / 1000) ,
      travelTimeMinutes: Math.ceil(travelTimeSeconds / 60),
    };
  }
  