// components/PostsFeed.tsx
import { useEffect, useState } from 'react';
import { fetchPosts, fetchUsers } from '../services/api';
import { PostCard } from './PostCard';
import { Loader } from './Loader';
import type { Post, User } from '../types/types';

export const PostsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchPosts(), fetchUsers()])
      .then(([p, u]) => {
        setPosts(p);
        setUsers(u);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? <Loader /> : posts.map(p => (
        <PostCard
          key={p.id}
          post={p}
          author={users.find(u => u.id === p.userId)}
        />
      ))}
    </>
  );
};