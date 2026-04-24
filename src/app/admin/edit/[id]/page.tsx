import { notFound } from "next/navigation";
import AdminTopbar from "@/components/AdminTopbar";
import PostEditor from "@/components/PostEditor";
import { getAdminPostById } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  const post = await getAdminPostById(id);
  if (!post) notFound();

  return (
    <div className="admin-shell">
      <AdminTopbar />
      <div className="admin-container">
        <PostEditor post={post} />
      </div>
    </div>
  );
}
