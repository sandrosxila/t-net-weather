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

export const getWeatherByLocation = async (latitude: number, longitude: number) => {
  try {
    const weather = (await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`
    ).then((response) => response.json())) as Weather;

    return weather;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getWeatherByCity = async (city: string) => {
    try {
      const weather = (await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      ).then((response) => response.json())) as Weather;
  
      return weather;
    } catch (error) {
      console.log(error);
      return null;
    }
  };