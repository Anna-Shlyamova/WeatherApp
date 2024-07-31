import {SxProps, Theme} from "@mui/material";

export const mainContainerMixin: SxProps<Theme> = theme => ({
  height: '30%',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'absolute',
  bottom: 0,
  left: 0,
  zIndex: '100',
  p: '0 30px',
  backgroundColor: theme.palette.grey[200],
  boxShadow: 'none',
  opacity: '0.95'
});