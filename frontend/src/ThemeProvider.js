import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'sans-serif',
  },
  palette: {
    layout: {
      main: '#1a237e',
    },
    text: {
      main: '#000000',
      white: '#ffffff',
      lightBlue: '#d1d3e5',
    },
    buttons: {
      primary: '#3d6cb4',
      secondary: '#0D47A1',
      primaryHover: '#767bb2',
      secondaryHover: '#003366',
      selected: '#151c65',
      selectedHover: '#050719',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: '#B2DFDB',
          backgroundColor: '#E0F8F7',
          border: '1px solid #B2DFDB',
        },
      },
    },
  },
});

// #767bb2
// #1a237e
// #0d0d15
// #050719
// #3d6cb4
// #1a1a1a
// #FFFFFF
// #333333
// #003366
// #66CCFF
// #E0F8F7
// #333333
// #4CAF50
// #FFEB3B
// #F5F5F5
// #000000
// #0D47A1
// #FF5722
// #FAF3E0
// #4E342E
// #E64A19
// #FFD54F
// #F9F9F9
// #4A4A4A
// #607D8B
// #B2DFDB

export default theme;
