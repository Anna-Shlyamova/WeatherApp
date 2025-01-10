import axios from "axios"
import {
  CurrentWeather,
  ForecastHour,
  ForecastWeather,
} from "../../types/Weather.ts"

const http = axios.create({
  baseURL: "http://api.weatherapi.com/v1",
})

const apiKey = "fb2c9586423545a49d9195553242907"

export const getCurrentWeather = (coords?: string): Promise<CurrentWeather> => {
  return http
    .get("current.json", {
      params: {
        key: apiKey,
        q: coords,
        lang: "ru",
      },
    })
    .then((value) => value.data.current)
}

export const getForecastThreeDaysWeather = (
  coords?: string
): Promise<Array<ForecastWeather>> => {
  return http
    .get("forecast.json", {
      params: {
        key: apiKey,
        q: coords,
        days: 3,
        lang: "ru",
      },
    })
    .then((value) => value.data.forecast.forecastday)
}

export const getForecastCurrentHoursWeather = (
  coords?: string
): Promise<Array<ForecastHour>> => {
  return http
    .get("forecast.json", {
      params: {
        key: apiKey,
        q: coords,
        days: 1,
        lang: "ru",
      },
    })
    .then((value) => value.data.forecast.forecastday[0].hour)
}
