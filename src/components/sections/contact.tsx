"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { site } from "@/lib/site";
import { Aurora } from "../ui/aurora";

const budgets = ["< $10k", "$10k–$25k", "$25k–$50k", "$50k+"];

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const budget = String(data.get("budget") || "");
    const message = String(data.get("message") || "");

    // No backend yet — open the visitor's mail client, pre-filled.
    // Swap this for a real API route or form provider when ready.
    const subject = encodeURIComponent(`New project inquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <Aurora className="opacity-70" />
      <div className="relative mx-auto max-w-4xl px-5">
        <div className="overflow-hidden rounded-4xl border border-border bg-surface/60 p-8 backdrop-blur-xl sm:p-12">
          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-2">
              Start a project
            </span>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              Let&apos;s build something
              <br />
              <span className="text-gradient">worth talking about.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Tell us about your project. We reply to every serious inquiry
              within one business day.
            </p>
          </div>

          {sent ? (
            <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-3 rounded-3xl border border-border bg-background/40 p-8 text-center">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-[linear-gradient(120deg,var(--color-brand),var(--color-brand-2))] text-white">
                <Check size={22} />
              </span>
              <p className="text-lg font-medium">Your email is ready to send.</p>
              <p className="text-sm text-muted">
                If your mail app didn&apos;t open, reach us directly at{" "}
                <a
                  href={`mailto:${site.email}`}
                  className="text-foreground underline underline-offset-4"
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-10 grid max-w-xl gap-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field name="name" label="Name" placeholder="Ada Lovelace" />
                <Field
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="ada@company.com"
                />
              </div>

              <label className="grid gap-2 text-sm">
                <span className="text-muted">Budget</span>
                <select
                  name="budget"
                  defaultValue=""
                  className="h-12 rounded-2xl border border-border bg-background/60 px-4 text-foreground outline-none transition-colors focus:border-brand"
                >
                  <option value="" disabled>
                    Select a range
                  </option>
                  {budgets.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm">
                <span className="text-muted">Project details</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="What are you building, and what does success look like?"
                  className="rounded-2xl border border-border bg-background/60 p-4 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-brand"
                />
              </label>

              <button
                type="submit"
                className="group mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,var(--color-brand),var(--color-brand-2))] px-8 font-medium text-white transition-all duration-300 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Send inquiry
                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
}: {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="grid gap-2 text-sm">
      <span className="text-muted">{label}</span>
      <input
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="h-12 rounded-2xl border border-border bg-background/60 px-4 text-foreground outline-none transition-colors placeholder:text-muted/60 focus:border-brand"
      />
    </label>
  );
}
