import {FC, ReactElement} from 'react';
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
  handleClose: ()=> void;
}

const Modal: FC<DialogProps & ModalProps> = ({
  sx,
  title,
  dialogContent,
  contentSx,
  titleSx,
  dialogActions,
  actionsSx,
  handleClose,
  ...props
})=> {
  return (
    <Dialog sx={sx} {...props}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
        <DialogTitle sx={titleSx}>{title}</DialogTitle>
        <IconButton onClick={handleClose}><ClearIcon/></IconButton>
      </Box>
      <DialogContent sx={contentSx}>{dialogContent}</DialogContent>
      <DialogActions sx={actionsSx}>{dialogActions}</DialogActions>
    </Dialog>
)};

export default Modal;
