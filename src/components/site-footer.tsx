import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-border bg-background">
      {/* Subtle grain texture */}
      <div
        aria-hidden
        className="grain pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-soft-light"
      />

      {/* Footer content */}
      <div className="relative z-10 w-full px-6 pb-32 pt-16 sm:pb-40 md:px-12 lg:pb-48">
        <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Link
              href="#top"
              aria-label={site.name}
              className="inline-flex items-center"
            >
              <span
                aria-hidden
                className="block aspect-[1544/283] h-5 bg-[#d9c7a3] md:h-6"
                style={{
                  WebkitMaskImage: "url(/wisp-logo-white.png)",
                  maskImage: "url(/wisp-logo-white.png)",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskPosition: "left center",
                  maskPosition: "left center",
                }}
              />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol title="Studio" links={site.nav} />
            <FooterCol
              title="Connect"
              links={[
                { label: "LinkedIn", href: site.social.linkedin },
                { label: "Set up a meeting", href: site.calendly },
              ]}
            />
            <div>
              <h4 className="text-sm font-medium">Say hello</h4>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 block text-sm text-muted transition-colors hover:text-foreground"
              >
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
        </div>
        </div>
      </div>

      {/* Large ghosted wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 select-none overflow-hidden"
      >
        <p
          className="whitespace-nowrap text-center font-display font-light leading-[0.75] tracking-[-0.04em]"
          style={{
            fontSize: "clamp(120px, 18vw, 320px)",
            color: "color-mix(in oklab, var(--color-foreground) 8%, transparent)",
            transform: "translateY(22%)",
          }}
        >
          Wisp Studio
        </p>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="text-sm font-medium">{title}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => {
          const external = l.href.startsWith("http");
          return (
            <li key={l.label}>
              <Link
                href={l.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
                {...(external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
