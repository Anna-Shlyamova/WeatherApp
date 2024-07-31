import { FC, ReactElement } from 'react';
import {
  Box,
  SxProps,
  Theme,
} from '@mui/material';

interface CardProps {
  cardContent?: ReactElement | null;
  contentSx?: SxProps<Theme>;
  onOpen?: ()=> void;
}

const Card: FC<CardProps> = ({
  cardContent,
  contentSx,
  onOpen,
 }) => (
  <Box onClick={onOpen} sx={contentSx}>
    {cardContent}
  </Box>
);

export default Card;
