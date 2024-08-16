import {SxProps, Theme} from "@mui/material";

export const menuItemMixin: SxProps<Theme> = {
  py: '15px',
  display: 'flex',
  justifyContent: "space-between",
  alignItems: 'center',
};

export const menuItemTextMixin: SxProps<Theme> = theme => ({
  color: theme.palette.action.active,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.action.hover,
  },
  "&:active":{
    color: theme.palette.action.selected,
  }
})