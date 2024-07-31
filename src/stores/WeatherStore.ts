import {makeAutoObservable} from "mobx";
import {
  getCurrentWeather,
  getForecastCurrentHoursWeather,
  getForecastThreeDaysWeather
} from "../api/weatherApi/weather.api.ts";
import GeolocationStore from "./GeolocationStore.ts";
import {CurrentWeather, ForecastHour, ForecastWeather} from "../types/Weather.ts";

class WeatherStore  {
  private _currentWeather: CurrentWeather | undefined = undefined;
  private _forecastThreeDaysWeather: Array<ForecastWeather> = [];
  private _forecastCurrentHoursWeather: Array<ForecastHour> = [];

  constructor() {
    makeAutoObservable<WeatherStore>(this);
  }

  get currentWeather() {
    return this._currentWeather;
  }

  set currentWeather(currentWeather) {
    this._currentWeather = currentWeather;
  }

  get forecastThreeDaysWeather() {
    return this._forecastThreeDaysWeather;
  }

  set forecastThreeDaysWeather(threeDaysWeather) {
    this._forecastThreeDaysWeather = threeDaysWeather;
  }

  get forecastCurrentHoursWeather() {
    return this._forecastCurrentHoursWeather;
  }

  set forecastCurrentHoursWeather(currentHoursWeather) {
    this._forecastCurrentHoursWeather = currentHoursWeather;
  }

  fetchCurrentWeather = async () =>{
    this._currentWeather = await getCurrentWeather(
      `${GeolocationStore.latitude}, ${GeolocationStore.longitude}`
    );
  }
  fetchForecastThreeDaysWeather = async () =>{
    this._forecastThreeDaysWeather = await getForecastThreeDaysWeather(
      `${GeolocationStore.latitude}, ${GeolocationStore.longitude}`
    );
  }
  fetchForecastCurrentHoursWeather = async () =>{
    this._forecastCurrentHoursWeather = await getForecastCurrentHoursWeather(
      `${GeolocationStore.latitude}, ${GeolocationStore.longitude}`
    );
  }
}

export default new WeatherStore();