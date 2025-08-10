import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.tsx'

// Минимальная MUI тема (можно вынести в отдельный файл theme.ts)
const theme = createTheme({
  palette: {
    mode: 'light', // или 'dark' для тёмной темы
    primary: {
      main: '#1976d2', // синий по умолчанию MUI
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Нормализует стили и добавляет background */}
      <App />
    </ThemeProvider>
  </StrictMode>,
)