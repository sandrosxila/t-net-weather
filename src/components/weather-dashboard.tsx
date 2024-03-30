import React from "react";
import WeatherTable from "./weather-table";
import { URLS } from "../utils/urls";
import { UNITS, Weather } from "../api/models";

export type WeatherDashboardProps = {
  isWeatherLoading?: boolean;
  weather: Weather | null;
  units: UNITS;
};

export default function WeatherDashboard({
  isWeatherLoading,
  weather,
  units,
}: WeatherDashboardProps) {
  return (
    <>
      {isWeatherLoading && <p>Loading weather data...</p>}

      {!isWeatherLoading && !!weather && (
        <div className="flex w-full p-4 rounded-lg shadow bg-gray-800 border-gray-700 gap-6">
          <div className="flex align-middle justify-center">
            <img
              className="h-min"
              src={URLS.weatherIcon(weather.weather[0].icon)}
              alt={weather.weather[0].description}
            />
          </div>

          <WeatherTable weather={weather} units={units} />
        </div>
      )}
    </>
  );
}
