import Header from "../organisms/Header/Header";
import {Box, SxProps, Theme} from "@mui/material";
import sunny from '../../images/sunny.gif';
import VidgetsPanel from "../organisms/WidgetsPanel/WidgetsPanel.tsx";
import Modal from "../organisms/Modal/Modal"
import {ReactElement, useState} from "react";

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
export default MainPageTemplate