import { SxProps, Theme } from "@mui/material"

export const textFieldMixin: SxProps<Theme> = (theme) => ({
  ".MuiInputBase-root": {
    height: "40px",
    ".MuiInputBase-input": {
      fontSize: "14px",
      height: "40px",
    },
  },
  ".MuiInputBase-input-MuiOutlinedInput-input": {
    color: theme.palette.action["active"],
  },
  "& label": {
    "&.Mui-focused": {
      color: theme.palette.action.active,
    },
  },
  ".MuiFormLabel-root": {
    color: theme.palette.action.active,
    top: "-6px",
  },
})