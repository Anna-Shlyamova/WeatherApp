import {FC} from 'react';
import {
  Box, IconButton,
  Typography,
} from '@mui/material';
import {menuItemMixin, menuItemTextMixin} from "./MenuItem.styles.ts";
import PushPinIcon from '@mui/icons-material/PushPin';

interface MenuItemProps {
  value: string
}

const MenuItem: FC<MenuItemProps> = ({value}) => {
  return (
    <Box sx={menuItemMixin}>
    <Typography sx={menuItemTextMixin}>{value}</Typography>
      <IconButton>
        <PushPinIcon color={"action"}/>
      </IconButton>
    </Box>
  )
};

export default MenuItem;