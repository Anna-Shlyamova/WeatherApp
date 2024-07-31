import { FC, ReactElement } from 'react';
import {
  Box,
  Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, IconButton,
  SxProps,
  Theme,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

interface ModalProps {
  dialogContent?: ReactElement | null;
  contentSx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  dialogActions?: ReactElement | null;
  actionsSx?: SxProps<Theme>;
  onOpen?: ()=> void;
  onModalClose?: ()=> void;
}

const Modal: FC<DialogProps & ModalProps> = ({
  sx,
  title,
  dialogContent,
  contentSx,
  titleSx,
  dialogActions,
  actionsSx,
  onModalClose,
  ...props
})=> (
  <Dialog sx={sx}{...props}>
    <Box>
      <DialogTitle sx={titleSx}>{title}</DialogTitle>
      <IconButton onClick={(event) => props.onClose && onModalClose && props.onClose(event, 'escapeKeyDown') }><ClearIcon/></IconButton>
    </Box>
    <DialogContent sx={contentSx}>{dialogContent}</DialogContent>
    <DialogActions sx={actionsSx}>{dialogActions}</DialogActions>
  </Dialog>
);

export default Modal;
