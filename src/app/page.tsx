import Link from "next/link";
import HomeScripts from "./HomeScripts";
import { listRecentPostsForHomepage, formatPublishDate } from "@/lib/posts";

export const revalidate = 60;

const CHECK_ICON = (
  <svg viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default async function HomePage() {
  const recentPosts = await listRecentPostsForHomepage(3);

  return (
    <>
      {/* Animated background blobs */}
      <div className="bg-animation">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      {/* NAVIGATION */}
      <nav className="nav" id="nav">
        <div className="container nav-inner">
          <a href="#" className="nav-brand">
            RYAN <span>PRISCO</span>
          </a>
          <button className="nav-toggle" id="navToggle" aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
          <ul className="nav-links" id="navLinks">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a
                href="https://ryanprisco.thekatalystteam.com"
                target="_blank"
                rel="noopener"
              >
                Residential Lending
              </a>
            </li>
            <li>
              <Link href="/commercial">Commercial Lending</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
            <li>
              <a
                href="https://calendar.app.google/shsVHcdEQSWvL1qw8"
                target="_blank"
                rel="noopener"
                className="nav-cta"
              >
                Book a Call
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-content">
            <p className="hero-eyebrow">
              Residential and Commercial Mortgage Expert
            </p>
            <h1 className="hero-name">
              Ryan
              <br />
              Prisco
            </h1>
            <p className="hero-tagline">
              Regardless of whether the mortgage is residential or commercial, you
              will receive expert advice and a direct answer every time.
            </p>
            <div className="hero-buttons">
              <a
                href="https://calendar.app.google/shsVHcdEQSWvL1qw8"
                target="_blank"
                rel="noopener"
                className="btn btn-primary"
              >
                Book a Consultation
              </a>
              <a href="#services" className="btn btn-outline">
                Explore Services →
              </a>
            </div>
          </div>
          <div className="hero-image">
            <img
              src="/images/ryan-hero.png"
              alt="Ryan Prisco"
              // eslint-disable-next-line @next/next/no-img-element
              fetchPriority="high"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* PHOTO BREAK 1 */}
      <div className="photo-break" data-parallax>
        <div
          className="photo-break-bg"
          style={{ backgroundImage: "url('/images/photo-break.jpg')" }}
        />
        <div className="photo-break-overlay">
          <div className="photo-break-text">
            <h3>Residential Lending & Commercial Lending</h3>
            <p>One expert. Both sides of the table.</p>
          </div>
        </div>
      </div>

      {/* ABOUT */}
      <section className="about section" id="about">
        <div className="container about-grid">
          <div className="about-image reveal">
            <img src="/images/ryan-about.png" alt="Ryan Prisco" loading="lazy" decoding="async" />
          </div>
          <div className="about-text reveal" style={{ transitionDelay: "0.12s" }}>
            <p className="section-label">About</p>
            <h2 className="section-title">Meet Ryan Prisco</h2>
            <p>
              Ryan Prisco is a seasoned mortgage professional with deep expertise
              across residential lending, commercial lending, and reverse
              mortgages. As a key member of <strong>The Katalyst Team</strong> and
              founder of <strong>RP Commercial Capital</strong>, Ryan brings a
              comprehensive approach to every client relationship.
            </p>
            <p>
              Whether you&rsquo;re a first-time buyer, a seasoned investor, a
              business owner, or a homeowner looking to unlock your home&rsquo;s
              equity through a reverse mortgage, Ryan&rsquo;s goal is simple:
              find the right solution for your unique financial picture and make
              the process as smooth as possible.
            </p>
            <div className="about-stats">
              <div className="about-stat">
                <span className="number">26</span>
                <span className="label">Years Experience</span>
              </div>
              <div className="about-stat">
                <span className="number">1,645</span>
                <span className="label">Loans Funded</span>
              </div>
              <div className="about-stat">
                <span className="number">3</span>
                <span className="label">Lending Verticals</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services section" id="services">
        <div className="container">
          <div className="services-header reveal">
            <p className="section-label">Two Paths. One Expert.</p>
            <h2 className="section-title">How Can I Help You?</h2>
            <p className="section-subtitle">
              Whether you&rsquo;re buying a home or building a portfolio —
              here&rsquo;s where you start.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal" style={{ transitionDelay: "0.05s" }}>
              <div className="service-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#6c9ea8"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3>Residential Lending</h3>
              <p>
                Conventional, FHA, VA, USDA, and jumbo loans — from pre-approval
                to closing. As a member of The Katalyst Team, I have access to a
                wide range of programs to fit your situation.
              </p>
              <a
                href="https://ryanprisco.thekatalystteam.com"
                target="_blank"
                className="service-link"
                style={{ marginBottom: "10px", display: "inline-flex" }}
              >
                The Katalyst Team →
              </a>
              <br />
              <a
                href="#reverse"
                className="service-link"
                style={{ color: "var(--navy)", fontSize: "13px" }}
              >
                HECM Reverse Mortgages ↓
              </a>
            </div>

            <div className="service-card reveal" style={{ transitionDelay: "0.15s" }}>
              <div className="service-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#7ab532"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-4 0v2" />
                  <path d="M8 7V5a2 2 0 0 0-4 0v2" />
                  <line x1="12" y1="12" x2="12" y2="17" />
                  <line x1="9.5" y1="14.5" x2="14.5" y2="14.5" />
                </svg>
              </div>
              <h3>Commercial Lending</h3>
              <p>
                Investment properties, multi-family, mixed-use, and business
                financing through RP Commercial Capital. Whether you&rsquo;re
                acquiring, refinancing, or scaling — let&rsquo;s build the right
                deal structure.
              </p>
              <Link href="/commercial" className="service-link">
                RP Commercial Capital →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* REVERSE MORTGAGE */}
      <section className="reverse section" id="reverse">
        <div className="container">
          <div className="reverse-grid">
            <div className="reverse-content reveal">
              <p className="section-label">For Homeowners 62+</p>
              <h2 className="section-title">
                Reverse Mortgages,
                <br />
                Done Right
              </h2>
              <p>
                Most people have heard the horror stories. Very few have had it
                explained by someone who actually specializes in it. A reverse
                mortgage isn&rsquo;t right for everyone — but for the right
                homeowner, it&rsquo;s one of the most powerful financial tools
                available.
              </p>
              <p>
                As a certified HECM specialist, I&rsquo;ll give you the full
                picture: how it works, what the real risks are, and whether it
                actually makes sense for your situation. No pressure. No runaround.
              </p>
              <a
                href="https://ryanprisco.thekatalystteam.com"
                target="_blank"
                className="btn btn-lime"
              >
                Talk to Ryan at The Katalyst Team
              </a>
            </div>
            <div
              className="reverse-facts reveal"
              style={{ transitionDelay: "0.15s" }}
            >
              <p className="reverse-facts-title">What You Should Know</p>

              <div className="reverse-fact">
                <div className="reverse-fact-icon">{CHECK_ICON}</div>
                <div className="reverse-fact-text">
                  <strong>No required monthly mortgage payments</strong>
                  <span>
                    The loan balance is repaid when you sell, move out, or pass
                    away — not before.
                  </span>
                </div>
              </div>

              <div className="reverse-fact">
                <div className="reverse-fact-icon">{CHECK_ICON}</div>
                <div className="reverse-fact-text">
                  <strong>You keep the title to your home</strong>
                  <span>
                    It&rsquo;s a loan against your equity — you&rsquo;re not
                    selling your home or giving it to the bank.
                  </span>
                </div>
              </div>

              <div className="reverse-fact">
                <div className="reverse-fact-icon">{CHECK_ICON}</div>
                <div className="reverse-fact-text">
                  <strong>Proceeds are tax-free</strong>
                  <span>
                    Reverse mortgage funds are considered loan advances, not
                    income — no income tax on what you receive.
                  </span>
                </div>
              </div>

              <div className="reverse-fact">
                <div className="reverse-fact-icon">{CHECK_ICON}</div>
                <div className="reverse-fact-text">
                  <strong>Must be 62+, primary residence only</strong>
                  <span>
                    Available for homeowners with significant equity. Taxes,
                    insurance, and maintenance are still required.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO BREAK 2 */}
      <div className="photo-break" data-parallax>
        <div
          className="photo-break-bg"
          style={{
            backgroundImage:
              "url('https://assets.cdn.filesafe.space/yaVwY401QAzbrpIRvjeq/media/698b75fa52c952e47fc0ba0a.jpg')",
          }}
        />
        <div className="photo-break-overlay">
          <div className="photo-break-text">
            <h3>26 Years. 1,645 Loans Funded.</h3>
            <p>The experience to know which loan actually fits your situation.</p>
          </div>
        </div>
      </div>

      {/* EXPERTISE */}
      <section className="expertise section" id="expertise">
        <div className="container">
          <div className="expertise-header reveal">
            <p className="section-label">Areas of Expertise</p>
            <h2 className="section-title">Covered on Both Sides</h2>
            <p className="section-subtitle">
              26 years across residential and commercial means you get the right
              answer — not just the most common one.
            </p>
          </div>
          <div className="expertise-columns">
            <div>
              <p className="expertise-col-label">Residential Lending</p>
              <div className="expertise-list">
                {[
                  "Conventional & Jumbo Loans",
                  "FHA, VA & USDA Programs",
                  "Reverse Mortgages (HECM)",
                  "First-Time Buyer Programs",
                  "Refinance & Cash-Out",
                  "Construction & Renovation Loans",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="expertise-item reveal"
                    style={{ transitionDelay: `${0.05 + i * 0.05}s` }}
                  >
                    <div className="expertise-check">{CHECK_ICON}</div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="expertise-col-label">Commercial Lending</p>
              <div className="expertise-list">
                {[
                  "Investment Property Financing",
                  "Multi-Family & Mixed-Use",
                  "Bridge & Hard Money Loans",
                  "SBA & Business Financing",
                  "Portfolio & Blanket Loans",
                  "Commercial Refinance & Cash-Out",
                ].map((item, i) => (
                  <div
                    key={item}
                    className="expertise-item reveal"
                    style={{ transitionDelay: `${0.05 + i * 0.05}s` }}
                  >
                    <div className="expertise-check">{CHECK_ICON}</div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG — shown only when there are published posts */}
      {recentPosts.length > 0 ? (
        <section className="blog section" id="blog">
          <div className="container">
            <div className="blog-header reveal">
              <div>
                <p className="section-label">Insights</p>
                <h2 className="section-title">From the Blog</h2>
                <p className="section-subtitle">
                  Tips, market updates, and lending insights to keep you
                  informed.
                </p>
              </div>
            </div>
            <div className="blog-grid">
              {recentPosts.map((post, i) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="blog-card reveal"
                  style={{
                    transitionDelay: `${0.05 + i * 0.1}s`,
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  {post.cover_image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover_image_url}
                      alt={post.title}
                      className="blog-card-img"
                    />
                  ) : null}
                  <div className="blog-card-body">
                    <span className="blog-tag">{post.tag}</span>
                    <h3 className="blog-card-title">{post.title}</h3>
                    {post.intro ? (
                      <p className="blog-card-excerpt">{post.intro}</p>
                    ) : null}
                    <div className="blog-card-meta">
                      <span className="blog-card-date">
                        {formatPublishDate(post.published_at)}
                      </span>
                      <span className="blog-read-more">Read →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="blog-footer reveal">
              <Link href="/blog" className="btn btn-outline">
                See All Posts →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* PHOTO BREAK 3 */}
      <div className="photo-break" data-parallax>
        <div
          className="photo-break-bg"
          style={{
            backgroundImage:
              "url('https://assets.cdn.filesafe.space/yaVwY401QAzbrpIRvjeq/media/698b75fa0708e47b0508c801.jpg')",
          }}
        />
        <div className="photo-break-overlay">
          <div className="photo-break-text">
            <h3>Not Sure Which Path Is Right?</h3>
            <p>Book a call — 15 minutes and we&rsquo;ll figure it out together.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="cta section" id="contact">
        <div className="container">
          <div className="cta-box reveal">
            <p className="section-label">Let&rsquo;s Talk</p>
            <h2 className="section-title">Ready to Get Started?</h2>
            <p className="section-subtitle">
              Pick a path or book a call — 15 minutes is usually all it takes to
              know exactly what you need.
            </p>
            <div className="cta-buttons">
              <a
                href="https://calendar.app.google/shsVHcdEQSWvL1qw8"
                target="_blank"
                rel="noopener"
                className="btn btn-lime"
              >
                Book a Call
              </a>
              <a
                href="https://ryanprisco.thekatalystteam.com"
                target="_blank"
                className="btn btn-outline-white"
              >
                Residential Lending →
              </a>
              <Link href="/commercial" className="btn btn-outline-white">
                Commercial Lending →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE BAR */}
      <div className="compliance-bar">
        <div className="container compliance-inner">
          <div className="equal-housing">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="87"
              viewBox="0 0 150.47 163.16"
              style={{ flexShrink: 0 }}
            >
              <path
                d="m66.991 150.54h-0.057l-8.54-17.551h-4.734v25.198h4.191v-17.967h0.062l8.778 17.967h4.497v-25.198h-4.197v17.55zm-20.1-35.23l-3.875 13.473h2.393l0.757-2.774h4.01l0.698 2.774h2.463l-3.826-13.473h-2.62zm-0.122 8.37l1.39-5.327h0.035l1.344 5.327h-2.769zm-15.649-1.63c0-6.328-3.783-7.091-5.225-7.091-1.433 0-5.222 0.763-5.222 7.091 0 6.322 3.789 7.09 5.222 7.09 0.638 0 1.758-0.151 2.788-0.903l1.284 1.521 1.195-1.521-1.179-1.39c0.666-1.05 1.137-2.59 1.137-4.8zm-2.769 2.89l-1.152-1.336-1.163 1.525 1.09 1.271c-0.409 0.266-0.847 0.357-1.23 0.357-1.222 0-2.95-0.936-2.95-4.705 0-3.775 1.728-4.711 2.95-4.711 1.23 0 2.953 0.936 2.953 4.711-0.001 1.27-0.195 2.2-0.498 2.9zm26.444-9.63v13.473h7.669v-2.439h-5.397v-11.033h-2.272zm24.092 13.47h2.263v-13.473h-2.263v5.101h-4.243v-5.101h-2.271v13.473h2.271v-6.041h4.243v6.04zm-42.607 18.43h10.484v-4.462h-10.484v-5.3h11.414v-4.457h-15.822v25.198h16.333v-4.451h-11.925v-6.53zm-17.223-29.51v-2.385h-7.991v13.473h8.245v-2.386h-6.025v-3.488h5.3v-2.38h-5.3v-2.834h5.771zm-3.002 15.29h-4.492v25.198h15.192v-4.56h-10.7v-20.64zm16.82-17.68v8.93c0.027 1.352 0.254 2.444 0.846 3.267 0.971 1.33 2.453 1.633 3.451 1.633 2.742 0 4.465-1.52 4.465-5.067v-8.762h-2.315v8.875c0 1.634-0.638 2.569-2.193 2.569-1.057 0-1.938-0.827-1.938-2.699v-8.745h-2.316zm83.125 13.47h2.271v-13.473h-2.271v13.47zm24.19 23.73c0-4.711-0.963-5.479-2.731-6.393 2.129-0.844 3.329-3.229 3.329-6.004 0-2.174-1.052-7.123-6.771-7.123h-10.879v25.198h4.402v-9.865h4.648c3.321 0 3.505 1.336 3.505 4.775 0 2.597 0.179 3.899 0.476 5.09h4.979v-0.665c-0.97-0.44-0.97-1.35-0.97-5.03zm-7.37-8.43h-5.278v-6.738h5.606c2.636 0 3.145 1.963 3.145 3.299-0.01 2.5-1.14 3.44-3.48 3.44zm-22.82-17.27c-1.982 0-2.285-1.422-2.304-2.169h-2.175c0 1.666 0.679 4.5 4.646 4.5 0.952 0 4.281-0.356 4.281-4.413 0-2.418-1.363-3.169-2.848-3.618l-2.647-0.806c-0.454-0.136-1.146-0.357-1.146-1.406 0-1.217 1.025-1.612 1.891-1.612 1.981 0 2.166 1.423 2.226 2.023h2.177c-0.011-1.655-0.909-4.349-4.237-4.349-3.526 0-4.176 2.64-4.176 4.143 0 2.964 1.695 3.456 3.45 3.959l1.163 0.336c1.152 0.341 1.972 0.622 1.972 1.671 0.02 1.44-1.18 1.75-2.26 1.75zm19.13 1.97v-13.473h-2.12v9.384h-0.026l-4.316-9.384h-2.393v13.473h2.122v-9.605h0.027l4.435 9.605h2.27zm7.13-11.49c1.606 0 2.382 1.688 2.382 2.207h2.264c-0.116-1.855-1.434-4.532-4.762-4.532-3.667-0.021-5.316 3.45-5.316 7.128 0 4.722 2.374 7.053 4.994 7.053 1.982 0 2.82-1.222 3.392-2.05l0.227 1.693h1.518v-7.264h-4.543v2.271h2.525c-0.471 2.721-2.131 2.964-2.631 2.964-1.545 0-3.161-0.952-3.161-4.63 0-3.46 1.49-4.84 3.11-4.84zm-32.4 6.78v-8.762h-2.315v8.875c0 1.634-0.635 2.569-2.192 2.569-1.063 0-1.939-0.827-1.939-2.699v-8.745h-2.314v8.93c0.026 1.352 0.254 2.444 0.849 3.267 0.969 1.33 2.447 1.633 3.448 1.633 2.738 0.01 4.468-1.51 4.468-5.06zm1.69 23.14h10.489v-4.462h-10.489v-5.3h11.414v-4.457h-15.816v25.198h16.325v-4.451h-11.923v-6.53zm-12.209-25.16c0-6.328-3.789-7.091-5.223-7.091-1.441 0-5.224 0.763-5.224 7.091 0 6.322 3.782 7.09 5.224 7.09 1.434 0 5.223-0.77 5.223-7.09zm-8.174 0c0-3.775 1.728-4.711 2.952-4.711 1.223 0 2.951 0.936 2.951 4.711 0 3.77-1.729 4.705-2.951 4.705-1.225 0-2.952-0.94-2.952-4.71zm1.838 10.94h-9.498v25.198h9.322c7.098 0 8.926-7.794 8.926-13.196 0-4.77-1.495-12-8.75-12zm-0.719 20.85h-4.375v-16.495h4.318c1.917 0 4.94 0.595 4.94 8.036 0 4.15-1.23 8.46-4.883 8.46zm-11.399-150.49l-69.782 35.722v14.538l7.721 0.103v52.062h123.6l-0.065-52.164h8.308v-14.536l-69.783-35.722zm47.773 88.675h-96.083v-46.306l48.311-24.921 47.768 24.921v46.306zm-70.618-34.137h45.273v-12.504h-45.273v12.504zm0 22.488h45.07v-12.504h-45.07v12.504z"
                fill="#1d2f42"
              />
            </svg>
          </div>
          <div className="compliance-text">
            <strong>Ryan Prisco | NMLS# 987736</strong> | The Katalyst Team |
            Company NMLS# 1533336 |{" "}
            <a
              href="https://www.nmlsconsumeraccess.org"
              target="_blank"
              rel="noopener"
              style={{ color: "inherit" }}
            >
              nmlsconsumeraccess.org
            </a>
            <br />
            Licensed to originate mortgage loans in: Arizona, California,
            Colorado, Florida, Georgia, Idaho, Oregon, Tennessee, Texas, and
            Washington. This is not a commitment to lend. All loans subject to
            credit approval, underwriting guidelines, and property qualification.
            Rates and programs subject to change without notice.
            <br />
            <em>
              Regarding reverse mortgages: These materials are not from HUD or
              FHA and were not approved by HUD or a government agency. Borrower
              must occupy home as primary residence and pay property taxes,
              homeowner&rsquo;s insurance, and maintenance costs. Consult a
              financial advisor before proceeding.
            </em>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            RYAN <span>PRISCO</span>
          </div>
          <ul className="footer-links">
            <li>
              <a
                href="https://ryanprisco.thekatalystteam.com"
                target="_blank"
                rel="noopener"
              >
                The Katalyst Team
              </a>
            </li>
            <li>
              <Link href="/commercial">RP Commercial Capital</Link>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <p className="footer-copy">
            © 2026 Ryan Prisco. All rights reserved. NMLS# 987736
            <br />
            <span style={{ opacity: 0.55, fontSize: 12 }}>
              website by{" "}
              <a
                href="https://imparioflex.com"
                target="_blank"
                rel="noopener"
                style={{
                  color: "inherit",
                  textDecoration: "underline",
                  textUnderlineOffset: 3,
                }}
              >
                IMPARIO FLEX
              </a>
            </span>
          </p>
        </div>
      </footer>

      <HomeScripts />
    </>
  );
}
