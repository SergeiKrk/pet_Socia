import { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface Props {
  userId: number;
  onSuccess: () => void;
}

export const NewPostForm = ({ userId, onSuccess }: Props) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;

    setLoading(true);
    fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, userId }),
    })
      .then((r) => r.json())
      .then(() => {
        setTitle('');
        setBody('');
        onSuccess(); // обновить ленту
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>Новый пост</Typography>
      <TextField
        fullWidth
        label="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Текст"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" disabled={loading}>
        {loading ? 'Создаём…' : 'Опубликовать'}
      </Button>
    </Box>
  );
};