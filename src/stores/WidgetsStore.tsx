import { Widget } from '../types/Widget.ts';
import {makeAutoObservable} from "mobx";

class WidgetsStore  {
  protected _data: Array<Widget> = [];
  constructor() {
    makeAutoObservable<WidgetsStore>(this);
  }

  get data(): Array<Widget> {
    return this._data;
  }

  set data(data: Array<Widget>) {
    this._data = data;
  }

  loadDefaultWidgets = () =>{
    this.data = [
      {
        name: 'degrees',
        layout :
          <></>,
        previewLayout:
          <></>,
        fullLayout:
          <></>,
      },
      {
        name: 'wind',
        layout :
          <></>,
        previewLayout:
          <></>,
        fullLayout:
          <></>,
      },
      {
        name: 'humidity',
        layout :
          <></>,
        previewLayout:
          <></>,
        fullLayout:
          <></>,
      },
      {
        name: 'uvIndex',
        layout :
          <></>,
        previewLayout:
          <></>,
        fullLayout:
          <></>,
      },
    ]
  }
}

export default new WidgetsStore();