import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2 text-lg font-semibold tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-2))]">
                <span className="h-3 w-3 rounded-[3px] bg-background" />
              </span>
              {site.name}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.description}
            </p>
            <p className="mt-4 font-mono text-xs text-muted">{site.location}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterCol title="Studio" links={site.nav} />
            <FooterCol
              title="Connect"
              links={[
                { label: "X / Twitter", href: site.social.x },
                { label: "LinkedIn", href: site.social.linkedin },
                { label: "GitHub", href: site.social.github },
                { label: "Dribbble", href: site.social.dribbble },
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
          <p className="font-mono">Designed & built in-house.</p>
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
