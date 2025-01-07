export const userLocation = () => {
    const options = {
      maximumAge: 10000,
      enableHighAccuracy: false,
      timeout: 15000,
    };
  
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(pos.coords);
          },
          (err) => {
            reject(new Error(`Error: ${err.message}`));
          },
          options
        );
      } else {
        reject(new Error("Geolocation is niet beschikbaar in deze browser."));
      }
    });
  };
  