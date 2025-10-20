// src/services/api.ts
import type { Post, User, Comment, Album, Photo, Todo } from '../types/types';

const API = import.meta.env.DEV
  ? 'http://localhost:3001'  // локальный lowdb-stub
  : 'https://jsonplaceholder.typicode.com';  // прод-фолбек

const req = <T>(path: string): Promise<T> =>
  fetch(`${API}${path}`).then(r => r.json());

export const fetchPosts    = (): Promise<Post[]>    => req('/posts');
export const fetchUsers    = (): Promise<User[]>    => req('/users');
export const fetchComments = (): Promise<Comment[]> => req('/comments');
export const fetchAlbums   = (): Promise<Album[]>   => req('/albums');
export const fetchPhotos   = (): Promise<Photo[]>   => req('/photos');
export const fetchTodos    = (): Promise<Todo[]>    => req('/todos');

// POST-запрос для CreateUserForm
export const createUser = (body: Omit<User,'id'>): Promise<User> =>
  fetch(`${API}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  }).then(r => r.json());

export const refetchUsers = (): Promise<User[]> =>
  fetch(`${API}/users`).then(r => r.json());