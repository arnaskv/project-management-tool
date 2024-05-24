import { IconButton, styled } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useThemeContext } from '@/theme/ThemeContextProvider';

const Box = styled('div')({
  display: 'flex',
});

const DarkModeToggle = () => {
  const { mode, toggleColorMode } = useThemeContext();

  return (
    <Box>
      <IconButton onClick={toggleColorMode} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
};

export default DarkModeToggle;
