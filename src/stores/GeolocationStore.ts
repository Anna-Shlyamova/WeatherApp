import {makeAutoObservable} from "mobx";

class GeolocationStore  {
  private _longitude: number = 0;
  private _latitude: number = 0;
  constructor() {
    makeAutoObservable<GeolocationStore>(this);
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(longitude: number) {
    this._longitude = longitude;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(latitude: number) {
    this._latitude = latitude;
  }

  fetchCoordinates = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (Position) => {
          this._longitude = Position.coords.longitude;
          this._latitude = Position.coords.latitude;
        },
      ()=>{alert('В вашем браузере отключен доступ к геопозиции.')}
      );
    }
  }
}

export default new  GeolocationStore();