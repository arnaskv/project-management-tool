import { useMemo, useState } from 'react';
import { createTheme, PaletteMode, useMediaQuery } from '@mui/material';

export const useColorTheme = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const defaultMode = prefersDarkMode ? 'dark' : 'light';

  const [mode, setMode] = useState<PaletteMode>(defaultMode);

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const modifiedTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return {
    theme: modifiedTheme,
    mode,
    toggleColorMode,
  };
};
