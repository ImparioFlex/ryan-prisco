export type BlockType = "paragraph" | "header" | "quote" | "image" | "list";

export type ParagraphBlock = {
  type: "paragraph";
  text: string;
};

export type HeaderBlock = {
  type: "header";
  text: string;
};

export type QuoteBlock = {
  type: "quote";
  text: string;
  attribution?: string;
};

export type ImageBlock = {
  type: "image";
  url: string;
  caption?: string;
  alt?: string;
};

export type ListBlock = {
  type: "list";
  items: string[];
};

export type Block =
  | ParagraphBlock
  | HeaderBlock
  | QuoteBlock
  | ImageBlock
  | ListBlock;

export type PostStatus = "draft" | "published";

export type Post = {
  id: string;
  slug: string;
  title: string;
  tag: string;
  cover_image_url: string | null;
  intro: string | null;
  blocks: Block[];
  status: PostStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export const BLOG_TAGS = [
  "First-Time Buyers",
  "Reverse Mortgages",
  "Commercial",
  "Market Update",
  "Refinance",
  "Investment Property",
  "General",
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];
