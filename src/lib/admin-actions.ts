"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { randomUUID } from "crypto";
import { isAuthenticated, endSession } from "@/lib/auth";
import { supabaseAdmin, RP_BUCKET } from "@/lib/supabase-admin";
import type { Block, Post, PostStatus } from "@/lib/types";

async function ensureAuth() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login");
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

async function uniqueSlug(base: string, excludeId?: string): Promise<string> {
  let slug = base || `post-${Date.now()}`;
  let attempt = 0;
  while (true) {
    const tryingSlug = attempt === 0 ? slug : `${slug}-${attempt}`;
    const query = supabaseAdmin
      .from("rp_posts")
      .select("id")
      .eq("slug", tryingSlug)
      .limit(1);
    if (excludeId) query.neq("id", excludeId);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) return tryingSlug;
    attempt += 1;
    if (attempt > 25) {
      return `${slug}-${Date.now()}`;
    }
  }
}

export type PostDraftInput = {
  id?: string;
  title: string;
  tag: string;
  cover_image_url: string | null;
  intro: string | null;
  blocks: Block[];
  status: PostStatus;
};

export async function savePostAction(
  input: PostDraftInput,
): Promise<{ ok: true; id: string; slug: string } | { ok: false; error: string }> {
  await ensureAuth();

  const title = input.title.trim();
  if (!title) return { ok: false, error: "Title is required." };
  if (!input.tag) return { ok: false, error: "Tag is required." };

  const slug = await uniqueSlug(slugify(title), input.id);
  const now = new Date().toISOString();
  const published_at =
    input.status === "published" ? now : null;

  if (input.id) {
    const updatePayload: Record<string, unknown> = {
      title,
      slug,
      tag: input.tag,
      cover_image_url: input.cover_image_url,
      intro: input.intro,
      blocks: input.blocks,
      status: input.status,
    };
    // Only set published_at when transitioning to published from draft
    if (input.status === "published") {
      const { data: existing } = await supabaseAdmin
        .from("rp_posts")
        .select("published_at,status")
        .eq("id", input.id)
        .maybeSingle();
      if (!existing?.published_at) {
        updatePayload.published_at = published_at;
      }
    }
    const { error } = await supabaseAdmin
      .from("rp_posts")
      .update(updatePayload)
      .eq("id", input.id);
    if (error) return { ok: false, error: error.message };
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    return { ok: true, id: input.id, slug };
  }

  const { data, error } = await supabaseAdmin
    .from("rp_posts")
    .insert({
      title,
      slug,
      tag: input.tag,
      cover_image_url: input.cover_image_url,
      intro: input.intro,
      blocks: input.blocks,
      status: input.status,
      published_at,
    })
    .select("id,slug")
    .single();
  if (error || !data) {
    return { ok: false, error: error?.message ?? "Failed to create post." };
  }
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  return { ok: true, id: data.id, slug: data.slug };
}

export async function deletePostAction(id: string): Promise<void> {
  await ensureAuth();
  const { data: existing } = await supabaseAdmin
    .from("rp_posts")
    .select("slug")
    .eq("id", id)
    .maybeSingle();
  const { error } = await supabaseAdmin.from("rp_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin");
  revalidatePath("/blog");
  if (existing?.slug) revalidatePath(`/blog/${existing.slug}`);
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  await endSession();
  redirect("/admin/login");
}

export async function uploadImageAction(
  formData: FormData,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await ensureAuth();
  const file = formData.get("file");
  if (!(file instanceof File)) {
    return { ok: false, error: "No file provided." };
  }
  if (file.size > 5 * 1024 * 1024) {
    return { ok: false, error: "Image must be under 5MB." };
  }
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const path = `posts/${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  const { error } = await supabaseAdmin.storage
    .from(RP_BUCKET)
    .upload(path, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: false,
    });
  if (error) return { ok: false, error: error.message };
  const { data } = supabaseAdmin.storage.from(RP_BUCKET).getPublicUrl(path);
  return { ok: true, url: data.publicUrl };
}

export async function listAdminPosts(): Promise<Post[]> {
  await ensureAuth();
  const { data, error } = await supabaseAdmin
    .from("rp_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listAdminPosts error:", error);
    return [];
  }
  return (data ?? []) as Post[];
}

export async function getAdminPostById(id: string): Promise<Post | null> {
  await ensureAuth();
  const { data, error } = await supabaseAdmin
    .from("rp_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getAdminPostById error:", error);
    return null;
  }
  return (data as Post) ?? null;
}
