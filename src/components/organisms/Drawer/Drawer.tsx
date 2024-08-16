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
      <TextField label={'Поиск'} sx={drawerTextFieldMixin} onInput={(event) =>{
        setSearchValue(event.target.value);
      }}/>
      <SimpleBar style={{height: '100%'}}>
        {CityStore.cities
          .filter(city => city.full_name.toLowerCase().includes(searchValue?.toLowerCase()) )
          .map((city)=>
          <MenuItem value={city.full_name}/>
        )}
      </SimpleBar>
      </>
    </DrawerMui>
  )
};

export default Drawer;