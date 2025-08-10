import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";
import { Card, CardContent, Typography, Skeleton, Stack } from "@mui/material";
import type { Post } from "../types/types";

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts()
      .then((data) => setPosts(data))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <Stack spacing={2}>
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} variant="rectangular" height={120} />
        ))}
      </Stack>
    );
  }

  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <Card key={post.id} sx={{ borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {post.title}
            </Typography>
            <Typography color="text.secondary">{post.body}</Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};