import Link from "next/link";

export default function BlogTopbar() {
  return (
    <header className="blog-topbar">
      <div className="blog-topbar-inner">
        <Link href="/" className="blog-topbar-brand">
          RYAN <span>PRISCO</span>
        </Link>
        <nav className="blog-topbar-nav">
          <Link href="/">Home</Link>
          <Link href="/commercial">Commercial</Link>
          <Link href="/blog">Blog</Link>
          <a
            href="https://calendar.app.google/shsVHcdEQSWvL1qw8"
            target="_blank"
            rel="noopener"
            className="cta"
          >
            Book a Call
          </a>
        </nav>
      </div>
    </header>
  );
}
