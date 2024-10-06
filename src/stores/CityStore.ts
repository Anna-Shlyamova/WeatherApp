import {makeAutoObservable} from "mobx";
import {City} from "../types/City.ts";
import {fakeApiCities} from "../api/cityFakeApi/cityFakeApi.ts";

class CityStore  {
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
  }
}

  export default new CityStore;