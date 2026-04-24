import { supabasePublic } from "./supabase";
import type { Post } from "./types";

export async function listPublishedPosts(): Promise<Post[]> {
  const { data, error } = await supabasePublic
    .from("rp_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("listPublishedPosts error:", error);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getPublishedPostBySlug(
  slug: string,
): Promise<Post | null> {
  const { data, error } = await supabasePublic
    .from("rp_posts")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error) {
    console.error("getPublishedPostBySlug error:", error);
    return null;
  }
  return (data as Post) ?? null;
}

export async function listRelatedPosts(
  tag: string,
  excludeSlug: string,
  limit = 3,
): Promise<Post[]> {
  const { data, error } = await supabasePublic
    .from("rp_posts")
    .select("*")
    .eq("status", "published")
    .eq("tag", tag)
    .neq("slug", excludeSlug)
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("listRelatedPosts error:", error);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function listRecentPostsForHomepage(limit = 3): Promise<Post[]> {
  const { data, error } = await supabasePublic
    .from("rp_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("listRecentPostsForHomepage error:", error);
    return [];
  }
  return (data ?? []) as Post[];
}

export function formatPublishDate(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
