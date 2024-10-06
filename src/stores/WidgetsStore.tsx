import { Widget} from '../types/Widget.ts';
import {makeAutoObservable} from "mobx";
import {Typography} from "@mui/material";
import WeatherStore from "./WeatherStore.ts";
import Loader from "../components/atoms/Loader/Loader.tsx";
import {Line} from "react-chartjs-2";
import {ForecastHour} from "../types/Weather.ts";
import {ChartOptions, ChartData} from "chart.js";

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
        name: 'temp_c',
        nameRus: 'Температура',
        layout :
          <>
              {WeatherStore.currentWeather?.temp_c
                  ? (<Typography sx={theme => ({color: theme.palette.primary.contrastText, fontSize: '48px'})}>{Math.round(WeatherStore.currentWeather?.temp_c)}&deg;</Typography>)
                  : <Loader/>
              }
          </>,
        previewLayout:
          <></>,
        fullLayout:
          <>
            {WeatherStore.forecastCurrentHoursWeather
              ? (
                <Line data={this.getChartData('temp_c', 'Температура')} options={this.getChartOptions('Температура')} />
              )
              : <Loader/>
            }
          </>,
      },
      {
        name: 'wind',
        nameRus: 'Ветер',
        layout :
          <>
            {WeatherStore.currentWeather?.wind_kph
              ? (<Typography sx={theme => ({color: theme.palette.primary.contrastText, fontSize: '48px'})}>{WeatherStore.currentWeather?.wind_kph} km/h</Typography>)
              : <Loader/>
            }
          </>,
        previewLayout:
          <></>,
        fullLayout:
          <></>,
      },
      {
        name: 'humidity',
        nameRus: 'Влажность',
        layout :
          <>
            {WeatherStore.currentWeather?.humidity
              ? (<Typography sx={theme => ({color: theme.palette.primary.contrastText, fontSize: '48px'})}>{Math.round(WeatherStore.currentWeather?.humidity)}&#37;</Typography>)
              : <Loader/>
            }
          </>,
        previewLayout:
          <></>,
        fullLayout:
          <></>,
      },
      {
        name: 'uvIndex',
        nameRus: 'УФ-Индекс',
        layout :
          <>
            {WeatherStore.currentWeather?.uv
              ? (<Typography sx={theme => ({color: theme.palette.primary.contrastText, fontSize: '48px'})}>{Math.round(WeatherStore.currentWeather?.uv)}</Typography>)
              : <Loader/>
            }
          </>,
        previewLayout:
          <></>,
        fullLayout:
          <></>,
      },
    ]
  }

  getChartData(name: string, nameRus: string): ChartData<"line">{
    const data = WeatherStore.forecastCurrentHoursWeather.map(hourWeather => hourWeather[name as keyof ForecastHour] as number);
    console.log(data);
    return ({
      labels: ["00", "01", "02", "03", "04","05","06","07", "08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","00"],
      datasets: [
        {
          label: nameRus,
          data: data,
          borderColor: "rgba(255, 159, 64, 1)", // Customize line color
          fill: false,
          tension: 0.4,
        },
      ],
    })
  }

  getChartOptions(nameRus: string): ChartOptions<"line"> {
    return ({
      scales: {
        x: {
          display: true,
            title: {
            display: true,
              text: "Время",
          },
        },
        y: {
          display: true,
            title: {
            display: true,
              text: nameRus,
          },
        },
      },
    })
  }
}

export default new WidgetsStore();