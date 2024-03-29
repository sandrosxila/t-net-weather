import { useState } from "react";
import "./App.css";
import SearchInput from "./components/search-input";
import { getWeatherByCity, getWeatherByLocation } from "./api/weather";

function App() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [weather, setWeather] = useState<{
    name: string;
    main: {
      temp: number;
    };
    weather: {
      description: string;
    }[];
  } | null>(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeatherFromPosition, () => {
        console.log("Unable to retrieve your location");
      });
    } else {
      console.log("Geolocation not supported");
    }
  };

  const getWeatherFromPosition = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const weatherData = await getWeatherByLocation(latitude, longitude);
    setWeather(weatherData);

    if (weatherData) {
      setLocation({
        latitude,
        longitude,
      });
    }
  };

  const getWeatherFromCityName = async (cityName: string) => {
    const weatherData = await getWeatherByCity(cityName);
    setWeather(weatherData);

    if (weatherData) {
      setLocation({
        latitude: weatherData.coord.lat,
        longitude: weatherData.coord.lon,
      });
    }
  };

  return (
    <>
      <div>
        {!location && (
          <div className="flex gap-4">
            <SearchInput
              onChange={(value) => getWeatherFromCityName(value.name)}
            />
            <button
              onClick={handleLocationClick}
              className="select-none rounded-lg bg-blue-500 py-2 px-3 text-center align-middle font-sans text-lg uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              Get Location
            </button>
          </div>
        )}
        {location && !weather ? <p>Loading weather data...</p> : null}
        {weather ? (
          <div>
            <p>Location: {weather.name}</p>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
