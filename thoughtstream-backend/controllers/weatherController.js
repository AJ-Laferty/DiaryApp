const BASE_URL = "https://api.openweathermap.org/data/2.5/";

async function fetchCurrentWeather(location, API_KEY) {
  const url = `${BASE_URL}weather?q=${location}&appid=${API_KEY}&units=imperial`;
  console.log(`Fetching current weather data for: ${location}`);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to fetch current weather data. Try again"
      );
    }

    const weatherInfo = {
      location: `${data.name}, ${data.sys.country}`,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      iconCode: data.weather[0].icon,
    };

    console.log("Filtered weather data:", weatherInfo);
    return weatherInfo;
  } catch (error) {
    throw new Error(
      error.message || "Failed to fetch current weather data. Try again"
    );
  }
}

export { fetchCurrentWeather };
