import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogTopbar from "@/components/BlogTopbar";
import { BlogCard } from "@/components/BlogCard";
import BlockRenderer from "@/components/BlockRenderer";
import AuthorCard from "@/components/AuthorCard";
import {
  formatPublishDate,
  getPublishedPostBySlug,
  listRelatedPosts,
} from "@/lib/posts";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} | Ryan Prisco`,
    description: post.intro ?? undefined,
    openGraph: {
      title: post.title,
      description: post.intro ?? undefined,
      images: post.cover_image_url ? [post.cover_image_url] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const related = await listRelatedPosts(post.tag, post.slug, 3);

  return (
    <>
      <BlogTopbar />

      <article className="post-article">
        <Link href="/blog" className="post-back">
          ← Back to Blog
        </Link>

        <span className="post-tag-chip">{post.tag}</span>

        <h1 className="post-title">{post.title}</h1>

        <div className="post-byline">
          <div className="post-byline-avatar">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ryan-about.png" alt="Ryan Prisco" />
          </div>
          <div>
            <div className="post-byline-name">Ryan Prisco</div>
            <div className="post-byline-role">
              Mortgage &amp; Lending Expert · NMLS #987736
            </div>
            <div>{formatPublishDate(post.published_at)}</div>
          </div>
        </div>

        {post.cover_image_url ? (
          <div className="post-cover">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.cover_image_url} alt={post.title} />
          </div>
        ) : null}

        {post.intro ? <p className="post-intro">{post.intro}</p> : null}

        <div className="post-body">
          <BlockRenderer blocks={post.blocks ?? []} />
        </div>
      </article>

      <AuthorCard />


      {related.length > 0 ? (
        <section className="related-section">
          <h2 className="related-heading">More {post.tag}</h2>
          <div className="blog-grid-v2">
            {related.map((p) => (
              <BlogCard key={p.id} post={p} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
