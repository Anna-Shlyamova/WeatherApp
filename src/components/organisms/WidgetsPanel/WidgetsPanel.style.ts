import { SxProps, Theme } from "@mui/material";

export const mainContainerMixin: SxProps<Theme> = theme => ({
  height: "30%",
  width: "100%",
  display: "flex",
  position: "absolute",
  bottom: 0,
  left: 0,
  backgroundColor: theme.palette.grey[200],
  boxShadow: "none",
  opacity: "0.95",
});
