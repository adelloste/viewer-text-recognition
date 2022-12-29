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
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          width: '100%',
          boxShadow:
            'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px'
        }
      }
    }
  }
});

export default theme;
