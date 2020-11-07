import { createMuiTheme } from '@material-ui/core/styles';

const baseTheme = {
  palette: {
    primary: {
      light: '#2196F3',
      main: '#1565C0',
      dark: '#0d47a1',
      contrastText: '#FFF'
    },
    backGround: '#f2f3f9'
  },
  typography: {
    fontFamily: ['"Lato"', 'sans-serif'].join(','),
    useNextVariants: true
  },
  spacing: 2
}

export default createMuiTheme(baseTheme)
