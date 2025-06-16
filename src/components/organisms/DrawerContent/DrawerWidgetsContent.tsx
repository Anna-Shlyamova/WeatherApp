import { FC } from "react";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import WidgetsStore from "../../../stores/WidgetsStore.tsx";
import MenuCardItem from "../../molecules/MenuItem/MenuCardItem/MenuCardItem.tsx";
import { WidgetsDrawerContainer } from "./DrawerContent.styles.ts";

interface DrawerWidgetsContentProps {}

const DrawerWidgetsContent: FC<DrawerWidgetsContentProps> = () => {
  return (
    <Box sx={WidgetsDrawerContainer}>
      {WidgetsStore.getDrawerWidgets().map(widget => (
        <MenuCardItem
          content={widget.previewLayout}
          onClick={() => {}}
          key={`widget-${widget.id}-item`}
          tooltipTitle={widget.nameRus}
        />
      ))}
    </Box>
  );
};

const DrawerWidgetsContentObserver = observer(DrawerWidgetsContent);
export default DrawerWidgetsContentObserver;
