import { type SxProps, type Theme } from '@mui/material';

export const headerContainerMixin: SxProps<Theme> = theme => ({
  height: '80px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: '100',
  p: '0 30px',
  backgroundColor: theme.palette.grey[200],
  boxShadow: 'none',
  opacity: '0.95'
});
export const sidesContainerMixin: SxProps<Theme> = {
  width: '8%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const geolocationMixin: SxProps<Theme> = theme => ({
  color: theme.palette.action["active"],
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.primary.main,
  },
  "&:active":{
    color: theme.palette.primary.dark,
  }
})