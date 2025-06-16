import Header from "../organisms/Header/Header";
import { Box, SxProps, Theme } from "@mui/material";
import sunny from "../../images/sunny.gif";
import WidgetsPanel from "../organisms/WidgetsPanel/WidgetsPanel.tsx";
import Modal from "../organisms/Modal/Modal";
import { FC, ReactElement, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import GeolocationStore from "../../stores/GeolocationStore.ts";
import WeatherStore from "../../stores/WeatherStore.ts";
import Drawer from "../organisms/Drawer/Drawer.tsx";
import { City } from "../../types/City.ts";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import CityStore from "../../stores/CityStore.ts";
import WidgetsStore from "../../stores/WidgetsStore.tsx";
import DrawerCitiesContent from "../organisms/DrawerContent/DrawerCitiesContent.tsx";
import DrawerWidgetsContent from "../organisms/DrawerContent/DrawerWidgetsContent.tsx";

type DrawerType = {
  widgets: boolean;
  cities: boolean;
};

export type DrawersKeys = keyof DrawerType;

interface MainPageTemplateProps {
  onThemeChange: () => void;
}

export type WidgetContext = {
  isWidgetModalOpen: boolean;
  widget?: ReactElement;
  title?: string;
};
const mainMixin: SxProps<Theme> = theme => ({
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.background.default,
  position: "relative",
  backgroundImage: `url(${sunny})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
});

const MainPageTemplate: FC<MainPageTemplateProps> = ({ onThemeChange }) => {
  const [widgetContext, setWidgetContext] = useState<WidgetContext>({
    isWidgetModalOpen: false,
  });
  const [isDrawersOpen, setIsDrawersOpen] = useState<DrawerType>({ widgets: false, cities: false });
  const [cities, setCities] = useState<Array<City>>([]);

  useEffect(() => {
    WeatherStore.fetchCurrentWeather();
    WeatherStore.fetchForecastCurrentHoursWeather();
    WeatherStore.fetchForecastThreeDaysWeather();
  }, [GeolocationStore.longitude, GeolocationStore.latitude]);

  useEffect(() => {
    WidgetsStore.loadDefaultWidgets();
  }, [WeatherStore.currentWeather, WeatherStore.forecastCurrentHoursWeather]);

  useEffect(() => {
    setCities([...CityStore.cities]);
  }, [CityStore.cities]);

  const handleWidgetModalClose = () => {
    setWidgetContext({
      isWidgetModalOpen: false,
      widget: undefined,
      title: undefined,
    });
  };

  const handleDrawerChange = (context: DrawersKeys) => {
    setIsDrawersOpen(prev => ({
      ...prev,
      [context]: !isDrawersOpen[context],
    }));
  };

  const onChangeCitySearch = (searchValue?: string) => {
    setCities(
      CityStore.cities.filter(city =>
        searchValue ? city.name.toLowerCase().includes(searchValue?.toLowerCase()) || city.pinned : city
      )
    );
  };

  const onChangeWidgetSearch = (searchValue?: string) => {
    // TODO поиск по виджетам
    console.log(searchValue);
  };

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 120,
      tolerance: 20,
    },
  });

  const sensors = useSensors(mouseSensor, useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = WidgetsStore.displayedData.map(widget => widget.id).indexOf(`${active.id}`);
      const newIndex = WidgetsStore.displayedData.map(widget => widget.id).indexOf(`${over?.id}`);

      WidgetsStore.displayedData = arrayMove(WidgetsStore.displayedData, oldIndex, newIndex);
    }
  };

  return (
    <DndContext
      modifiers={[restrictToParentElement]}
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Box sx={mainMixin}>
        <Header onThemeChange={onThemeChange} handleDrawerOpen={handleDrawerChange} />
        <Drawer
          anchor={"right"}
          isOpen={isDrawersOpen.cities}
          onClose={() => handleDrawerChange("cities")}
          drawerContent={<DrawerCitiesContent cities={cities} />}
          onSearch={onChangeCitySearch}
        />
        <Drawer
          anchor={"left"}
          isOpen={isDrawersOpen.widgets}
          onClose={() => handleDrawerChange("widgets")}
          drawerContent={<DrawerWidgetsContent />}
          onSearch={onChangeWidgetSearch}
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
  );
};

const MainPageTemplateObserver = observer(MainPageTemplate);
export default MainPageTemplateObserver;
