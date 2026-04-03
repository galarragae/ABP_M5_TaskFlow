// -------- API WEATHER -----------

const API_KEY = "1d9f4b21f7aa44e78e8204320263103";
const baseURL = "http://api.weatherapi.com/v1/current.json";

export const getWeather = async (latitude, longitude) => {
  // Construir URL con los parámetros recibidos
  const URL = `${baseURL}?key=${API_KEY}&q=${latitude},${longitude}&aqi=no`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);

    const apisBar = document.getElementById("apis-bar");

    const weather = `
    <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
      <p class="my-1 small">
        <img src="${data.current.condition.icon}" width="50px"/>
        Clima actual: ${data.current.temp_c}°C | ${data.current.temp_f}°F | Humedad: ${data.current.humidity}%
      </p>
    </div>
    `;

    apisBar.innerHTML = weather;
  } catch (error) {
    console.error(error);
  }
};
