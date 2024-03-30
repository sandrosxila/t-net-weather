import { UNITS, Weather } from "./models";
import { objectToQueryString } from "../utils/transformers";

type CoordinatesQuery = {
  lat: number;
  lon: number;
};

type InputQuery = {
  q: string;
};

type UnitsQuery = {
  units?: UNITS;
};

type GetWeatherByQuery = {
  (query: CoordinatesQuery & UnitsQuery): Promise<Weather | null>;
  (query: InputQuery & UnitsQuery): Promise<Weather | null>;
};

export const getWeatherByQuery: GetWeatherByQuery = async (query) => {
  try {
    const queryString = objectToQueryString({
      ...query,
      appid: import.meta.env.VITE_WEATHER_API_KEY,
    });

    const weather = (await fetch(
      `https://api.openweathermap.org/data/2.5/weather?${queryString}`
    ).then((response) => response.json())) as Weather;

    return weather;
  } catch (error) {
    console.log(error);
    return null;
  }
};
