import type { Metadata } from "next";
import "./blog.css";

export const metadata: Metadata = {
  title: "Blog | Ryan Prisco",
  description:
    "Insights, market updates, and lending perspective from Ryan Prisco.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="blog-wrap">{children}</div>;
}
