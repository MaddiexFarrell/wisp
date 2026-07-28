"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled && "pointer-events-none -translate-y-full opacity-0",
      )}
    >
      {/* Structure mirrors the hero (full-width padding, then a centered
          max-w-6xl) so the logo lines up exactly with the hero copy. */}
      <div className="w-full px-6 md:px-12">
        <div className="mx-auto flex h-16 max-w-6xl items-center md:h-20">
          <Link href="#top" aria-label={site.name} className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/wisp-logo-dark.png"
              alt={site.name}
              className="h-5 w-auto md:h-6"
            />
          </Link>

          <nav className="ml-auto flex items-center gap-5 sm:gap-7">
            <ButtonLink
              href={site.cta.href}
              variant="solid-dark"
              size="md"
              className="border border-white/20 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.45)]"
            >
              {site.cta.label}
            </ButtonLink>
          </nav>
        </div>
      </div>
    </header>
  );
}
