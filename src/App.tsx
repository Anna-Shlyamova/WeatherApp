import { useEffect, useState } from "react"
import MainPageTemplate from "./components/templates/MainPageTemplate.tsx"
import { Box, Theme, ThemeProvider } from "@mui/material"
import darkTheme from "./themes/dark.ts"
import lightTheme from "./themes/light.ts"
import GeolocationStore from "./stores/GeolocationStore.ts"
import { Chart, registerables } from "chart.js/auto"
import CityStore from "./stores/CityStore.ts"

Chart.register(...registerables)

function App() {
  const [theme, setTheme] = useState<Theme>(darkTheme)
  const changeTheme = () => {
    if (theme === darkTheme) {
      setTheme(lightTheme)
    } else {
      setTheme(darkTheme)
    }
  }

  useEffect(() => {
    GeolocationStore.fetchCoordinates()
    CityStore.fetchCities()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <MainPageTemplate onThemeChange={changeTheme} />
      </Box>
    </ThemeProvider>
  )
}

export default App
