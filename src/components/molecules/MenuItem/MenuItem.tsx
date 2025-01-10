import { FC } from "react"
import { Box, IconButton, Typography } from "@mui/material"
import {
  menuItemMixin,
  menuItemTextMixin,
  pushPinIconMixin,
} from "./MenuItem.styles.ts"
import PushPinIcon from "@mui/icons-material/PushPin"
import { City } from "../../../types/City.ts"
import CityStore from "../../../stores/CityStore.ts"

interface MenuItemProps {
  city: City
  handleChangeCity: (city: City) => void
}

const MenuItem: FC<MenuItemProps> = ({ city, handleChangeCity }) => {
  const pinCity = () => {
    const { pinned, ...body } = city
    CityStore.updateCities({ ...body, pinned: !pinned })
  }

  return (
    <Box sx={menuItemMixin} onClick={() => handleChangeCity(city)}>
      <Typography sx={menuItemTextMixin}>{city.name}</Typography>
      <IconButton onClick={pinCity}>
        <PushPinIcon color={"action"} sx={pushPinIconMixin(city.pinned)} />
      </IconButton>
    </Box>
  )
}

export default MenuItem
