"use client";

import type { Block } from "@/lib/types";
import BlockRenderer from "./BlockRenderer";
import AuthorCard from "./AuthorCard";

type Props = {
  title: string;
  tag: string;
  coverUrl: string | null;
  intro: string;
  blocks: Block[];
  onClose: () => void;
};

export default function PostPreview({
  title,
  tag,
  coverUrl,
  intro,
  blocks,
  onClose,
}: Props) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="preview-overlay" role="dialog" aria-modal="true">
      <div className="preview-topbar">
        <div className="preview-topbar-label">PREVIEW — NOT PUBLISHED</div>
        <button
          type="button"
          onClick={onClose}
          className="preview-close-btn"
          aria-label="Close preview"
        >
          × Close preview
        </button>
      </div>
      <div className="preview-scroll">
        <article className="post-article">
          <span className="post-tag-chip">{tag || "Draft"}</span>
          <h1 className="post-title">{title || "(Untitled post)"}</h1>

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
              <div>{today}</div>
            </div>
          </div>

          {coverUrl ? (
            <div className="post-cover">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={coverUrl} alt={title || "Cover"} />
            </div>
          ) : null}

          {intro ? <p className="post-intro">{intro}</p> : null}

          <div className="post-body">
            {blocks.length > 0 ? (
              <BlockRenderer blocks={blocks} />
            ) : (
              <p
                style={{
                  color: "var(--text-light)",
                  fontStyle: "italic",
                  opacity: 0.7,
                }}
              >
                (Add content blocks to see the body of the post here.)
              </p>
            )}
          </div>
        </article>

        <AuthorCard />
      </div>
    </div>
  );
}
