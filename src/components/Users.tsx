// components/Users.tsx
import { useState, useEffect } from 'react';
import { refetchUsers } from '../services/api';
import type { User } from '../types/types';
import { Button, Box } from '@mui/material';

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const load = () => refetchUsers().then(setUsers);
  useEffect(() => { load(); }, []);

  return (
    <Box p={2}>
      <Button variant="outlined" onClick={load} sx={{ mb: 2 }}>
        Обновить
      </Button>

      {users.map((u) => (
        <Box key={u.id} mb={2} p={2} border="1px solid #ddd" borderRadius={2}>
          <h3>{u.username}</h3>
          <p>{u.email}</p>
          <p>{u.address?.city}</p>
          <p>{u.address?.street}</p>
          <p>{u.address?.suite}</p>
          <p>{u.address?.zipcode}</p>
          <p>{u.address?.geo?.lat}</p>
          <p>{u.address?.geo?.lng}</p>
          <p>{u.phone}</p>
          <p>{u.website}</p>
          <p>{u.company?.name}</p>
          <p>{u.company?.catchPhrase}</p>
          <p>{u.company?.bc}</p>
        </Box>
      ))}
    </Box>
  );
};