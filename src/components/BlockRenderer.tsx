import type { Block } from "@/lib/types";

export default function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i}>
                {block.text.split(/\n\n+/).map((chunk, j) => (
                  <span key={j} style={{ display: "block" }}>
                    {chunk}
                  </span>
                ))}
              </p>
            );
          case "header":
            return <h2 key={i}>{block.text}</h2>;
          case "quote":
            return (
              <blockquote key={i}>
                {block.text}
                {block.attribution ? <cite>— {block.attribution}</cite> : null}
              </blockquote>
            );
          case "image":
            return (
              <figure key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={block.url} alt={block.alt ?? ""} />
                {block.caption ? <figcaption>{block.caption}</figcaption> : null}
              </figure>
            );
          case "list":
            return (
              <ul key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
