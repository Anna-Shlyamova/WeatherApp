import { Box } from "@mui/material";
import { mainContainerMixin } from "./WidgetsPanel.style.ts";
import { WidgetContext } from "../../templates/MainPageTemplate";
import { observer } from "mobx-react-lite";
import WidgetsStore from "../../../stores/WidgetsStore.tsx";
import { FC, useEffect } from "react";
import Card from "../../molecules/Card/Card";
import WeatherStore from "../../../stores/WeatherStore.ts";
import { horizontalListSortingStrategy, SortableContext } from "@dnd-kit/sortable";

interface WidgetsPanelProps {
  openModal: (context: WidgetContext) => void;
}

const WidgetsPanel: FC<WidgetsPanelProps> = ({ openModal }) => {
  const widgets = WidgetsStore.data;

  useEffect(() => {
    WidgetsStore.loadDefaultWidgets();
  }, [WeatherStore.currentWeather, WeatherStore.forecastCurrentHoursWeather]);

  return (
    <Box sx={mainContainerMixin}>
      <SortableContext items={widgets} strategy={horizontalListSortingStrategy}>
        {widgets.map(widget => (
          <Card
            key={widget.name}
            onOpen={() =>
              openModal({
                isWidgetModalOpen: true,
                widget: widget.fullLayout,
                title: widget.nameRus,
              })
            }
            widget={widget}
          />
        ))}
      </SortableContext>
    </Box>
  );
};

const WidgetsPanelObserver = observer(WidgetsPanel);
export default WidgetsPanelObserver;
