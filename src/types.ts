// Interfaces kept separate so any file can import them (in this case only one type) without dragging along executable code.

export interface Post {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO 8601
  readTime: number;
  image: string;
  body: string;
  tags: string[];
}
