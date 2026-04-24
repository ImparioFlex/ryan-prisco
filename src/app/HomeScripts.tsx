"use client";

import { useEffect } from "react";

export default function HomeScripts() {
  useEffect(() => {
    const toggle = document.getElementById("navToggle");
    const navLinks = document.getElementById("navLinks");
    const nav = document.getElementById("nav");

    const onToggleClick = () => navLinks?.classList.toggle("open");
    toggle?.addEventListener("click", onToggleClick);

    const navAnchors = navLinks?.querySelectorAll("a") ?? [];
    const onAnchorClick = () => navLinks?.classList.remove("open");
    navAnchors.forEach((a) => a.addEventListener("click", onAnchorClick));

    const onScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);

    const smoothAnchors = document.querySelectorAll<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    const smoothHandlers: Array<[HTMLAnchorElement, (e: Event) => void]> = [];
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
      smoothHandlers.push([a, handler]);
    });

    const heroImgContainer = document.querySelector<HTMLElement>(".hero-image");
    const heroImgEl = heroImgContainer?.querySelector("img");
    const revealHeroImg = () => heroImgContainer?.classList.add("img-ready");
    if (heroImgEl) {
      if (heroImgEl.complete && heroImgEl.naturalHeight !== 0) {
        revealHeroImg();
      } else {
        heroImgEl.addEventListener("load", revealHeroImg);
        heroImgEl.addEventListener("error", revealHeroImg);
      }
    }

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
      { threshold: 0.12 },
    );
    revealEls.forEach((el) => observer.observe(el));

    return () => {
      toggle?.removeEventListener("click", onToggleClick);
      navAnchors.forEach((a) => a.removeEventListener("click", onAnchorClick));
      window.removeEventListener("scroll", onScroll);
      smoothHandlers.forEach(([a, h]) => a.removeEventListener("click", h));
      observer.disconnect();
    };
  }, []);

  return null;
}
