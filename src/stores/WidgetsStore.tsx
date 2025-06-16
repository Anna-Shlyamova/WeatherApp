import { Widget } from "../types/Widget.ts";
import { makeAutoObservable } from "mobx";
import { Typography } from "@mui/material";
import WeatherStore from "./WeatherStore.ts";
import Loader from "../components/atoms/Loader/Loader.tsx";
import { Line } from "react-chartjs-2";
import { ForecastHour } from "../types/Weather.ts";
import { ChartOptions, ChartData } from "chart.js";
import { isNullOrUndef } from "chart.js/helpers";
import { ReactElement } from "react";
import AddIcon from "@mui/icons-material/Add";

class WidgetsStore {
  private _data: Array<Widget> = [];
  private _displayedData: Array<Widget> = [];
  constructor() {
    makeAutoObservable<WidgetsStore>(this);
  }

  get data(): Array<Widget> {
    return this._data;
  }

  set data(data: Array<Widget>) {
    this._data = data;
  }

  get displayedData(): Array<Widget> {
    return this._displayedData;
  }

  set displayedData(displayedData: Array<Widget>) {
    this._displayedData = displayedData;
  }

  loadDefaultWidgets = () => {
    this.data = [
      {
        id: "temp_c",
        name: "temp_c",
        nameRus: "Температура",
        layout: (
          <>
            {WeatherStore.currentWeather?.temp_c ? (
              <Typography
                sx={theme => ({
                  color: theme.palette.primary.contrastText,
                  fontSize: "48px",
                })}
              >
                {Math.round(WeatherStore.currentWeather?.temp_c)}&deg;C
              </Typography>
            ) : (
              <Loader />
            )}
          </>
        ),
        previewLayout: this.getPreviewLayout("temp_c"),
        fullLayout: (
          <>
            {WeatherStore.forecastCurrentHoursWeather ? (
              <Line
                data={this.getChartData("temp_c", "Температура")}
                options={this.getChartOptions("Температура", "°C")}
                width={"700px"}
                height={"400"}
              />
            ) : (
              <Loader />
            )}
          </>
        ),
      },
      {
        id: "wind",
        name: "wind",
        nameRus: "Ветер",
        layout: (
          <>
            {WeatherStore.currentWeather?.wind_kph ? (
              <Typography
                sx={theme => ({
                  color: theme.palette.primary.contrastText,
                  fontSize: "48px",
                })}
              >
                {WeatherStore.currentWeather?.wind_kph} км/ч
              </Typography>
            ) : (
              <Loader />
            )}
          </>
        ),
        previewLayout: this.getPreviewLayout("wind"),
        fullLayout: (
          <>
            {WeatherStore.forecastCurrentHoursWeather ? (
              <Line
                data={this.getChartData("wind_kph", "Ветер")}
                options={this.getChartOptions("Ветер", "км/ч")}
                width={"700px"}
                height={"400"}
              />
            ) : (
              <Loader />
            )}
          </>
        ),
      },
      {
        id: "humidity",
        name: "humidity",
        nameRus: "Влажность",
        layout: (
          <>
            {WeatherStore.currentWeather?.humidity ? (
              <Typography
                sx={theme => ({
                  color: theme.palette.primary.contrastText,
                  fontSize: "48px",
                })}
              >
                {Math.round(WeatherStore.currentWeather?.humidity)}&#37;
              </Typography>
            ) : (
              <Loader />
            )}
          </>
        ),
        previewLayout: this.getPreviewLayout("humidity"),
        fullLayout: (
          <>
            {WeatherStore.forecastCurrentHoursWeather ? (
              <Line
                data={this.getChartData("humidity", "Влажность")}
                options={this.getChartOptions("Влажность", "%")}
                width={"700px"}
                height={"400"}
              />
            ) : (
              <Loader />
            )}
          </>
        ),
      },
      {
        id: "uvIndex",
        name: "uvIndex",
        nameRus: "УФ-Индекс",
        layout: (
          <>
            {!isNullOrUndef(WeatherStore.currentWeather?.uv) ? (
              <Typography
                sx={theme => ({
                  color: theme.palette.primary.contrastText,
                  fontSize: "48px",
                })}
              >
                {Math.round(WeatherStore.currentWeather!.uv)}
              </Typography>
            ) : (
              <Loader />
            )}
          </>
        ),
        previewLayout: this.getPreviewLayout("uvIndex"),
        fullLayout: (
          <>
            {WeatherStore.forecastCurrentHoursWeather ? (
              <Line
                data={this.getChartData("uv", "УФ-Индекс")}
                options={this.getChartOptions("УФ-Индекс")}
                width={"700px"}
                height={"400"}
              />
            ) : (
              <Loader />
            )}
          </>
        ),
      },
    ];
    this.displayedData = this.data.slice(0, 3);
  };

  getChartData(name: string, nameRus: string): ChartData<"line"> {
    const data = WeatherStore.forecastCurrentHoursWeather.map(
      hourWeather => hourWeather[name as keyof ForecastHour] as number
    );
    return {
      labels: [
        "00",
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
      ],
      datasets: [
        {
          label: nameRus,
          data: data,
          borderColor: "#34A0FF",
          fill: false,
          tension: 0.4,
        },
      ],
    };
  }

  getChartOptions(nameRus: string, tooltipIcon?: string): ChartOptions<"line"> {
    return {
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
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return `${nameRus}: ` + tooltipItem.formattedValue + `${tooltipIcon ?? ""}`;
            },
            title: function (tooltipItems) {
              return tooltipItems.map(tooltipItem => tooltipItem.label + ":00");
            },
          },
        },
      },
    };
  }

  getPreviewLayout(name: string): ReactElement {
    return (
      <>
        <AddIcon color={"action"} />
        {name[0].toUpperCase()}
      </>
    );
  }

  deleteDisplayedWidget(id: string): void {
    const isWidgetOnDisplay = this.displayedData.find(widget => widget.id === id);
    if (!isWidgetOnDisplay) {
      this.displayedData = this.displayedData.filter(widget => widget.id === id);
    }
  }

  addDisplayedWidget(id: string): void {
    const isWidgetOnDisplay = this.displayedData.find(widget => widget.id === id);
    const dataWidget = this.data.find(widget => widget.id === id);
    if (!isWidgetOnDisplay && dataWidget) {
      this.displayedData = [...this.displayedData, dataWidget];
    }
  }

  getDrawerWidgets(): Array<Widget> {
    const displayedWidgetsIds = this.displayedData.map(widget => widget.id);
    return this.data.filter(widget => !displayedWidgetsIds.includes(widget.id));
  }
}

export default new WidgetsStore();
