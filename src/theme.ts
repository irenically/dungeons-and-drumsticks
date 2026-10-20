import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#881e1a', contrastText: '#ffe7b1' },
    secondary: { main: '#92571b', contrastText: '#ffe7b1' },
    background: { default: '#e9c58f', paper: '#f2d4a1' },
    text: { primary: '#4a230f', secondary: '#70593f' },
  },
  typography: {
    fontFamily: '"IM Fell English", Georgia, serif',
    button: { fontFamily: 'Cinzel, Georgia, serif', textTransform: 'none' },
  },
  shape: { borderRadius: 6 },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': { outline: '3px solid #92571b', outlineOffset: 4 },
        },
      },
    },
  },
});
