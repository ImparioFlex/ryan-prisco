import Link from "next/link";
import AdminTopbar from "@/components/AdminTopbar";
import ConfirmDeleteButton from "@/components/ConfirmDeleteButton";
import { listAdminPosts, deletePostAction } from "@/lib/admin-actions";
import { formatPublishDate } from "@/lib/posts";

export const dynamic = "force-dynamic";

async function deleteAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await deletePostAction(id);
}

export default async function AdminDashboard() {
  const posts = await listAdminPosts();
  const draftCount = posts.filter((p) => p.status === "draft").length;
  const publishedCount = posts.filter((p) => p.status === "published").length;

  return (
    <div className="admin-shell">
      <AdminTopbar />

      <div className="admin-container">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-heading">Your blog posts</h1>
            <p className="dashboard-sub">
              {publishedCount} published · {draftCount} draft
              {draftCount === 1 ? "" : "s"}
            </p>
          </div>
          <Link href="/admin/new" className="admin-primary-btn">
            + New Post
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="posts-table">
            <div className="posts-empty">
              <h3>No posts yet.</h3>
              <p>
                Tap <strong>+ New Post</strong> to write your first one. The
                walkthrough guides you step-by-step.
              </p>
            </div>
          </div>
        ) : (
          <div className="posts-table">
            <div className="posts-table-head posts-table-row">
              <div>Title</div>
              <div>Tag</div>
              <div>Status</div>
              <div>Published</div>
              <div style={{ textAlign: "right" }}>Actions</div>
            </div>
            {posts.map((post) => (
              <div key={post.id} className="posts-table-row">
                <div>
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="posts-table-title"
                  >
                    {post.title || "(Untitled)"}
                  </Link>
                  {post.status === "published" ? (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener"
                      style={{
                        fontSize: 12,
                        color: "var(--teal)",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      View live ↗
                    </Link>
                  ) : null}
                </div>
                <div className="posts-table-tag">{post.tag}</div>
                <div>
                  <span className={`status-pill status-${post.status}`}>
                    {post.status}
                  </span>
                </div>
                <div className="posts-table-tag">
                  {post.published_at
                    ? formatPublishDate(post.published_at)
                    : "—"}
                </div>
                <div className="posts-table-actions">
                  <Link
                    href={`/admin/edit/${post.id}`}
                    className="admin-secondary-btn"
                  >
                    Edit
                  </Link>
                  <form action={deleteAction} style={{ display: "inline" }}>
                    <input type="hidden" name="id" value={post.id} />
                    <ConfirmDeleteButton />
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
