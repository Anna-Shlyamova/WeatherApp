import { SxProps, Theme } from "@mui/material";

export const menuTextItemMixin: SxProps<Theme> = theme => ({
  p: "15px 5px 15px 15px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
  },
  "&:active": {
    backgroundColor: theme.palette.primary.dark,
  },
});

export const menuItemTextMixin: SxProps<Theme> = theme => ({
  color: theme.palette.action.active,
});

export const pushPinIconMixin = (pinned?: boolean): SxProps => ({
  transform: pinned ? "rotate(90deg)" : "none",
  transition: "transform 0.1s ease",
});
