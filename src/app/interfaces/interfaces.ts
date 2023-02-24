export interface ResponsePosts {
  ok: boolean;
  pag: number;
  posts: Post[];
}

export interface Post {
  imgs?: string[];
  _id?: string;
  msg?: string;
  coords?: string;
  created?: string;
  user: User;
}

export interface User {
  _id: string;
  avatar?: string;
  name?: string;
  email?: string;
  password?: string;
}
