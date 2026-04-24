import Link from "next/link";

export default function AuthorCard() {
  return (
    <section className="author-card">
      <div className="author-card-avatar">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/ryan-about.png" alt="Ryan Prisco" />
      </div>
      <div className="author-card-body">
        <p className="author-card-kicker">Written by</p>
        <h3 className="author-card-name">Ryan Prisco</h3>
        <p className="author-card-role">
          Mortgage &amp; Lending Expert · NMLS #987736
        </p>
        <p className="author-card-bio">
          26 years and 1,645 loans funded across residential and commercial
          lending. Key member of The Katalyst Team and founder of RP Commercial
          Capital. Straight answers, smart structures, real relationships.
        </p>
        <div className="author-card-actions">
          <a
            href="https://calendar.app.google/shsVHcdEQSWvL1qw8"
            target="_blank"
            rel="noopener"
            className="author-card-btn primary"
          >
            Book a Call with Ryan
          </a>
          <Link href="/#about" className="author-card-btn secondary">
            More about Ryan →
          </Link>
        </div>
      </div>
    </section>
  );
}
