import { Box, Typography, Divider } from '@mui/material';
import { Albums } from "../components/Albums.tsx";
import { Comments } from "../components/Comments";
import { Photos } from "../components/Photos";
import { Posts } from "../components/Posts";
import { Todos } from "../components/Todos.tsx";
import { Users } from "../components/Users";

export function Home() {
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
        Socia
      </Typography>

      <Photos />
      <Divider sx={{ my: 3 }} /> {/* margin-top и margin-bottom: 24px */}
      
      <Posts />
      <Divider sx={{ my: 3 }} />
      
      <Users />
      <Divider sx={{ my: 3 }} />
      
      <Comments />
      <Divider sx={{ my: 3 }} />
      
      <Albums />
      <Divider sx={{ my: 3 }} />
      
      <Todos />
      <Divider sx={{ my: 3 }} />
    </Box>
  )
}