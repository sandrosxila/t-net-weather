export type GeoLocation = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  state: string;
};

export type Weather = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    sea_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
  };
  name: string;
};

export enum UNITS {
  METRIC = "metric",
  IMPERIAL = "imperial",
}