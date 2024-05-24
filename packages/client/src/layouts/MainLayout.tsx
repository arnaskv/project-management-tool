import SidePanel from '@/components/sidepanel/SidePanel';
import React, { ReactNode } from 'react';
import { styled } from '@mui/material';

const Box = styled('div')({
  display: 'flex',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  background: theme.palette.action.disabledBackground,
  padding: '1rem',
}));

interface Props {
  children: ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <SidePanel />
      <Main>{children}</Main>
    </Box>
  );
};

export default MainLayout;
