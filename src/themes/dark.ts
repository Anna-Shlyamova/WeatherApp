import { createTheme, PaletteMode } from "@mui/material"

const DarkOptions = {
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
    allVariants: {
      color: "#272F26",
    },
  },
  palette: {
    mode: "dark" as PaletteMode,
    primary: {
      main: "#34A0FF",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      contrastText: "#FFFAE8",
    },
    secondary: {
      main: "#484c4f",
      //light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      //contrastText: '#47008F',
    },
    inherit: {
      main: "#F8F4F0",
    },
    action: {
      active: "#F8F4F0",
      hover: "#C4E1F0",
      selected: "#9FD3F0",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    grey: {
      "100": "#CACFD64D",
      "200": "#2C2B2C",
    },
    background: {
      default: "#3C3F41",
    },
  },
}

const darkTheme = createTheme(DarkOptions)
export default darkTheme