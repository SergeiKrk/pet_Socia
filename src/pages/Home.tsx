import { Container, Typography } from '@mui/material';
import { PostsFeed } from '../components/PostsFeed'; 
import CreateUserForm from '../components/CreateUserForm';

export const Home = () => (
  <Container maxWidth="md" sx={{ py: 3 }}>
    <Typography variant='h3' component='h1' fontWeight={'bold'} color='primary.main' gutterBottom>
      Socia
    <CreateUserForm />
    </Typography>
    <PostsFeed />
  </Container>
)