import { UNITS, Weather } from "./models";

type CoordinatesQuery = {
  lat?: number;
  lon?: number;
};

type InputQuery = {
  q?: string;
};

type UnitsQuery = {
  units?: UNITS;
};

type GetWeatherByQuery = {
  (query?: CoordinatesQuery & UnitsQuery): Promise<Weather | null>;
  (query?: InputQuery & UnitsQuery): Promise<Weather | null>;
};

export const getWeatherByQuery: GetWeatherByQuery = async (query) => {
  try {
    const queryString = Object.entries({
      ...query,
      appid: import.meta.env.VITE_WEATHER_API_KEY,
    })
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    const weather = (await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${queryString}`
    ).then((response) => response.json())) as Weather;

    return weather;
  } catch (error) {
    console.log(error);
    return null;
  }
};
