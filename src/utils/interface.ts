export interface Post {
    id: number;
    title: string;
    content: string;
    image?:string;
    like_count: number;
    repost_count: number;
}
