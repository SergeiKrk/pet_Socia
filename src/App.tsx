// App.tsx
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Home } from './pages/Home';
import { Posts } from './components/Posts';
import { Users } from './components/Users';
import { Photos } from './components/Photos';
import { Container, Tabs, Tab } from '@mui/material';

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Tabs value={false} indicatorColor="primary" textColor="primary">
          <Tab label="Лента" component={NavLink} to="/" />
          <Tab label="Посты" component={NavLink} to="/posts" />
          <Tab label="Юзеры" component={NavLink} to="/users" />
          <Tab label="Фото" component={NavLink} to="/photos" />
        </Tabs>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/users" element={<Users />} />
          <Route path="/photos" element={<Photos />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}