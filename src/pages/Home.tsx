import { Container, Divider, Typography } from '@mui/material';
import { PostsFeed } from '../components/PostsFeed'; 

export const Home = () => (
  <Container maxWidth="md" sx={{ py: 3 }}>
    <Typography variant='h3' component='h1' fontWeight={'bold'} color='primary.main' gutterBottom>
      Socia
    </Typography>
    <PostsFeed />
  </Container>
)