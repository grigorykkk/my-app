// mui/ThemeProviderWithToggle.jsx
import { createContext, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useLocalStorage from '../hooks/useLocalStorage';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleMode: () => {},
});

const getPreferredMode = () => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

function ThemeProviderWithToggle({ children }) {
  const [mode, setMode] = useLocalStorage('theme-mode', getPreferredMode);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.dataset.theme = mode;
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleMode: () =>
        setMode((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [mode, setMode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: { main: '#1976d2' },
          secondary: { main: '#dc004e' },
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ThemeProviderWithToggle;
