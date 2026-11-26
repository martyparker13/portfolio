"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const CONTACT_SECTION_ID = "contact";

export function FloatingGetInTouchCta() {
  const [showCta, setShowCta] = useState(true);

  useEffect(() => {
    const contactSection = document.getElementById(CONTACT_SECTION_ID);
    if (!contactSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowCta(!entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.1,
      },
    );

    observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  if (!showCta) {
    return null;
  }

  return (
    <div className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 md:bottom-24 pointer-events-none">
      <Link
        href={`#${CONTACT_SECTION_ID}`}
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-neutral-800 dark:text-neutral-100 bg-white/25 dark:bg-black/40 hover:bg-white/35 dark:hover:bg-black/50 backdrop-blur-xl border border-white/30 dark:border-white/20 hover:border-white/40 dark:hover:border-white/30 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 dark:focus-visible:ring-white/30"
        aria-label="Get in touch — jump to contact section"
      >
        Get in touch
      </Link>
    </div>
  );
}
