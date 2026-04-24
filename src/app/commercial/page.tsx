"use client";

import { FormEvent } from "react";
import CommercialScripts from "./CommercialScripts";

const SERVICES = [
  "Owner User (SBA 504 / SBA 7a)",
  "Conventional Commercial Mortgage Products (Owner User / Investment)",
  "Multi-Family 5+ Units",
  "Warehouse / Industrial",
  "Raw / Vacant Land",
  "Office / Medical Office",
  "Mixed Use",
  "Commercial Lines of Credit",
  "Commercial Private Money / Hard Money",
  "Commercial Investor (No Income Verification / DSCR)",
  "Commercial Construction",
  "Bridge / Fix and Flip Project Loans",
  "Business Financing",
];

export default function CommercialPage() {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Thanks — transaction submitted. Ryan will be in touch within 24 hours.");
  };

  return (
    <>
      {/* NAV */}
      <nav className="nav" id="nav">
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            <span className="nav-brand-top">RP Commercial Capital</span>
            <span className="nav-brand-sub">Ryan Prisco</span>
          </a>
          <button className="nav-toggle" id="navToggle" aria-label="Toggle menu">
            <span />
            <span />
            <span />
          </button>
          <ul className="nav-links" id="navLinks">
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#process">How It Works</a>
            </li>
            <li>
              <a href="https://ryanprisco.com" className="nav-back">
                ← ryanprisco.com
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-cta-link">
                Submit a Transaction
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" id="heroBg" />
        <div className="hero-overlay" />
        <div className="hero-content">
          <p className="hero-eyebrow">RP Commercial Capital</p>
          <h1 className="hero-title">
            Financing the <em>Future</em> of
            <br />
            Commercial Real Estate
          </h1>
          <p className="hero-subtitle">
            Bridge loans, construction financing, equity solutions, and strategic
            capital advisory for serious investors and developers.
          </p>
          <div className="hero-buttons">
            <a href="#contact" className="btn btn-gold">
              Submit a Transaction
            </a>
            <a href="#services" className="btn btn-outline-white">
              Our Solutions →
            </a>
          </div>
        </div>
        <div className="hero-stats">
          <div className="hero-stats-inner">
            <div className="hero-stat">
              <span className="number">$653M+</span>
              <span className="label">Funded Volume</span>
            </div>
            <div className="hero-stat">
              <span className="number">1,645</span>
              <span className="label">Loans Funded</span>
            </div>
            <div className="hero-stat">
              <span className="number">26</span>
              <span className="label">Years Experience</span>
            </div>
            <div className="hero-stat">
              <span className="number">48</span>
              <span className="label">States Licensed</span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="services section" id="services">
        <div className="container">
          <div className="services-header reveal">
            <p className="section-eyebrow">What We Do</p>
            <h2 className="section-title">Strategic Capital Solutions</h2>
            <p className="section-subtitle">
              From acquisition through exit, we structure the right financing for
              complex commercial real estate transactions.
            </p>
          </div>
          <div
            className="services-grid"
            style={{ gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
          >
            {SERVICES.map((s, i) => (
              <div
                key={s}
                className="service-card reveal"
                style={{
                  transitionDelay: `${0.03 + i * 0.03}s`,
                  padding: "28px 24px",
                  textAlign: "center",
                }}
              >
                <div className="service-card-body" style={{ padding: 0 }}>
                  <h3 style={{ fontSize: 17 }}>{s}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about section" id="about">
        <div className="container about-grid">
          <div className="about-image-wrap reveal">
            <img
              src="/images/ryan-about.png"
              alt="Ryan Prisco"
              className="about-img"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div
            className="about-content reveal"
            style={{ transitionDelay: "0.15s" }}
          >
            <p className="section-eyebrow">Committed to Capital Excellence</p>
            <h2 className="section-title" style={{ color: "#fff" }}>
              Ryan Prisco
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: "0.5px",
                marginBottom: 16,
              }}
            >
              CalDRE #01470381
            </p>
            <div className="about-divider" />
            <p>
              RP Commercial Capital was built on a simple premise: complex
              transactions deserve an advisor who actually understands them. With
              over 26 years in commercial and residential lending, Ryan brings
              institutional-level expertise to every transaction — without the
              institutional red tape.
            </p>
            <p>
              Whether you&rsquo;re acquiring a multi-family asset, repositioning
              a mixed-use property, or structuring a development transaction,
              Ryan brings the relationships, creativity, and execution to get it
              done.
            </p>
            <a href="#contact" className="btn btn-gold">
              Discuss Your Transaction
            </a>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="process section" id="process">
        <div className="container">
          <div className="process-header reveal">
            <p className="section-eyebrow">How It Works</p>
            <h2 className="section-title">From Submission to Close</h2>
            <p className="section-subtitle">
              A streamlined process built for investors who move fast and expect
              straight answers.
            </p>
          </div>
          <div className="process-steps">
            {[
              {
                n: "01",
                t: "Submit Your Transaction",
                p: "Fill out the transaction submission form below. The more detail you provide, the faster we can respond.",
              },
              {
                n: "02",
                t: "Initial Review",
                p: "We review your transaction within 24–48 hours and schedule a call to discuss structure, terms, and fit.",
              },
              {
                n: "03",
                t: "Term Sheet",
                p: "If it's a fit, we issue a term sheet outlining loan structure, rate, and timeline — no surprises.",
              },
              {
                n: "04",
                t: "Close & Fund",
                p: "We move efficiently through due diligence and close on your timeline. Speed and certainty of close.",
              },
            ].map((s, i) => (
              <div
                key={s.n}
                className="process-step reveal"
                style={{ transitionDelay: `${0.05 + i * 0.07}s` }}
              >
                <div className="step-number">{s.n}</div>
                <h4>{s.t}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact section" id="contact">
        <div className="container contact-grid">
          <div className="contact-content reveal">
            <p className="section-eyebrow" style={{ color: "var(--gold)" }}>
              Let&rsquo;s Talk
            </p>
            <h2 className="section-title" style={{ color: "#fff" }}>
              Submit a Transaction
            </h2>
            <p>
              Have a commercial opportunity? Tell us about it. We respond to
              every submission and can typically provide preliminary feedback
              within 24 hours.
            </p>
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="contact-detail-text">
                <strong>Email</strong>
                <span>
                  <a
                    href="mailto:Ryan@rpcommercialcapital.com"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    Ryan@rpcommercialcapital.com
                  </a>
                </span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.58 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.15 6.15l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="contact-detail-text">
                <strong>Phone</strong>
                <span>
                  <a
                    href="tel:+16268181919"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    (626) 818-1919
                  </a>
                </span>
              </div>
            </div>
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <svg viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-detail-text">
                <strong>Based In</strong>
                <span>Serving all 48 contiguous states</span>
              </div>
            </div>
          </div>
          <div
            className="contact-form reveal"
            style={{ transitionDelay: "0.15s" }}
          >
            <p className="form-title">Tell Us About the Transaction</p>
            <form onSubmit={onSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" placeholder="John" />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" placeholder="Smith" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="john@company.com" />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" placeholder="(555) 000-0000" />
                </div>
              </div>
              <div className="form-group">
                <label>Transaction Type</label>
                <select defaultValue="">
                  <option value="" disabled>
                    Select transaction type
                  </option>
                  <option>Bridge / Transitional Loan</option>
                  <option>Construction Financing</option>
                  <option>Equity / Mezzanine</option>
                  <option>Asset Advisory</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Loan Amount</label>
                  <input type="text" placeholder="$2,500,000" />
                </div>
                <div className="form-group">
                  <label>Property Location</label>
                  <input type="text" placeholder="City, State" />
                </div>
              </div>
              <div className="form-group">
                <label>Transaction Summary</label>
                <textarea placeholder="Briefly describe the asset type, business plan, and timeline..." />
              </div>
              <button
                type="submit"
                className="btn btn-gold"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: 15,
                }}
              >
                Submit Transaction →
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <div className="compliance-bar">
        <div className="container compliance-inner">
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
            Licensed in: Arizona, California, Colorado, Florida, Georgia, Idaho,
            Oregon, Tennessee, Texas, and Washington. This is not a commitment to
            lend. All commercial loan inquiries are subject to underwriting
            review and approval. Terms and availability subject to change without
            notice.
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            RP <span>Commercial Capital</span>
          </div>
          <ul className="footer-links">
            <li>
              <a href="https://ryanprisco.com">← ryanprisco.com</a>
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
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Submit a Transaction</a>
            </li>
          </ul>
          <p className="footer-copy">
            © 2026 RP Commercial Capital | Ryan Prisco NMLS# 987736
            <br />
            Commercial lending services provided through RP Commercial Capital.
            All rights reserved.
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

      <CommercialScripts />
    </>
  );
}
