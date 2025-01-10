import { FC } from "react"
import {
  TextField as TextFieldMui,
  type TextFieldProps as TextFieldPropsMui,
} from "@mui/material"
import { combineSx } from "../../../utils/combineSx.ts"
import { textFieldMixin } from "./TextField.styles.ts"

const TextField: FC<TextFieldPropsMui> = ({
  sx,
  label,
  ...props
}: TextFieldPropsMui) => {
  return (
    <TextFieldMui
      sx={combineSx(sx, textFieldMixin)}
      label={label}
      variant="outlined"
      {...props}
    />
  )
}

export default TextField