import { SxProps, Theme } from "@mui/material"

export const drawerMixin: SxProps<Theme> = (theme) => ({
  ".MuiPaper-root": {
    py: "15px",
    pr: "15px",
    pl: "15px",
    backgroundColor: theme.palette.primary.main,
  },
})

export const drawerTextFieldMixin: SxProps<Theme> = (theme) => ({
  ".MuiPaper-root": {
    p: "15px",
    backgroundColor: theme.palette.primary.main,
  },
})