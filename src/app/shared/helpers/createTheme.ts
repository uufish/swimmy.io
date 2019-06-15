import { blue, cyan } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

export const createTheme = () => {
  return createMuiTheme({
    overrides: {
      MuiBackdrop: { root: { backgroundColor: 'rgba(255, 255, 255, 0.8)' } },
      MuiDrawer: {
        paper: { backgroundColor: 'rgba(0, 0, 0, 0)' },
        paperAnchorDockedLeft: { borderRight: 0 }
      },
      MuiPaper: {
        elevation1: { boxShadow: '0 2px 8px rgba(214, 214, 224, 1)' },
        elevation2: { boxShadow: '0 2px 8px rgba(214, 214, 224, 1)' },
        elevation4: { boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }
      }
    },
    palette: {
      background: { default: '#ffffff' },
      divider: 'rgba(0, 0, 0, 0.08)',
      primary: { main: cyan[500] },
      secondary: { main: blue.A400 }
    },
    props: { MuiButtonBase: { disableRipple: true } },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily: ['Helvetica', 'Roboto', 'sans-serif'].join(',')
    }
  })
}

if (process.env.NODE_ENV === 'development') {
  window.theme = createTheme()
}