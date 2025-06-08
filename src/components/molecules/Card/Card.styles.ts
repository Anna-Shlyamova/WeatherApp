import { Transform } from "@dnd-kit/utilities"
import { SxProps, Theme } from "@mui/material"

export const CardContainerMixin: SxProps<Theme> = (theme) => ({
  p: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  border: "solid 1px",
  borderColor: theme.palette.secondary.main,
  cursor: "pointer",
  '&:hover': {
    border: `2px solid ${theme.palette.primary.main}`,
  }
})

export const CardContainerDraggableMixin = (
  transform: Transform | null,
  transition?: string,
  isDragging: boolean = false,
): SxProps<Theme> => (theme) => ({
  transform: transform
    ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
    : undefined,
  transition: transition ?? undefined,
  backgroundColor: isDragging ? theme.palette.primary.dark : undefined,
  zIndex: isDragging ? 2 : "auto"
})

export const CardTextMixin: SxProps<Theme> = (theme) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "24px",
})
