import { useEffect, useState } from "react";
import "./App.css";
import SearchInput from "./components/search-input";
import { getWeatherByQuery, Weather } from "./api/weather";

function App() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const [weather, setWeather] = useState<Weather | null>(null);

  const [error, setError] = useState<string | null>(null);

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeatherFromPosition, () => {
        setError("Unable to retrieve your location: Please allow location permission");
      });
    } else {
      setError("Geolocation not supported");
    }
  };

  const handleLocationClick = () => {
    getGeolocation();
  };

  const setWeatherRequestData = (weatherData: Weather | null) => {
    setWeather(weatherData);

    if (weatherData) {
      setLocation({
        latitude: weatherData.coord.lat,
        longitude: weatherData.coord.lon,
      });
    }
  };

  const getWeatherFromPosition = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const weatherData = await getWeatherByQuery({
      lat: latitude,
      lon: longitude,
      units: "metric",
    });

    setWeatherRequestData(weatherData);
  };

  const getWeatherFromCityName = async (cityName: string) => {
    const weatherData = await getWeatherByQuery({
      q: cityName,
      units: "metric",
    });

    setWeatherRequestData(weatherData);
  };

  useEffect(() => {
    getGeolocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        {!location && (
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <SearchInput
                onChange={(value) => getWeatherFromCityName(value.name)}
              />
              <span className="flex text-lg font-sans items-center">or</span>
              <button
                onClick={handleLocationClick}
                className="select-none rounded-lg bg-blue-500 py-2 px-3 text-center align-middle font-sans text-lg uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Use Your Location
              </button>
            </div>
            {error && <span className="text-red-500 text-sm ">{error}</span>}
          </div>
        )}

        {location && !weather ? <p>Loading weather data...</p> : null}

        {weather ? (
          <div className="flex w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex align-middle justify-center">
              <img
                src={
                  "https://openweathermap.org/img/wn/" +
                  weather.weather[0].icon +
                  "@2x.png"
                }
                alt={weather.weather[0].description}
              />
            </div>
            <div className="flex flex-col justify-center items-start">
              <p>Location: {weather.name}</p>
              <p>Temperature: {weather.main.temp} °C</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default App;
