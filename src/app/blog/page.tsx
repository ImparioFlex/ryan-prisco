import BlogTopbar from "@/components/BlogTopbar";
import { BlogCard, FeaturedBlogCard } from "@/components/BlogCard";
import { listPublishedPosts } from "@/lib/posts";

export const revalidate = 60;

export default async function BlogIndexPage() {
  const posts = await listPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <BlogTopbar />

      <section className="blog-hero">
        <p className="blog-hero-eyebrow">Insights</p>
        <h1 className="blog-hero-title">Straight talk on lending.</h1>
        <p className="blog-hero-sub">
          Market reads, buyer perspectives, reverse mortgage context, and a
          quarter-century of lessons from the closing table. Honest lending, in
          plain English.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="blog-empty">
          <h2>New posts coming soon.</h2>
          <p>
            Ryan is putting together insights on the current market,
            reverse-mortgage realities, and deal-structure commentary. Check back
            shortly.
          </p>
        </div>
      ) : (
        <>
          {featured ? (
            <section className="blog-featured">
              <FeaturedBlogCard post={featured} />
            </section>
          ) : null}

          {rest.length > 0 ? (
            <section className="blog-list">
              <h2 className="blog-list-heading">More Reading</h2>
              <p className="blog-list-sub">
                Tips, analysis, and lending perspective — freshest on top.
              </p>
              <div className="blog-grid-v2">
                {rest.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          ) : null}
        </>
      )}
    </>
  );
}
