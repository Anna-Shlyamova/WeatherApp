import Header from "../organisms/Header/Header";
import {Box, SxProps, Theme} from "@mui/material";
import sunny from '../../images/sunny.gif';
import VidgetsPanel from "../organisms/WidgetsPanel/WidgetsPanel.tsx";
import Modal from "../organisms/Modal/Modal"
import {ReactElement, useEffect, useState} from "react";
import { observer } from "mobx-react-lite";
import GeolocationStore from "../../stores/GeolocationStore.ts";
import WeatherStore from "../../stores/WeatherStore.ts";
import CityStore from "../../stores/CityStore.ts";

interface MainPageTemplateProps {
  onThemeChange: () => void;
}

export type WidgetContext = {
  isWidgetModalOpen: boolean,
  widget?: ReactElement,
}
const mainMixin: SxProps<Theme> = theme => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.default,
  position: "relative",
  backgroundImage: `url(${sunny})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

const MainPageTemplate: React.FC<MainPageTemplateProps> = ({onThemeChange}) => {
  const [widgetContext, setWidgetContext] = useState<WidgetContext>({
    isWidgetModalOpen: false,
  });

  useEffect(() => {
    WeatherStore.fetchCurrentWeather();
    WeatherStore.fetchForecastCurrentHoursWeather();
    WeatherStore.fetchForecastThreeDaysWeather();
    CityStore.fetchCities();
  }, [GeolocationStore.longitude, GeolocationStore.latitude]);

  return (
    <>
    <Box sx={mainMixin}>
      <Header onThemeChange={onThemeChange}/>
      <VidgetsPanel openModal={setWidgetContext}/>
    </Box>
    {widgetContext.isWidgetModalOpen &&
        <Modal
            open={widgetContext.isWidgetModalOpen}
            onClose={()=>setWidgetContext({isWidgetModalOpen: false, widget: undefined})}
            dialogContent={widgetContext.widget}
        />
    }
  </>
  )}

const MainPageTemplateObserver = observer(MainPageTemplate);
export default MainPageTemplateObserver;