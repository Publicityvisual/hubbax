// Componentes principales de HubbaX App
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: Date;
}

export interface AppState {
  isLoggedIn: boolean;
  currentUser: User | null;
  posts: Post[];
  notifications: number;
}