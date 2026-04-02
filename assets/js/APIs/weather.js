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
    <navbar class="d-flex row justify-content-center bg-dark text-white">
    <div class="col-md-4 mx-auto mt-3">
      <p><img class="align-items-center" src="${data.current.condition.icon}" width="50px"/>Clima actual: ${data.current.temp_c}°C | ${data.current.temp_f}°F | Humedad: ${data.current.humidity}%</p>
    </div>
    </navbar>
    `;

    apisBar.innerHTML = weather;
  } catch (error) {
    console.error(error);
  }
};
