export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  avatar?: string; 
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode?: string;
    
  };
  phone?: string;
  website?: string;
};

export type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export type Album = {
  userId: number;
  id: number;
  title: string;
}

export type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}