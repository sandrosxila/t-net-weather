import { useEffect, useState } from "react";
import "./App.css";
import { SearchInput } from "./components/search-input";
import { getWeatherByQuery } from "./api/weather";
import { UnitsToggle } from "./components/units-toggle";
import { UNITS, type Weather } from "./api/models";
import WeatherDashboard from "./components/weather-dashboard";

function App() {
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);

  const [weather, setWeather] = useState<Weather | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [units, setUnits] = useState<UNITS>(UNITS.METRIC);

  const getGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getWeatherFromPosition, () => {
        setError(
          "Unable to retrieve your location: Please allow location permission"
        );
      });
    } else {
      setError("Geolocation not supported");
    }
  };

  const handleLocationClick = () => {
    getGeolocation();
  };

  const getWeatherFromPosition = async (position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    setIsWeatherLoading(true);
    const weatherData = await getWeatherByQuery({
      lat: latitude,
      lon: longitude,
      units,
    });

    setWeather(weatherData);
    setIsWeatherLoading(false);
  };

  const getWeatherFromCityName = async (cityName: string) => {
    setIsWeatherLoading(true);
    const weatherData = await getWeatherByQuery({
      q: cityName,
      units,
    });

    setWeather(weatherData);
    setIsWeatherLoading(false);
  };

  const getWeatherFromUnitsChange = async (units: UNITS) => {
    setIsWeatherLoading(true);
    const weatherData = await getWeatherByQuery({
      lat: weather!.coord.lat,
      lon: weather!.coord.lon,
      units,
    });

    setWeather(weatherData);
    setIsWeatherLoading(false);
  };

  useEffect(() => {
    getGeolocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6 w-full p-2 sm:p-20 items-center">
        <div className="flex flex-col gap-6">
          <UnitsToggle
            units={units}
            onChange={(units) => {
              setUnits(units);
              if (weather) {
                getWeatherFromUnitsChange(units);
              }
            }}
          />
          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
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

        <WeatherDashboard
          units={units}
          weather={weather}
          isWeatherLoading={isWeatherLoading}
        />
      </div>
    </>
  );
}

export default App;
