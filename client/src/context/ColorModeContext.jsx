import React, { createContext, useContext, useMemo, useState } from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { amber, deepOrange, grey } from '@mui/material/colors';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: deepOrange,
          divider: amber[200],
          icon: amber,
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: amber,
          divider: deepOrange[700],
          icon: '#fff',
          background: {
            default: grey[900],
            paper: deepOrange[900],
          },
          text: {
            primary: grey[100],
            secondary: grey[500],
          },
        }),
  },
});

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: 'light',
});

export const ColorContextProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
      mode,
    }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
