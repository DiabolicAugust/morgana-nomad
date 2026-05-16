"use client";

import { useEffect } from "react";

export function ReadingProgress() {
  useEffect(() => {
    const bar = document.getElementById("reading-progress-bar");
    if (!bar) return;
    const onScroll = () => {
      const doc = document.documentElement;
      const scroll = doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      const p = height > 0 ? (scroll / height) * 100 : 0;
      bar.style.width = `${p}%`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent pointer-events-none"
      aria-hidden
    >
      <div
        id="reading-progress-bar"
        className="h-full w-0 bg-primary transition-[width] duration-150 ease-out"
      />
    </div>
  );
}
