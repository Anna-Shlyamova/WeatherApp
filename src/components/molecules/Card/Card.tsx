import { FC } from "react"
import { Box, SxProps, Theme, Typography } from "@mui/material"
import { combineSx } from "../../../utils/combineSx.ts"
import {
  CardContainerDraggableMixin,
  CardContainerMixin,
  CardTextMixin,
} from "./Card.styles.ts"
import { useSortable } from "@dnd-kit/sortable"
import { Widget } from "../../../types/Widget.ts"

interface CardProps {
  contentSx?: SxProps<Theme>
  onOpen?: () => void
  widget: Widget
}

const Card: FC<CardProps> = ({ contentSx, onOpen, widget }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: widget.id })

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
      <Typography sx={CardTextMixin}>{widget.nameRus}</Typography>
      {widget.layout}
    </Box>
  )
}

export default Card
