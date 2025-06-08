import Header from "../organisms/Header/Header"
import { Box, SxProps, Theme } from "@mui/material"
import sunny from "../../images/sunny.gif"
import WidgetsPanel from "../organisms/WidgetsPanel/WidgetsPanel.tsx"
import Modal from "../organisms/Modal/Modal"
import React, {ReactElement, useEffect, useMemo, useState} from "react"
import { observer } from "mobx-react-lite"
import GeolocationStore from "../../stores/GeolocationStore.ts"
import WeatherStore from "../../stores/WeatherStore.ts"
import Drawer from "../organisms/Drawer/Drawer.tsx"
import { City } from "../../types/City.ts"
import {
  closestCenter,
  DndContext,
  DragEndEvent, KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { restrictToParentElement } from "@dnd-kit/modifiers"
import {arrayMove, sortableKeyboardCoordinates} from "@dnd-kit/sortable"
import widgetsStore from "../../stores/WidgetsStore.tsx"
import MenuTextItem from "../molecules/MenuItem/MenuTextItem/MenuTextItem.tsx";
import CityStore from "../../stores/CityStore.ts";

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
  const [cities, setCities] = useState<Array<City>>([]);

  useEffect(() => {
    WeatherStore.fetchCurrentWeather()
    WeatherStore.fetchForecastCurrentHoursWeather()
    WeatherStore.fetchForecastThreeDaysWeather()
  }, [GeolocationStore.longitude, GeolocationStore.latitude])

  useEffect(() => {
    setCities([...CityStore.cities]);
  }, [CityStore.cities]);

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

  const citiesDrawerContent = useMemo(() => (
    <>
      {cities
        .sort((a, b) => {
          if (a.pinned === b.pinned) {
            return 0
          }
          return a.pinned ? -1 : 1
        }).map((city) => (
          <MenuTextItem city={city} onClick={CityStore.changeCurrentCity} />
        ))
      }
    </>
  ), [cities]);

  const onChangeCitySearch = (searchValue?: string) => {
    setCities(
      CityStore.cities
        .filter((city) =>
          searchValue
            ? city.name.toLowerCase().includes(searchValue?.toLowerCase()) || city.pinned
            : city
        )
    );
  }


  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 120,
      tolerance: 20,
    },
  });

  const sensors = useSensors(
    mouseSensor,
    useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (active.id !== over?.id) {
      const oldIndex = widgetsStore.data
        .map((widget) => widget.id)
        .indexOf(`${active.id}`)
      const newIndex = widgetsStore.data
        .map((widget) => widget.id)
        .indexOf(`${over?.id}`)

      widgetsStore.data = arrayMove(widgetsStore.data, oldIndex, newIndex)
    }
  }

  return (
    <DndContext
      modifiers={[restrictToParentElement]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Box sx={mainMixin}>
        <Header
          onThemeChange={onThemeChange}
          handleDrawerOpen={() => setIsDrawerOpen(true)}
        />
        <Drawer
          anchor={"right"}
          isOpen={isDrawerOpen}
          onClose={handleDrawerClose}
          drawerContent={citiesDrawerContent}
          onSearch={onChangeCitySearch}
        />
        <WidgetsPanel openModal={setWidgetContext} />
      </Box>
      {widgetContext.isWidgetModalOpen && (
        <Modal
          open={widgetContext.isWidgetModalOpen}
          handleClose={handleWidgetModalClose}
          dialogContent={widgetContext.widget}
          title={widgetContext.title}
        />
      )}
    </DndContext>
  )
}

const MainPageTemplateObserver = observer(MainPageTemplate)
export default MainPageTemplateObserver
