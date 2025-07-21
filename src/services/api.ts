import type { Post } from '../types/types';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
};