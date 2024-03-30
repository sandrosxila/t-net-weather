import { render, screen } from "@testing-library/react";
import { WeatherTable } from "@/components/weather-table";
import { UNITS } from "@/api/models";

const weather = {
  coord: {
    lon: 44.8903,
    lat: 41.6653,
  },
  weather: [
    {
      id: 800,
      main: "Clear",
      description: "clear sky",
      icon: "01n",
    },
  ],
  main: {
    temp: 15.45,
    feels_like: 14.38,
    sea_level: 20,
    humidity: 51,
  },
  visibility: 10000,
  wind: {
    speed: 13.89,
  },
  name: "Tbilisi",
};

it("should render weather table", async () => {
  render(<WeatherTable weather={weather} units={UNITS.METRIC} />);

  const rows = [
    ["Location", "Tbilisi"],
    ["Weather", "clear sky"],
    ["Temperature", "15.45 °C"],
    ["Feels Like", "14.38 °C"],
    ["Humidity", "51%"],
    ["Sea Level", "20"],
    ["Wind Speed", "13.89 m/s"],
    ["Visibility", "10.00 km"],
  ];

  rows.forEach(([tableKey, tableValue]) => {
    const keyCell = screen.getByText(tableKey);
    const valueCell = screen.getByText(tableValue);

    expect(keyCell).toBeVisible();
    expect(valueCell).toBeVisible();
  });
});
