import AdminTopbar from "@/components/AdminTopbar";
import PostEditor from "@/components/PostEditor";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="admin-shell">
      <AdminTopbar />
      <div className="admin-container">
        <PostEditor />
      </div>
    </div>
  );
}
