import { createTheme } from '@mui/material/styles';
import { appBarHeight } from '../constants';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9c27b0'
    },
    secondary: {
      main: '#f50057'
    }
  },
  components: {
    MuiToolbar: {
      styleOverrides: {
        dense: {
          height: appBarHeight,
          minHeight: appBarHeight
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 'auto',
          '& + .MuiListItemText-root': {
            marginLeft: 15
          }
        }
      }
    }
  }
});

export default theme;
