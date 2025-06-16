import { FC } from "react";
import MenuTextItem from "../../molecules/MenuItem/MenuTextItem/MenuTextItem.tsx";
import CityStore from "../../../stores/CityStore.ts";
import { City } from "../../../types/City.ts";

interface DrawerCitiesContentProps {
  cities?: Array<City>;
}

const DrawerCitiesContent: FC<DrawerCitiesContentProps> = ({ cities }) => {
  const sortedCities = cities?.sort((a, b) => {
    if (a.pinned === b.pinned) {
      return 0;
    }
    return a.pinned ? -1 : 1;
  });

  return (
    <>
      {sortedCities?.map(city => (
        <MenuTextItem city={city} onClick={CityStore.changeCurrentCity} key={`city-${city.id}-item`} />
      ))}
    </>
  );
};

export default DrawerCitiesContent;
