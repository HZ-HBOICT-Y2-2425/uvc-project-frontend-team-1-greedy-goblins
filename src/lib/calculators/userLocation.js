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
          reject(new Error(`Geolocation error: ${err.message}`));
        },
        options
      );
    } else {
      resolve({
        latitude: 0,
        longitude: 0,
      });
    }
  });
};
