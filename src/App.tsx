import { useEffect, useState } from "react";
import "./App.css";
import { SearchInput } from "./components/search-input";
import {
  getWeatherByQuery,
  CoordinatesQuery,
  InputQuery,
  UnitsQuery,
} from "@/api/weather";
import { UnitsToggle } from "@/components/units-toggle";
import { UNITS, type Weather } from "@/api/models";
import { WeatherDashboard } from "@/components/weather-dashboard";
import { getCoordinates } from "@/utils/geo-location";

function App() {
  const [isWeatherLoading, setIsWeatherLoading] = useState<boolean>(false);

  const [weather, setWeather] = useState<Weather | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [units, setUnits] = useState<UNITS>(UNITS.METRIC);

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      setError(error.message);
    }

    console.error(error);
  };

  type HandleRequestByQuery = {
    (query: CoordinatesQuery & UnitsQuery): void;
    (query: InputQuery & UnitsQuery): void;
  };

  const handleQueryRequest: HandleRequestByQuery = (query) => {
    setIsWeatherLoading(true);
    setWeather(null);
    getWeatherByQuery(query as Parameters<typeof getWeatherByQuery>[0])
      .then((weather) => {
        setError(null);
        setWeather(weather);
      })
      .catch(handleError)
      .finally(() => setIsWeatherLoading(false));
  };

  const getWeatherFromPosition = async () => {
    try {
      const { latitude, longitude } = await getCoordinates();

      handleQueryRequest({
        lat: latitude,
        lon: longitude,
        units,
      });
    } catch (error) {
      handleError(error);
    }
  };

  const onSearchInputChange = (cityName: string) => {
    handleQueryRequest({
      q: cityName,
      units,
    });
  };

  const onUnitsChange = (units: UNITS) => {
    setUnits(units);
    
    if (weather) {
      handleQueryRequest({
        lat: weather!.coord.lat,
        lon: weather!.coord.lon,
        units,
      });
    }
  };

  useEffect(() => {
    getWeatherFromPosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="flex flex-col gap-6 w-full p-2 sm:p-20 items-center">
        <div className="flex flex-col gap-6">
          <UnitsToggle units={units} onChange={onUnitsChange} />
          <div className="flex flex-col gap-4 sm:flex-row justify-center items-center">
            <SearchInput onChange={onSearchInputChange} />
            <span className="flex text-lg font-sans items-center">or</span>
            <button
              onClick={getWeatherFromPosition}
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
