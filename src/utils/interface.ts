export interface Post {
    id: number;
    title: string;
    content: string;
    image?:string;
    like_count: number;
    repost_count: number;
}


export interface User {
    id: string;
    name: string;
    email: string;
  }
