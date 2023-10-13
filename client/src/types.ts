export interface UserType {
	id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
}

export interface PostType {
	id: number;
	content: string;
	createAt: string;
	authorId: number;
	author: UserType;
}
