// components/PostCard.tsx
import { Card, CardContent, Typography, CardHeader, Avatar, Box } from '@mui/material';
import type { Post, User } from '../types/types';

type Props = { post: Post; author?: User };
export const PostCard = ({ post, author }: Props) => (
  <Card sx={{ mb: 2, borderRadius: 3 }}>
    <CardHeader
      avatar={<Avatar src={`https://i.pravatar.cc/40?u=${author?.id}`} />}
      title={author?.name || '—'}
      subheader={author?.email}
    />
    <CardContent>
      <Typography variant="h6" gutterBottom>
        {post.title}
      </Typography>
      <Typography color="text.secondary">{post.body}</Typography>
    </CardContent>
  </Card>
);