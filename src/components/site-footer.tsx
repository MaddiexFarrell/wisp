import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Background image */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(/footerbackground2.png)" }}
      />
      {/* Scrim: keep the image visible but the text legible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <Link
              href="#top"
              aria-label={site.name}
              className="inline-flex items-center"
            >
              {/* Logo is a monochrome wordmark on transparency, so we paint it
                  via a CSS mask — gives an exact beige rather than an
                  approximate `filter` tint. */}
              <span
                aria-hidden
                className="block aspect-[1179/136] h-4 bg-[#d9c7a3] md:h-5"
                style={{
                  WebkitMaskImage: "url(/Wisp%20Logo.png)",
                  maskImage: "url(/Wisp%20Logo.png)",
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
