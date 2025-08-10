import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Profile } from './pages/Profile';
import { Feed } from './pages/Feed';
import { Explore } from './pages/Explore';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </Router>
  );
}