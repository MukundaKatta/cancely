"use client";

import { useState } from "react";
import Link from "next/link";

const DEMO_SUBS = [
  {
    name: "Gym",
    detail: "haven't used in 11 months",
    cost: "$49/mo",
    extra: "been charging since 2022",
    severity: "red" as const,
  },
  {
    name: "Disney+",
    detail: "last watched 9 months ago",
    cost: "$7.99/mo",
    extra: "",
    severity: "amber" as const,
  },
  {
    name: "Spotify",
    detail: "used daily",
    cost: "$11.99/mo",
    extra: "keeper",
    severity: "keep" as const,
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleWaitlist(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
    } catch {
      // Non-fatal: UX stays happy even if network fails.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
          Cancely
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium transition hover:border-neutral-900 hidden sm:inline-block"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-red-100 via-red-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-red-700">
            Personal finance
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            Cancel every subscription you forgot.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Connect your card. See the 23 things you&rsquo;re paying for. Cancel any in one tap.
            Keep what you love.
          </p>

          {submitted ? (
            <p className="mt-12 text-sm font-medium text-red-700">
              Thanks. We will ping you the day we launch.
            </p>
          ) : (
            <form
              id="waitlist"
              onSubmit={handleWaitlist}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700 disabled:opacity-60"
              >
                Join the waitlist
              </button>
            </form>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">See it in action</h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="flex items-baseline justify-between">
                <div className="text-sm font-semibold">Subscriptions &middot; 23 active</div>
                <div className="text-xs text-red-600 font-medium">$287/mo</div>
              </div>
              <div className="mt-4 space-y-2 text-sm">
                {DEMO_SUBS.map((sub) => {
                  if (sub.severity === "red") {
                    return (
                      <div
                        key={sub.name}
                        className="flex items-center justify-between rounded-lg border border-red-200 bg-red-50 p-3"
                      >
                        <div>
                          <div className="font-medium">
                            {sub.name} &mdash; {sub.detail}
                          </div>
                          <div className="text-xs text-red-700">
                            {sub.cost} &middot; {sub.extra}
                          </div>
                        </div>
                        <button className="rounded-full bg-red-600 px-3 py-1 text-xs text-white">
                          Cancel
                        </button>
                      </div>
                    );
                  }
                  if (sub.severity === "amber") {
                    return (
                      <div
                        key={sub.name}
                        className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-3"
                      >
                        <div>
                          <div className="font-medium">
                            {sub.name} &middot; {sub.detail}
                          </div>
                          <div className="text-xs text-amber-700">{sub.cost}</div>
                        </div>
                        <button className="rounded-full bg-amber-600 px-3 py-1 text-xs text-white">
                          Cancel
                        </button>
                      </div>
                    );
                  }
                  return (
                    <div
                      key={sub.name}
                      className="flex items-center justify-between rounded-lg border border-neutral-200 p-3"
                    >
                      <div>
                        <div className="font-medium">
                          {sub.name} &middot; {sub.detail}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {sub.cost} &mdash; {sub.extra}
                        </div>
                      </div>
                      <button className="rounded-full border border-neutral-300 px-3 py-1 text-xs">
                        Keep
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/try"
              className="inline-block rounded-full bg-red-600 px-7 py-3.5 font-medium text-white transition hover:bg-red-700"
            >
              Try the full dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">What you get</h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <div>
              <div className="text-3xl">&#x1F4B3;</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">Finds hidden subs</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                That free trial from 2022. That gym you haven&rsquo;t used. All surfaced, priced,
                dated.
              </p>
            </div>
            <div>
              <div className="text-3xl">&#x1F6D1;</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">One-tap cancel</h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                We handle the retention pitches and the &ldquo;call to cancel&rdquo; nonsense. You
                just tap.
              </p>
            </div>
            <div>
              <div className="text-3xl">&#x1F4B0;</div>
              <h3 className="mt-4 text-lg font-semibold tracking-tight">
                Average saver: $320/yr
              </h3>
              <p className="mt-2 leading-relaxed text-neutral-600">
                Paid for itself twenty times over before the end of month one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            {[
              {
                n: 1,
                title: "Sign up in seconds",
                body: "Email only. No credit card. You're in before you can overthink it.",
              },
              {
                n: 2,
                title: "Connect your accounts",
                body: "We scan your cards and surface every recurring charge. Nothing hidden.",
              },
              {
                n: 3,
                title: "Cancel what you don't use",
                body: "One tap per subscription. We handle the rest. Average savings: $27/mo.",
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="relative">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700">
                  {n}
                </div>
                <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-600">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the moment we open the
          doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-red-600 px-7 py-3.5 font-medium text-white transition hover:bg-red-700"
        >
          Reserve my spot
        </a>
      </section>

      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
            Cancely
          </p>
          <p>&copy; 2026</p>
        </div>
      </footer>
    </>
  );
}
