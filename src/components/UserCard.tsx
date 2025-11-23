import { Card, CardContent, Typography, Button, Stack } from '@mui/material';
import type { User } from '../types/types';

interface Props {
  user: User;
  subscribed: boolean;
  onToggle: () => void;
}

export const UserCard = ({ user, subscribed, onToggle }: Props) => (
  <Card sx={{ minWidth: 220, mb: 2 }}>
    <CardContent>
      <Typography variant="subtitle1" fontWeight="bold">
        {user.username}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user.email}
      </Typography>
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 1 }}>
        <Button size="small" variant={subscribed ? 'outlined' : 'contained'} onClick={onToggle}>
          {subscribed ? 'Отписаться' : 'Подписаться'}
        </Button>
      </Stack>
    </CardContent>
  </Card>
);