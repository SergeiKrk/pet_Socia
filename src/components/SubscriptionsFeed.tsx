import { useEffect, useState } from 'react';
import { fetchPosts, fetchUsers } from '../services/api';
import { PostCard } from './PostCard';
import { Loader } from './Loader';
import type { Post, User } from '../types/types';
import { Typography } from '@mui/material';

interface Props {
  userIds: number[];
}

export const SubscriptionsFeed = ({ userIds }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userIds.length) {
      setPosts([]);
      setLoading(false);
      return;
    }
    Promise.all([fetchPosts(), fetchUsers()])
      .then(([p, u]) => {
        setPosts(p.filter((post) => userIds.includes(post.userId)));
        setUsers(u);
      })
      .finally(() => setLoading(false));
  }, [userIds]);

  if (loading) return <Loader />;
    if (!posts.length)
    return (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Нет постов от подписок
        </Typography>
    );

    return (
    <>
        {posts.map((p) => (
        <PostCard key={p.id} post={p} author={users.find((u) => u.id === p.userId)} />
        ))}
    </>
    );
};