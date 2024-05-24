import React from 'react';
import { styled, Typography } from '@mui/material';

const Box = styled('div')(({ theme }) => ({
  minHeight: '150px',
  borderRadius: '12px',
  padding: '0.5rem',
  boxSizing: 'border-box',
  border: 'solid 1px transparent',
  background: theme.palette.action.disabledBackground,
  width: '100%',
  ':hover': {
    border: 'black solid 1px',
    cursor: 'grab',
  },
}));

interface Props {
  title: string;
  description: string;
}

const BoardItem: React.FC<Props> = ({ title, description }) => {
  return (
    <Box>
      <Typography variant="h5">{title}</Typography>
      <Typography variant="body1">{description}</Typography>
    </Box>
  );
};

export default BoardItem;
