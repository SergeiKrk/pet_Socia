import { createTheme } from '@mui/material/styles';

// Расширяем тип Palette для кастомных цветов (если нужно)
declare module '@mui/material/styles' {
  interface Palette {
    custom?: {
      light?: string;
      main: string;
      dark?: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      light?: string;
      main: string;
      dark?: string;
    };
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    // Пример кастомного цвета
    custom: {
      main: '#4caf50',
    },
  },
});

export default theme;