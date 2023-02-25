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
          secondary: grey,
          divider: amber[200],
          icon: amber,
          background: {
            default: grey[100],
            paper: '#fff',
            card: grey[50],
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: amber,
          secondary: grey,
          divider: deepOrange[700],
          icon: '#fff',
          background: {
            default: '#121212',
            paper: grey[900],
            card: grey[800],
          },
          text: {
            primary: grey[100],
            secondary: grey[500],
          },
        }),
  },
  typography: {
    h1: {
      color: mode === 'light' ? grey[900] : grey[100],
    },
    h2: {
      color: mode === 'light' ? grey[800] : grey[500],
    },
    h6: {
      color: mode === 'light' ? grey[900] : '#eeeeee',
    },
    body1: {
      color: mode === 'light' ? grey[900] : grey[100],
    },
    body2: {
      color: mode === 'light' ? grey[800] : grey[300],
    },
    caption: {
      color: mode === 'light' ? grey[500] : grey[300],
    },
    button: {
      color: mode === 'light' ? '#fff' : grey[100],
    },
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
