import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { menuTextItemMixin, menuItemTextMixin, pushPinIconMixin } from "./MenuTextItem.styles.ts";
import PushPinIcon from "@mui/icons-material/PushPin";
import { City } from "../../../../types/City.ts";
import CityStore from "../../../../stores/CityStore.ts";

interface MenuTextItemProps {
  city: City;
  onClick: (currentCity: City) => void;
}

const MenuTextItem: FC<MenuTextItemProps> = ({ city, onClick }) => {
  const pinCity = () => {
    const { pinned, ...body } = city;
    CityStore.updateCities({ ...body, pinned: !pinned });
  };

  return (
    <Box sx={menuTextItemMixin} onClick={() => onClick(city)}>
      <Typography sx={menuItemTextMixin}>{city.name}</Typography>
      <IconButton
        onClick={(event): void => {
          event.stopPropagation();
          pinCity();
        }}
      >
        <PushPinIcon color={"action"} sx={pushPinIconMixin(city.pinned)} />
      </IconButton>
    </Box>
  );
};

export default MenuTextItem;
