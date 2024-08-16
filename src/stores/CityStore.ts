import {makeAutoObservable} from "mobx";
import {City} from "../types/City.ts";
import {getCityList} from "../api/cityApi/city.api.ts";

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

  fetchCities = async () => {
    this._cities = await getCityList();
  }
}

  export default new CityStore;