export interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
  bio?: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnailUrl: string;
  views: number;
  likesCount: number;
  author: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  error: string;
}