import {createTheme, PaletteMode} from "@mui/material";

const lightOptions = {
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
    allVariants: {
      color: "#272F26",
    },
  },
  palette: {
    mode: "light" as PaletteMode,
    primary: {
      main: '#34A0FF',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#47008F',
    },
    action:{
      active: "#2C2B2C",
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    grey: {
      "100": "#CACFD64D",
      "200": "#EFEDFF",
    },
    background: {
      default: "#FFF7F1",
    },
  },
};

const lightTheme = createTheme(lightOptions);

export default lightTheme;