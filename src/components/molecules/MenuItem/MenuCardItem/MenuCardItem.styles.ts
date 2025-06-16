import { SxProps, Theme } from "@mui/material";

export const menuCardItemMixin: SxProps<Theme> = theme => ({
  width: "150px",
  height: "150px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 3px",
  borderRadius: "15px",
  borderColor: theme.palette.action.active,
  color: theme.palette.action.active,
});
