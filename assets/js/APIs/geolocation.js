import { getWeather } from "./weather.js";

// Geolocation API ==> (API del navegador para obtener los datos de dónde está ubicado el usuario geográficamente)
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

function success(pos) {
  const crd = pos.coords;

  console.log("Tu ubicación actual es:");
  console.log(`Latitud : ${crd.latitude}`);
  console.log(`Longitud: ${crd.longitude}`);
  console.log(`Más o menos ${crd.accuracy} metros.`);

  // Llamar a la función del clima pasando las coordenadas
  getWeather(crd.latitude, crd.longitude);
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

export { success, error, options };
