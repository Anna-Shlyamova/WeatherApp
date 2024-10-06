import {FC, useState} from 'react';
import {
  Drawer as DrawerMui,
} from '@mui/material';
import TextField from "../../atoms/TextField/TextField.tsx";
import SimpleBar from "simplebar-react";
import CityStore from "../../../stores/CityStore.ts";
import MenuItem from "../../molecules/MenuItem/MenuItem.tsx"
import {drawerMixin, drawerTextFieldMixin} from "./Drawer.styles.ts";
interface DrawerProps {
  anchor?: 'left' | 'right' | 'top' |  'bottom';
  isOpen: boolean
  onClose: () => void;
}

const Drawer: FC<DrawerProps> = ({anchor, isOpen, onClose}) => {
  const [searchValue, setSearchValue] = useState('');
  return (
    <DrawerMui
      anchor={anchor}
      open={isOpen}
      onClose={onClose}
      sx={drawerMixin}
    >
      <>
      <TextField label={'Поиск'} value={searchValue ?? ''} sx={drawerTextFieldMixin} onInput={(event) =>{
        setSearchValue(event.target.value);
      }}/>
      <SimpleBar style={{maxHeight: 'calc(100% - 55px)', marginTop: '15px'}}>
        {CityStore.cities
          .filter(city => searchValue
          ? city.name.toLowerCase().includes(searchValue?.toLowerCase())
          : city)
          .map((city)=>
          <MenuItem value={city.name}/>
        )}
      </SimpleBar>
      </>
    </DrawerMui>
  )
};

export default Drawer;