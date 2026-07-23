import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "primary"
  | "ghost"
  | "outline"
  | "solid-dark"
  | "outline-dark";
type Size = "md" | "lg";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:brightness-105 hover:shadow-[0_0_50px_-12px_var(--color-brand)]",
  outline:
    "border border-border bg-surface/40 text-foreground backdrop-blur hover:bg-surface-2 hover:border-white/20",
  ghost: "text-muted hover:text-foreground",
  // For use on light sections (e.g. the hero): a dark pill + a dark outline.
  "solid-dark":
    "bg-[#3a2a1c] text-white hover:brightness-110 hover:shadow-[0_0_40px_-10px_rgba(58,42,28,0.6)]",
  "outline-dark":
    "border border-black/20 bg-white/40 text-[#161310] backdrop-blur hover:border-black/40 hover:bg-white/70",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-8 text-base",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      {...props}
    >
      {children}
    </Link>
  );
}
