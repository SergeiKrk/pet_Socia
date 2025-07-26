import type { Post,User,Comment,Album,Photo,Todo } from '../types/types';

export const fetchPosts = async (): Promise<Post[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return response.json();
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
};

export const fetchComments = async (): Promise<Comment[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/comments");
  return response.json();
};

export const fetchAlbums = async (): Promise<Album[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/albums");
  return response.json();
};

export const fetchPhotos = async (): Promise<Photo[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos");
  return response.json();
};

export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  return response.json();
};
