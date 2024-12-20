import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#5D87FF',
    },
    secondary: {
      main: '#6c757d',
    },
    error: {
      main: '#FA896B',
    },
    background: {
      default: '#fff',
    },
    text: {
      primary: '#2A3547',
      secondary: '#5A6A85',
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.125rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '7px',
          padding: '30px',
          boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '7px',
          padding: '7px 16px',
          fontSize: '0.875rem',
        },
      },
    },
  },
});