import { UNITS, Weather } from "./models";
import { objectToQueryString } from "@/utils/transformers";

export type CoordinatesQuery = {
  lat: number;
  lon: number;
};

export type InputQuery = {
  q: string;
};

export type UnitsQuery = {
  units?: UNITS;
};

type GetWeatherByQuery = {
  (query: CoordinatesQuery & UnitsQuery): Promise<Weather>;
  (query: InputQuery & UnitsQuery): Promise<Weather>;
};

export const getWeatherByQuery: GetWeatherByQuery = async (query) => {
  const queryString = objectToQueryString({
    ...query,
    appid: import.meta.env.VITE_WEATHER_API_KEY,
  });

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?${queryString}`
  );

  const data = await response.json();

  if (response.ok) {
    return data as Weather;
  }

  throw new Error(data.message);
};
