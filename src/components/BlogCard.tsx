import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatPublishDate } from "@/lib/posts";

export function FeaturedBlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-featured-card">
      <div className="blog-featured-img-wrap">
        {post.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image_url} alt={post.title} />
        ) : null}
      </div>
      <div className="blog-featured-body">
        <div className="blog-featured-label">Featured • {post.tag}</div>
        <h2 className="blog-featured-title">{post.title}</h2>
        {post.intro ? (
          <p className="blog-featured-excerpt">{post.intro}</p>
        ) : null}
        <div className="blog-featured-meta">
          <span>{formatPublishDate(post.published_at)}</span>
          <span className="blog-featured-dot" />
          <span>Read article →</span>
        </div>
      </div>
    </Link>
  );
}

export function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-card-v2">
      <div className="blog-card-v2-img">
        {post.cover_image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.cover_image_url} alt={post.title} />
        ) : null}
      </div>
      <div className="blog-card-v2-body">
        <span className="blog-card-v2-tag">{post.tag}</span>
        <h3 className="blog-card-v2-title">{post.title}</h3>
        {post.intro ? (
          <p className="blog-card-v2-excerpt">{post.intro}</p>
        ) : null}
        <div className="blog-card-v2-meta">
          {formatPublishDate(post.published_at)}
        </div>
      </div>
    </Link>
  );
}
