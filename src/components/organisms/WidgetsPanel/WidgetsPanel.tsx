import {Box} from "@mui/material";
import {mainContainerMixin} from "./WidgetsPanel.style.ts";
import {WidgetContext} from "../../templates/MainPageTemplate";
import { observer } from "mobx-react-lite";
import WidgetsStore from "../../../stores/WidgetsStore.tsx";
import {FC, useEffect} from "react";
import Card from "../../molecules/Card/Card"

interface WidgetsPanelProps {
  openModal: (context: WidgetContext)=>void
}

const WidgetsPanel: FC<WidgetsPanelProps> = ({
  openModal,
  }) => {
  const widgets = WidgetsStore.data;

  useEffect(() => {
    WidgetsStore.loadDefaultWidgets();
  }, []);

  return (
    <Box sx={mainContainerMixin} onClick={ ()=> openModal({isWidgetModalOpen: true})}>
      {widgets.map(widget =>
        <Card key={widget.name} onOpen={ ()=> openModal({isWidgetModalOpen: true, widget: widget.fullLayout})} cardContent={widget.layout}/>
      )}
    </Box>
  )}

const WidgetsPanelObserver = observer(WidgetsPanel);
export default WidgetsPanelObserver;