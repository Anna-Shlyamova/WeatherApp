import Header from "../organisms/Header/Header"
import { Box, SxProps, Theme } from "@mui/material"
import sunny from "../../images/sunny.gif"
import VidgetsPanel from "../organisms/WidgetsPanel/WidgetsPanel.tsx"
import Modal from "../organisms/Modal/Modal"
import React, { ReactElement, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import GeolocationStore from "../../stores/GeolocationStore.ts"
import WeatherStore from "../../stores/WeatherStore.ts"
import CityStore from "../../stores/CityStore.ts"
import Drawer from "../organisms/Drawer/Drawer.tsx"
import { City } from "../../types/City.ts"

interface MainPageTemplateProps {
  onThemeChange: () => void
}

export type WidgetContext = {
  isWidgetModalOpen: boolean
  widget?: ReactElement
  title?: string
}
const mainMixin: SxProps<Theme> = (theme) => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.default,
  position: "relative",
  backgroundImage: `url(${sunny})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
})

const MainPageTemplate: React.FC<MainPageTemplateProps> = ({
  onThemeChange,
}) => {
  const [widgetContext, setWidgetContext] = useState<WidgetContext>({
    isWidgetModalOpen: false,
  })
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)

  useEffect(() => {
    WeatherStore.fetchCurrentWeather()
    WeatherStore.fetchForecastCurrentHoursWeather()
    WeatherStore.fetchForecastThreeDaysWeather()
    CityStore.fetchCities()
  }, [GeolocationStore.longitude, GeolocationStore.latitude])

  const handleWidgetModalClose = () => {
    setWidgetContext({
      isWidgetModalOpen: false,
      widget: undefined,
      title: undefined,
    })
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  const handleChangeCity = (city: City) => {
    GeolocationStore.setCoordinates(city.longitude, city.latitude)
  }

  return (
    <>
      <Box sx={mainMixin}>
        <Header
          onThemeChange={onThemeChange}
          handleDrawerOpen={() => setIsDrawerOpen(true)}
        />
        <Drawer
          anchor={"left"}
          isOpen={isDrawerOpen}
          onClose={handleDrawerClose}
          handleChangeCity={handleChangeCity}
        />
        <VidgetsPanel openModal={setWidgetContext} />
      </Box>
      {widgetContext.isWidgetModalOpen && (
        <Modal
          open={widgetContext.isWidgetModalOpen}
          handleClose={handleWidgetModalClose}
          dialogContent={widgetContext.widget}
          title={widgetContext.title}
        />
      )}
    </>
  )
}

const MainPageTemplateObserver = observer(MainPageTemplate)
export default MainPageTemplateObserver
