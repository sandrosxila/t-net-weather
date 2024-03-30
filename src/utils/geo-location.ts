export const getCoordinates = () => {
  return new Promise<{ latitude: number; longitude: number }>(
    (resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
      }

      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        () =>
          reject(
            new Error(
              "Unable to retrieve your location: Please allow location permission"
            )
          )
      );
    }
  );
};
