import {Box, Switch, Typography} from "@mui/material";
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import {geolocationMixin, headerContainerMixin, sidesContainerMixin} from "./Header.style";
import {combineSx} from "../../../utils/combineSx";
import {useEffect, useState} from "react";
import {getCurrentLocation} from "../../../utils/locationUtils";
import { observer } from "mobx-react-lite";
import GeolocationStore from "../../../stores/GeolocationStore.ts";
import {getForecastThreeDaysWeather} from "../../../api/weatherApi/weather.api.ts";

interface HeaderProps {
  onThemeChange: () => void;
}

const Header: React.FC<HeaderProps> = ({onThemeChange}) =>{
  const [geo, setGeo] = useState('');

  const getLocation = () => {
    getCurrentLocation(`${GeolocationStore.longitude}, ${GeolocationStore.latitude}`)
      .then(res => setGeo(res ?? ''));
  }

  useEffect(() => {
    if(GeolocationStore.longitude && GeolocationStore.latitude) {
      getLocation();
      getForecastThreeDaysWeather(`${GeolocationStore.latitude}, ${GeolocationStore.longitude}`).then()
    }
  }, [GeolocationStore.longitude, GeolocationStore.latitude]);

return (
  <Box sx={headerContainerMixin}>
    <Box sx={sidesContainerMixin}>
      <DensityMediumIcon color={"action"}/>
      <Switch onChange={onThemeChange}/>
    </Box>
    <Box sx={combineSx(sidesContainerMixin, {width:'12%'})}>
      <Typography sx={geolocationMixin} onClick={() => getLocation}>{geo? geo : 'Ваша геолокация'}</Typography>
    </Box>
  </Box>
)}

const HeaderObserver = observer(Header)
export default HeaderObserver;