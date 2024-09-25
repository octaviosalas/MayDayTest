import { createContext, useMemo, useState, useContext, ReactNode } from 'react';
import { createTheme, ThemeProvider, Theme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeToggleContextProps {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
}

const ThemeToggleContext = createContext<ThemeToggleContextProps | undefined>(undefined);

export const useThemeToggle = (): ThemeToggleContextProps => {
  const context = useContext(ThemeToggleContext);
  if (!context) {
    throw new Error('useThemeToggle must be used within a ThemeToggleProvider');
  }
  return context;
};

interface ThemeToggleProviderProps {
  children: ReactNode; 
}

export const ThemeToggleProvider = ({ children }: ThemeToggleProviderProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' && {
            background: {
              default: '#121212', 
              paper: '#1e1e1e',
            },
            text: {
              primary: '#ffffff',
            },
          }),
        },
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                backgroundColor: '#ffffff',
                '& .MuiInputBase-input': {
                  color: mode === 'dark' ? '#000000' : '#000000',
                },
                '& .MuiInputLabel-root': {
                  color: mode === 'dark' ? '#ffffff' : '#000000', 
                },
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#ffffff',
                  '& fieldset': {
                    borderColor: '#000000', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#000000', 
                  },
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
};