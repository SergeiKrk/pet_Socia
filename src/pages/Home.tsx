import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { PostsFeed } from '../components/PostsFeed';
import { NewPostForm } from '../components/NewPostForm';
import { fetchUsers } from '../services/api';
import type { User } from '../types/types';

export const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [feedKey, setFeedKey] = useState(0); // версия ленты

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h3" component="h1" fontWeight="bold" color="primary.main" gutterBottom>
        Socia
      </Typography>

      {/* Выбор пользователя */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="user-select-label">Выберите пользователя</InputLabel>
        <Select
          labelId="user-select-label"
          value={selectedUserId}
          label="Выберите пользователя"
          onChange={(e) => setSelectedUserId(e.target.value as number)}
        >
          <MenuItem value=""><em>— не выбран —</em></MenuItem>
          {users.map((u) => (
            <MenuItem key={u.id} value={u.id}>
              {u.username}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Посты выбранного пользователя + форма нового поста */}
      {selectedUserId !== '' && (
        <Box>
          <PostsFeed userId={selectedUserId} refresh={feedKey} />
          <NewPostForm
            userId={selectedUserId}
            onSuccess={() => setFeedKey((k) => k + 1)}
          />
        </Box>
      )}
    </Container>
  );
};