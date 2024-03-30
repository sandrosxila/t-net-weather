import { GeoLocation } from "./models";

const LIMIT = 5;

export const getLocations = async (query: string) => {
  if (!query) return [];

  const locations = (await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=${LIMIT}&appid=${
      import.meta.env.VITE_WEATHER_API_KEY
    }`
  ).then((response) => response.json())) as GeoLocation[];

  return locations;
};
