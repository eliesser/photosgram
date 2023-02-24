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
  user?: User;
  created?: string;
}

export interface User {
  avatar?: string;
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
}
