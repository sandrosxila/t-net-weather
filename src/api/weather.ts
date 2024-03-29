export type Weather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    }
  ];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: Record<string, number>;
  clouds: Record<string, number>;
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type CoordinatesQuery = {
  lat?: number;
  lon?: number;
};

type InputQuery = {
  q?: string;
}

type UnitsQuery = {
  units?: "metric" | "imperial";
}

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
