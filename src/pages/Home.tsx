import {
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { PostsFeed } from '../components/PostsFeed';
import { NewPostForm } from '../components/NewPostForm';
import { UserCard } from '../components/UserCard';
import { SubscriptionsFeed } from '../components/SubscriptionsFeed';
import {
  fetchUsers,
  fetchUserSubscriptions,
  updateUserSubscriptions,
} from '../services/api';
import type { User } from '../types/types';

export const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [subscriptions, setSubscriptions] = useState<number[]>([]);
  const [feedKey, setFeedKey] = useState(0);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (!selectedUserId) {
      setSubscriptions([]);
      return;
    }
    fetchUserSubscriptions(selectedUserId)
      .then(setSubscriptions)
      .catch(() => setSubscriptions([]));
  }, [selectedUserId]);

  const handleToggleSubscription = async (targetUserId: number) => {
    if (!selectedUserId) return;

    const isSubscribed = subscriptions.includes(targetUserId);
    const updated = isSubscribed
      ? subscriptions.filter((id) => id !== targetUserId)
      : [...subscriptions, targetUserId];

    setSubscriptions(updated);

    try {
      await updateUserSubscriptions(selectedUserId, updated);
    } catch (err) {
      console.error('Ошибка при обновлении подписок:', err);
      // Откат при ошибке
      setSubscriptions(subscriptions);
    }
  };

  const otherUsers = users.filter((u) => u.id !== selectedUserId);

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Typography variant="h3" component="h1" fontWeight="bold" color="primary.main" gutterBottom>
        Socia
      </Typography>

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

      {selectedUserId !== '' && (
        <>
          <PostsFeed userId={selectedUserId} refresh={feedKey} />

          <NewPostForm
            userId={selectedUserId}
            onSuccess={() => setFeedKey((k) => k + 1)}
          />

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Подпишитесь на других пользователей
          </Typography>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {otherUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                subscribed={subscriptions.includes(user.id)}
                onToggle={() => handleToggleSubscription(user.id)}
              />
            ))}
          </Box>

          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Посты от подписок
          </Typography>

          <SubscriptionsFeed userIds={subscriptions} />
        </>
      )}
    </Container>
  );
};