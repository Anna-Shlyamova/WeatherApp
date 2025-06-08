import { FC, ReactElement } from "react";
import { Box, Tooltip } from "@mui/material";
import { menuCardItemMixin } from "./MenuCardItem.styles.ts";

interface MenuItemProps {
  content: ReactElement;
  onClick: () => void;
  tooltipTitle?: string;
}

const MenuCardItem: FC<MenuItemProps> = ({ content, onClick, tooltipTitle }) => {
  return (
    <Tooltip title={tooltipTitle}>
      <Box sx={menuCardItemMixin} onClick={onClick}>
        {content}
      </Box>
    </Tooltip>
  );
};

export default MenuCardItem;
