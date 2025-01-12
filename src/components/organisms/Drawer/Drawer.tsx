import { FC, useEffect, useState } from "react"
import { Drawer as DrawerMui } from "@mui/material"
import TextField from "../../atoms/TextField/TextField.tsx"
import SimpleBar from "simplebar-react"
import CityStore from "../../../stores/CityStore.ts"
import MenuItem from "../../molecules/MenuItem/MenuItem.tsx"
import { drawerMixin, drawerTextFieldMixin } from "./Drawer.styles.ts"
import { City } from "../../../types/City.ts"
import { observer } from "mobx-react-lite"

interface DrawerProps {
  anchor?: "left" | "right" | "top" | "bottom"
  isOpen: boolean
  onClose: () => void
  handleChangeCity: (city: City) => void
}

const Drawer: FC<DrawerProps> = ({
  anchor,
  isOpen,
  onClose,
  handleChangeCity,
}) => {
  const [searchValue, setSearchValue] = useState("")
  const [cities, setCities] = useState<Array<City>>([])

  useEffect(() => {
    setCities(
      CityStore.cities
        .filter((city) =>
          searchValue
            ? city.name.toLowerCase().includes(searchValue?.toLowerCase()) ||
              city.pinned
            : city
        )
        .sort((a, b) => {
          if (a.pinned === b.pinned) {
            return 0
          }
          return a.pinned ? -1 : 1
        })
    )
  }, [CityStore.cities, searchValue])

  return (
    <DrawerMui anchor={anchor} open={isOpen} onClose={onClose} sx={drawerMixin}>
      <>
        <TextField
          label={"Поиск"}
          value={searchValue ?? ""}
          sx={drawerTextFieldMixin}
          onInput={(event) => {
            setSearchValue(event.target?.value)
          }}
        />
        <SimpleBar
          style={{ maxHeight: "calc(100% - 55px)", marginTop: "15px" }}
        >
          {cities.map((city) => (
            <MenuItem city={city} handleChangeCity={handleChangeCity} />
          ))}
        </SimpleBar>
      </>
    </DrawerMui>
  )
}

const DrawerObserver = observer(Drawer)
export default DrawerObserver
