import { Box, Typography } from '@mui/material';

export function Explore() {
  return (
    <Box 
      sx={{ 
        p: 3, // padding: 24px (аналог p-4)
        bgcolor: 'background.default', // использует цвет из темы
        minHeight: '100vh' // min-h-screen
      }}
    >
      <Typography 
        variant="h3" 
        component="h1" 
        sx={{ 
          fontWeight: 'bold',
          color: 'primary.main', // использует primary цвет из темы
          mb: 3 // margin-bottom: 24px
        }}
      >
        Explore
      </Typography>
    </Box>
  )
}