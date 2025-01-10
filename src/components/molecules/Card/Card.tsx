import { FC, ReactElement } from "react"
import { Box, SxProps, Theme } from "@mui/material"
import { combineSx } from "../../../utils/combineSx.ts"
import { CardContainerMixin } from "./Card.styles.ts"

interface CardProps {
  cardContent?: ReactElement | null
  contentSx?: SxProps<Theme>
  onOpen?: () => void
}

const Card: FC<CardProps> = ({ cardContent, contentSx, onOpen }) => (
  <Box onClick={onOpen} sx={combineSx(CardContainerMixin, contentSx)}>
    {cardContent}
  </Box>
)

export default Card