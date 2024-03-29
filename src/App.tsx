import { useState } from "react";
import "./App.css";

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

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
  }

  function success(position: {
    coords: { latitude: number; longitude: number };
  }) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

    // Make API call to OpenWeatherMap
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${
        import.meta.env.VITE_WEATHER_API_KEY
      }&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((error) => console.log(error));
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  return (
    <>
      <div>
        {!location ? (
          <button onClick={handleLocationClick}>Get Location</button>
        ) : null}
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