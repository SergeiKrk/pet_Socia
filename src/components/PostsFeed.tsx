import { useEffect, useState } from 'react';
import { fetchPosts, fetchUsers } from '../services/api';
import { PostCard } from './PostCard';
import { Loader } from './Loader';
import { Typography } from '@mui/material';
import type { Post, User } from '../types/types';

interface Props {
  userId: number;
  refresh?: number; // при изменении перезагружаем
}

export const PostsFeed = ({ userId, refresh = 0 }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () =>
    Promise.all([fetchPosts(), fetchUsers()])
      .then(([p, u]) => {
        setPosts(p.filter((post) => post.userId === userId));
        setUsers(u);
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, [userId, refresh]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : posts.length ? (
        posts.map((p) => (
          <PostCard key={p.id} post={p} author={users.find((u) => u.id === p.userId)} />
        ))
      ) : (
        <Typography color="text.secondary">У этого пользователя пока нет постов</Typography>
      )}
    </>
  );
};