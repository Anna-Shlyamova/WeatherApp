import { Box, IconButton, Switch, Typography } from "@mui/material"
import DensityMediumIcon from "@mui/icons-material/DensityMedium"
import {
  geolocationMixin,
  headerContainerMixin,
  sidesContainerMixin,
} from "./Header.style"
import { combineSx } from "../../../utils/combineSx"
import React, { useEffect, useState } from "react"
import { getCurrentLocation } from "../../../utils/locationUtils"
import { observer } from "mobx-react-lite"
import GeolocationStore from "../../../stores/GeolocationStore"

interface HeaderProps {
  onThemeChange: () => void
  handleDrawerOpen: () => void
}

const Header: React.FC<HeaderProps> = ({ onThemeChange, handleDrawerOpen }) => {
  const [geo, setGeo] = useState("")

  const getLocation = () => {
    getCurrentLocation(
      `${GeolocationStore.longitude}, ${GeolocationStore.latitude}`
    ).then((res) => setGeo(res ?? ""))
  }

  useEffect(() => {
    if (GeolocationStore.longitude && GeolocationStore.latitude) {
      getLocation()
    }
  }, [GeolocationStore.longitude, GeolocationStore.latitude])

  return (
    <Box sx={headerContainerMixin}>
      <Box sx={sidesContainerMixin}>
        <Switch onChange={onThemeChange} />
      </Box>
      <Box sx={combineSx(sidesContainerMixin, { width: "15%" })}>
        <Typography sx={geolocationMixin} onClick={() => getLocation}>
          {geo ? geo : "Ваша геолокация"}
        </Typography>
        <IconButton onClick={handleDrawerOpen}>
          <DensityMediumIcon color={"inherit"} />
        </IconButton>
      </Box>
    </Box>
  )
}

const HeaderObserver = observer(Header)
export default HeaderObserver
