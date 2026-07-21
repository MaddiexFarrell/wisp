import { cn } from "@/lib/utils";

/**
 * Soft, animated gradient "aurora" backdrop built from blurred color blobs.
 * Purely decorative — sits behind content with pointer-events disabled.
 */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <div className="absolute -top-40 left-1/2 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-brand/30 blur-[120px] animate-float" />
      <div
        className="absolute top-20 -left-32 h-[30rem] w-[30rem] rounded-full bg-brand-2/25 blur-[120px] animate-float"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="absolute -bottom-40 right-0 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-[120px] animate-float"
        style={{ animationDelay: "-6s" }}
      />
    </div>
  );
}
