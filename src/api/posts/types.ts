export interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
