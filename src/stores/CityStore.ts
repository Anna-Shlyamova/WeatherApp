import { makeAutoObservable } from "mobx";
import { City } from "../types/City.ts";
import { fakeApiCities } from "../api/cityFakeApi/cityFakeApi.ts";
import GeolocationStore from "./GeolocationStore.ts";

class CityStore {
  private _cities: Array<City> = [];

  constructor() {
    makeAutoObservable<CityStore>(this);
  }

  get cities(): Array<City> {
    return this._cities;
  }

  set cities(cities: Array<City>) {
    this._cities = cities;
  }

  fetchCities = () => {
    this._cities = fakeApiCities;
  };

  updateCities = (currentCity: City) => {
    this._cities = [...this.cities.filter(cityItem => cityItem.id !== currentCity.id), currentCity];
  };
  changeCurrentCity = (city: City) => {
    GeolocationStore.setCoordinates(city.longitude, city.latitude);
  };
}

export default new CityStore();
