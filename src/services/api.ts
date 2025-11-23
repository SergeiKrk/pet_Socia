// src/services/api.ts
import type { Post, User, Comment, Album, Photo, Todo } from '../types/types';

const API = 'http://localhost:3001';

const req = <T>(path: string): Promise<T> =>
  fetch(`${API}${path}`).then((r) => r.json());

export const fetchPosts = (): Promise<Post[]> => req('/posts');
export const fetchUsers = (): Promise<User[]> => req('/users');
export const fetchComments = (): Promise<Comment[]> => req('/comments');
export const fetchAlbums = (): Promise<Album[]> => req('/albums');
export const fetchPhotos = (): Promise<Photo[]> => req('/photos');
export const fetchTodos = (): Promise<Todo[]> => req('/todos');

// Подписки
export const fetchUserSubscriptions = (userId: number): Promise<number[]> =>
  fetch(`${API}/users/${userId}/subscriptions`)
    .then((r) => r.json())
    .then((data) => data.subscriptions || []);

export const updateUserSubscriptions = (
  userId: number,
  subscriptions: number[]
): Promise<void> =>
  fetch(`${API}/users/${userId}/subscriptions`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subscriptions }),
  }).then((r) => {
    if (!r.ok) throw new Error('Ошибка при обновлении подписок');
  });

// Создание пользователя
export const createUser = (body: Omit<User, 'id'>): Promise<User> =>
  fetch(`${API}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then((r) => r.json());

export const refetchUsers = (): Promise<User[]> =>
  fetch(`${API}/users`).then((r) => r.json());