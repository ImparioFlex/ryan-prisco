"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useTransition } from "react";
import type { Block, Post } from "@/lib/types";
import { BLOG_TAGS } from "@/lib/types";
import {
  savePostAction,
  uploadImageAction,
  type PostDraftInput,
} from "@/lib/admin-actions";
import PostPreview from "./PostPreview";

type Props = {
  post?: Post;
};

export default function PostEditor({ post }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState(post?.title ?? "");
  const [tag, setTag] = useState<string>(post?.tag ?? "");
  const [coverUrl, setCoverUrl] = useState<string | null>(
    post?.cover_image_url ?? null,
  );
  const [intro, setIntro] = useState(post?.intro ?? "");
  const [blocks, setBlocks] = useState<Block[]>(post?.blocks ?? []);
  const [coverUploading, setCoverUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastStatus, setLastStatus] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const postId = post?.id;

  async function onCoverSelected(file: File) {
    setCoverUploading(true);
    setErrorMsg(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const result = await uploadImageAction(fd);
      if (!result.ok) {
        setErrorMsg(result.error);
      } else {
        setCoverUrl(result.url);
      }
    } finally {
      setCoverUploading(false);
    }
  }

  async function onBlockImageSelected(index: number, file: File) {
    const fd = new FormData();
    fd.append("file", file);
    const result = await uploadImageAction(fd);
    if (!result.ok) {
      setErrorMsg(result.error);
      return;
    }
    setBlocks((prev) => {
      const next = [...prev];
      const current = next[index];
      if (current?.type === "image") {
        next[index] = { ...current, url: result.url };
      }
      return next;
    });
  }

  function addBlock(type: Block["type"]) {
    const base: Block =
      type === "paragraph"
        ? { type: "paragraph", text: "" }
        : type === "header"
          ? { type: "header", text: "" }
          : type === "quote"
            ? { type: "quote", text: "", attribution: "" }
            : type === "image"
              ? { type: "image", url: "", caption: "", alt: "" }
              : { type: "list", items: [""] };
    setBlocks((prev) => [...prev, base]);
  }

  function updateBlock(index: number, next: Block) {
    setBlocks((prev) => {
      const copy = [...prev];
      copy[index] = next;
      return copy;
    });
  }

  function removeBlock(index: number) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  }

  function moveBlock(index: number, direction: -1 | 1) {
    setBlocks((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  }

  function buildPayload(status: "draft" | "published"): PostDraftInput {
    return {
      id: postId,
      title,
      tag,
      cover_image_url: coverUrl,
      intro: intro.trim() || null,
      blocks,
      status,
    };
  }

  function save(status: "draft" | "published") {
    setErrorMsg(null);
    setLastStatus(null);
    if (!title.trim()) {
      setErrorMsg("Give the post a title before saving.");
      return;
    }
    if (!tag) {
      setErrorMsg("Pick a tag before saving.");
      return;
    }
    if (status === "published" && !coverUrl) {
      if (
        !window.confirm(
          "You haven't added a cover photo. Publish anyway? (You can add one later.)",
        )
      ) {
        return;
      }
    }
    startTransition(async () => {
      const result = await savePostAction(buildPayload(status));
      if (!result.ok) {
        setErrorMsg(result.error);
        return;
      }
      setLastStatus(
        status === "published"
          ? "Published! It's live on the blog now."
          : "Draft saved.",
      );
      if (!postId) {
        router.replace(`/admin/edit/${result.id}`);
      } else {
        router.refresh();
      }
    });
  }

  const isEditing = !!postId;

  return (
    <div className="editor-wrap">
      <Link href="/admin" className="editor-back">
        ← Back to all posts
      </Link>
      <h1 className="editor-title">
        {isEditing ? "Edit post" : "Write a new post"}
      </h1>
      <p className="editor-sub">
        Fill in each step below. You don&rsquo;t need to do them all at once —
        save a draft any time and come back later. Your readers see a clean
        post layout automatically.
      </p>

      {errorMsg ? (
        <div className="login-error" style={{ marginBottom: 18 }}>
          {errorMsg}
        </div>
      ) : null}

      {/* Step 1: Title */}
      <div className="field-card">
        <span className="field-step">Step 1</span>
        <label className="field-label" htmlFor="f-title">
          What&rsquo;s this post about?
        </label>
        <p className="field-help">
          The title is what shows up in big letters at the top of the post and
          on the blog list. Short, punchy, and specific works best.
        </p>
        <input
          id="f-title"
          className="field-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., What first-time buyers need to know in 2026"
        />
      </div>

      {/* Step 2: Tag */}
      <div className="field-card">
        <span className="field-step">Step 2</span>
        <label className="field-label" htmlFor="f-tag">
          Pick a topic
        </label>
        <p className="field-help">
          This helps readers find related posts. Pick the one that fits best —
          you can change it later.
        </p>
        <select
          id="f-tag"
          className="field-select"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="">Select a topic…</option>
          {BLOG_TAGS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Step 3: Cover photo */}
      <div className="field-card">
        <span className="field-step">Step 3</span>
        <label className="field-label">Add a cover photo</label>
        <p className="field-help">
          A good photo makes people click. Something clean and relevant — a
          home, a skyline, a handshake, your office. Aim for a wide rectangle
          (landscape orientation).
        </p>
        {coverUrl ? (
          <div className="cover-preview">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverUrl} alt="Cover preview" />
            <label className="cover-replace-btn">
              Replace
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onCoverSelected(f);
                }}
              />
            </label>
          </div>
        ) : (
          <label className="cover-upload">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onCoverSelected(f);
              }}
            />
            <div className="cover-upload-icon">↑</div>
            <div className="cover-upload-text">
              {coverUploading ? "Uploading…" : "Click to upload a photo"}
            </div>
            <div className="cover-upload-hint">
              JPG, PNG, or WebP. Up to 5MB.
            </div>
          </label>
        )}
      </div>

      {/* Step 4: Intro */}
      <div className="field-card">
        <span className="field-step">Step 4</span>
        <label className="field-label" htmlFor="f-intro">
          Start with a hook
        </label>
        <p className="field-help">
          Two or three sentences that pull the reader in. This shows up in
          large, bold type right after the title. Keep it human.
        </p>
        <textarea
          id="f-intro"
          className="field-textarea"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          placeholder="e.g., Most people think a reverse mortgage is a last resort. For the right homeowner, it's actually one of the smartest tools in retirement planning. Here's the honest breakdown."
        />
      </div>

      {/* Step 5: Body blocks */}
      <div className="field-card">
        <span className="field-step">Step 5</span>
        <label className="field-label">Build the body of the post</label>
        <p className="field-help">
          Add blocks one at a time. Break up long text with headers or a
          quote. Use pictures to give readers a visual break. Rearrange or
          delete anything using the arrows and × buttons.
        </p>

        {blocks.length > 0 ? (
          <div className="blocks-list">
            {blocks.map((block, i) => (
              <BlockEditor
                key={i}
                block={block}
                index={i}
                total={blocks.length}
                onChange={(next) => updateBlock(i, next)}
                onRemove={() => removeBlock(i)}
                onMove={(dir) => moveBlock(i, dir)}
                onImagePicked={(file) => onBlockImageSelected(i, file)}
              />
            ))}
          </div>
        ) : (
          <p
            style={{
              color: "var(--text-light)",
              fontSize: 14,
              fontStyle: "italic",
              marginBottom: 14,
            }}
          >
            No blocks yet — start with a paragraph below.
          </p>
        )}

        <div className="add-block-row">
          <p className="add-block-heading">+ Add a block</p>
          <div className="add-block-buttons">
            <button
              type="button"
              className="add-block-pill"
              onClick={() => addBlock("paragraph")}
            >
              Paragraph
            </button>
            <button
              type="button"
              className="add-block-pill"
              onClick={() => addBlock("header")}
            >
              Section header
            </button>
            <button
              type="button"
              className="add-block-pill"
              onClick={() => addBlock("quote")}
            >
              Pull quote
            </button>
            <button
              type="button"
              className="add-block-pill"
              onClick={() => addBlock("image")}
            >
              Image
            </button>
            <button
              type="button"
              className="add-block-pill"
              onClick={() => addBlock("list")}
            >
              Bullet list
            </button>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <div className="editor-footer">
        <div className="editor-footer-inner">
          <div className="editor-footer-status">
            {lastStatus ? lastStatus : post
              ? post.status === "published"
                ? "Currently published."
                : "Currently a draft."
              : "New post — not saved yet."}
          </div>
          <div className="editor-footer-actions">
            <button
              type="button"
              className="admin-secondary-btn"
              onClick={() => setShowPreview(true)}
              disabled={coverUploading}
            >
              Preview
            </button>
            <button
              type="button"
              className="admin-secondary-btn"
              onClick={() => save("draft")}
              disabled={isPending || coverUploading}
            >
              {isPending ? "Saving…" : "Save draft"}
            </button>
            <button
              type="button"
              className="admin-primary-btn"
              onClick={() => save("published")}
              disabled={isPending || coverUploading}
            >
              {isPending ? "Publishing…" : post?.status === "published" ? "Update post" : "Publish"}
            </button>
          </div>
        </div>
      </div>

      {showPreview ? (
        <PostPreview
          title={title}
          tag={tag}
          coverUrl={coverUrl}
          intro={intro}
          blocks={blocks}
          onClose={() => setShowPreview(false)}
        />
      ) : null}
    </div>
  );
}

function BlockEditor({
  block,
  index,
  total,
  onChange,
  onRemove,
  onMove,
  onImagePicked,
}: {
  block: Block;
  index: number;
  total: number;
  onChange: (next: Block) => void;
  onRemove: () => void;
  onMove: (direction: -1 | 1) => void;
  onImagePicked: (file: File) => void;
}) {
  const label =
    block.type === "paragraph"
      ? "Paragraph"
      : block.type === "header"
        ? "Section header"
        : block.type === "quote"
          ? "Pull quote"
          : block.type === "image"
            ? "Image"
            : "Bullet list";

  const labelClass =
    block.type === "quote"
      ? "block-type-label is-quote"
      : block.type === "header"
        ? "block-type-label is-header"
        : "block-type-label";

  return (
    <div className="block-card">
      <div className="block-card-head">
        <span className={labelClass}>{label}</span>
        <div className="block-actions">
          <button
            type="button"
            className="block-icon-btn"
            onClick={() => onMove(-1)}
            disabled={index === 0}
            aria-label="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            className="block-icon-btn"
            onClick={() => onMove(1)}
            disabled={index === total - 1}
            aria-label="Move down"
          >
            ↓
          </button>
          <button
            type="button"
            className="block-icon-btn is-delete"
            onClick={onRemove}
            aria-label="Delete block"
          >
            ×
          </button>
        </div>
      </div>

      {block.type === "paragraph" && (
        <textarea
          className="field-textarea"
          value={block.text}
          onChange={(e) =>
            onChange({ ...block, text: e.target.value })
          }
          placeholder="Write the paragraph here. Keep it conversational — like you're explaining it to a client over coffee."
        />
      )}

      {block.type === "header" && (
        <input
          className="field-input"
          value={block.text}
          onChange={(e) =>
            onChange({ ...block, text: e.target.value })
          }
          placeholder="Section title (e.g., How It Actually Works)"
        />
      )}

      {block.type === "quote" && (
        <>
          <textarea
            className="field-textarea"
            value={block.text}
            onChange={(e) =>
              onChange({ ...block, text: e.target.value })
            }
            placeholder="A line worth pulling out — something memorable or punchy. This will appear in a shadowed box to catch the reader's eye."
          />
          <input
            className="field-input"
            style={{ marginTop: 10 }}
            value={block.attribution ?? ""}
            onChange={(e) =>
              onChange({ ...block, attribution: e.target.value })
            }
            placeholder="Attribution (optional) — e.g., a client, or 'industry saying'"
          />
        </>
      )}

      {block.type === "image" && (
        <>
          {block.url ? (
            <div className="cover-preview" style={{ marginBottom: 10 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={block.url} alt={block.alt ?? ""} />
              <label className="cover-replace-btn">
                Replace
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) onImagePicked(f);
                  }}
                />
              </label>
            </div>
          ) : (
            <label className="cover-upload">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) onImagePicked(f);
                }}
              />
              <div className="cover-upload-icon">↑</div>
              <div className="cover-upload-text">Click to upload a photo</div>
              <div className="cover-upload-hint">JPG, PNG, or WebP</div>
            </label>
          )}
          <input
            className="field-input"
            style={{ marginTop: 10 }}
            value={block.caption ?? ""}
            onChange={(e) =>
              onChange({ ...block, caption: e.target.value })
            }
            placeholder="Caption (optional) — e.g., 'Closing day for the Johnson family.'"
          />
          <input
            className="field-input"
            style={{ marginTop: 10 }}
            value={block.alt ?? ""}
            onChange={(e) => onChange({ ...block, alt: e.target.value })}
            placeholder="Alt text for accessibility (describe the image briefly)"
          />
        </>
      )}

      {block.type === "list" && (
        <>
          {block.items.map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", gap: 8, marginBottom: 8 }}
            >
              <input
                className="field-input"
                style={{ flex: 1 }}
                value={item}
                onChange={(e) => {
                  const items = [...block.items];
                  items[i] = e.target.value;
                  onChange({ ...block, items });
                }}
                placeholder={`Bullet point ${i + 1}`}
              />
              <button
                type="button"
                className="block-icon-btn is-delete"
                onClick={() => {
                  const items = block.items.filter((_, j) => j !== i);
                  onChange({
                    ...block,
                    items: items.length > 0 ? items : [""],
                  });
                }}
                aria-label="Remove bullet"
              >
                ×
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-block-pill"
            onClick={() =>
              onChange({ ...block, items: [...block.items, ""] })
            }
          >
            + Add bullet
          </button>
        </>
      )}
    </div>
  );
}
