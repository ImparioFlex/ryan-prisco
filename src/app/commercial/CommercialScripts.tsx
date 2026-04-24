"use client";

import { useEffect } from "react";

export default function CommercialScripts() {
  useEffect(() => {
    const toggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    const nav = document.getElementById("nav");
    const heroBg = document.getElementById("heroBg");

    const onToggleClick = () => navLinks?.classList.toggle("open");
    toggle?.addEventListener("click", onToggleClick);

    const navAnchors = navLinks?.querySelectorAll("a") ?? [];
    const onAnchorClick = () => navLinks?.classList.remove("open");
    navAnchors.forEach((a) => a.addEventListener("click", onAnchorClick));

    const onScroll = () =>
      nav?.classList.toggle("scrolled", window.scrollY > 10);
    window.addEventListener("scroll", onScroll);

    const smoothAnchors = document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    const handlers: Array<[HTMLAnchorElement, (e: Event) => void]> = [];
    smoothAnchors.forEach((a) => {
      const handler = (e: Event) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      };
      a.addEventListener("click", handler);
      handlers.push([a, handler]);
    });

    const onLoad = () => heroBg?.classList.add("loaded");
    if (document.readyState === "complete") onLoad();
    else window.addEventListener("load", onLoad);

    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    revealEls.forEach((el) => observer.observe(el));

    return () => {
      toggle?.removeEventListener("click", onToggleClick);
      navAnchors.forEach((a) => a.removeEventListener("click", onAnchorClick));
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("load", onLoad);
      handlers.forEach(([a, h]) => a.removeEventListener("click", h));
      observer.disconnect();
    };
  }, []);

  return null;
}
