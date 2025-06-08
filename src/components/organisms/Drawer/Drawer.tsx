import {FC, ReactNode, useState} from "react"
import { Drawer as DrawerMui } from "@mui/material"
import TextField from "../../atoms/TextField/TextField.tsx"
import SimpleBar from "simplebar-react"
import { drawerMixin, drawerTextFieldMixin } from "./Drawer.styles.ts"
import { observer } from "mobx-react-lite"

interface DrawerProps {
  anchor?: "left" | "right" | "top" | "bottom",
  isOpen: boolean,
  onClose: () => void,
  drawerContent: ReactNode,
  onSearch: (searchValue?: string) => void,
}

const Drawer: FC<DrawerProps> = ({
  anchor,
  isOpen,
  onClose,
  drawerContent,
  onSearch,
}) => {
  const [searchValue, setSearchValue] = useState("")

  return (
    <DrawerMui anchor={anchor} open={isOpen} onClose={onClose} sx={drawerMixin}>
      <>
        <TextField
          label={"Поиск"}
          value={searchValue ?? ""}
          sx={drawerTextFieldMixin}
          onInput={(event) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            setSearchValue(event.target?.value);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            onSearch(event.target?.value);
          }}
        />
        <SimpleBar style={{ maxHeight: "calc(100% - 55px)", marginTop: "15px" }}>
          {drawerContent}
        </SimpleBar>
      </>
    </DrawerMui>
  )
}

const DrawerObserver = observer(Drawer)
export default DrawerObserver
