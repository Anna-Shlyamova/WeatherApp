import { FC, ReactNode, useState } from "react";
import { Drawer as DrawerMui } from "@mui/material";
import TextField from "../../atoms/TextField/TextField.tsx";
import SimpleBar from "simplebar-react";
import { drawerMixin, drawerTextFieldMixin } from "./Drawer.styles.ts";

interface DrawerProps {
  anchor?: "left" | "right" | "top" | "bottom";
  isOpen: boolean;
  onClose: () => void;
  drawerContent: ReactNode;
  onSearch: (searchValue?: string) => void;
}

const Drawer: FC<DrawerProps> = ({ anchor, isOpen, onClose, drawerContent, onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <DrawerMui anchor={anchor} open={isOpen} onClose={onClose} sx={drawerMixin}>
      <>
        <TextField
          label={"Поиск"}
          value={searchValue ?? ""}
          sx={drawerTextFieldMixin}
          onInput={event => {
            // @ts-ignore
            setSearchValue(event.target?.value);
            // @ts-ignore
            onSearch(event.target?.value);
          }}
        />
        <SimpleBar style={{ maxHeight: "calc(100% - 55px)", marginTop: "15px" }}>{drawerContent}</SimpleBar>
      </>
    </DrawerMui>
  );
};

export default Drawer;
