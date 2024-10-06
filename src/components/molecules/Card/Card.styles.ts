import {SxProps, Theme} from "@mui/material";

export const CardContainerMixin: SxProps<Theme> = theme => ({
  p: '15px',
  display: 'flex',
  justifyContent: "center",
  alignItems: 'center',
  width: '100%',
  height: '100%',
  border: 'solid 1px',
  borderColor: theme.palette.secondary.main,
});