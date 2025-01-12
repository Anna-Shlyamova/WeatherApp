import { FC, ReactElement } from "react"
import { Box, SxProps, Theme } from "@mui/material"
import { combineSx } from "../../../utils/combineSx.ts"
import {
  CardContainerDraggableMixin,
  CardContainerMixin,
} from "./Card.styles.ts"
import { useDraggable } from "@dnd-kit/core"
import { useSortable } from "@dnd-kit/sortable"

interface CardProps {
  cardContent?: ReactElement | null
  contentSx?: SxProps<Theme>
  onOpen?: () => void
  id: string
}

const Card: FC<CardProps> = ({ cardContent, contentSx, onOpen, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id })

  return (
    <Box
      onClick={onOpen}
      sx={combineSx(
        CardContainerMixin,
        contentSx,
        CardContainerDraggableMixin(transform, transition)
      )}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      {cardContent}
    </Box>
  )
}

export default Card
