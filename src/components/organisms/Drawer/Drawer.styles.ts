import { SxProps, Theme } from "@mui/material";

export const drawerMixin: SxProps<Theme> = (theme) => ({
  ".MuiPaper-root": {
    py: "15px",
    backgroundColor: theme.palette.primary.main,
  },
});

export const drawerTextFieldMixin: SxProps = {
  "&.MuiFormControl-root": {
    mx: "15px",
  },
};
