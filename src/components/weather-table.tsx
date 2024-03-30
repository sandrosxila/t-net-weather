import React from "react";
import { UNITS, Weather } from "@/api/models";
import { unitsSpeedText, unitsTemperatureText } from "@/utils/units-helpers";

type WeatherTableProps = {
  weather: Weather;
  units: UNITS;
};

export const WeatherTable = ({ weather, units }: WeatherTableProps) => {
  const weatherData = [
    ["Location", weather.name],
    ["Weather", weather.weather?.[0].description],
    ["Temperature", `${weather.main.temp} ${unitsTemperatureText[units]}`],
    ["Feels Like", `${weather.main.feels_like} ${unitsTemperatureText[units]}`],
    ["Humidity", `${weather.main.humidity}%`],
    ["Sea Level", weather.main.sea_level],
    ["Wind Speed", `${weather.wind.speed} ${unitsSpeedText[units]}`],
    ["Visibility", `${Number(weather.visibility / 1000).toFixed(2)} km`],
  ];

  return (
    <div className="grow overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-400">
        <tbody>
          {weatherData.map(([tableKey, tableValue], index) => (
            <tr
              className="border-b border-gray-700 last:border-none"
              key={index}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap text-white bg-gray-800"
              >
                {tableKey}
              </th>
              <td className="px-6 py-4">{tableValue ?? "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
