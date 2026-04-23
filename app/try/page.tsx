"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Subscription {
  id: string;
  name: string;
  icon: string;
  cost: number;
  lastUsed: string;
  canceled: boolean;
}

const INITIAL_SUBS: Subscription[] = [
  {
    id: "netflix",
    name: "Netflix",
    icon: "N",
    cost: 15.49,
    lastUsed: "2 days ago",
    canceled: false,
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "S",
    cost: 11.99,
    lastUsed: "Today",
    canceled: false,
  },
  {
    id: "adobe",
    name: "Adobe Creative Cloud",
    icon: "A",
    cost: 59.99,
    lastUsed: "4 months ago",
    canceled: false,
  },
  {
    id: "gym",
    name: "Planet Fitness",
    icon: "P",
    cost: 24.99,
    lastUsed: "11 months ago",
    canceled: false,
  },
  {
    id: "hulu",
    name: "Hulu",
    icon: "H",
    cost: 17.99,
    lastUsed: "6 months ago",
    canceled: false,
  },
  {
    id: "cloud",
    name: "iCloud+ 200GB",
    icon: "C",
    cost: 2.99,
    lastUsed: "Today",
    canceled: false,
  },
];

const STORAGE_KEY = "cancely_subs";

function loadSubs(): Subscription[] {
  if (typeof window === "undefined") return INITIAL_SUBS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {
    // ignore
  }
  return INITIAL_SUBS;
}

function saveSubs(subs: Subscription[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  } catch {
    // ignore
  }
}

function formatCost(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function TryPage() {
  const [subs, setSubs] = useState<Subscription[]>(INITIAL_SUBS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSubs(loadSubs());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) saveSubs(subs);
  }, [subs, loaded]);

  function toggleCancel(id: string) {
    setSubs((prev) =>
      prev.map((s) => (s.id === id ? { ...s, canceled: !s.canceled } : s))
    );
  }

  function handleReset() {
    setSubs(INITIAL_SUBS);
  }

  const activeTotal = subs
    .filter((s) => !s.canceled)
    .reduce((sum, s) => sum + s.cost, 0);
  const activeCount = subs.filter((s) => !s.canceled).length;
  const savedTotal = subs
    .filter((s) => s.canceled)
    .reduce((sum, s) => sum + s.cost, 0);

  return (
    <div className="min-h-screen bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" />
          Cancely
        </Link>
        <Link
          href="/#waitlist"
          className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
        >
          Get early access
        </Link>
      </nav>

      <div className="mx-auto max-w-2xl px-6 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-600">
              Subscription dashboard
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight">
              Your subscriptions at a glance.
            </h1>
          </div>
          <button
            onClick={handleReset}
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium transition hover:border-neutral-900"
          >
            Reset
          </button>
        </div>

        {/* Summary bar */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
          <div>
            <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
              Active spend
            </p>
            <p className="text-2xl font-bold text-neutral-900">
              {formatCost(activeTotal)}
              <span className="text-sm font-normal text-neutral-500">/mo</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-neutral-500 uppercase tracking-wider font-semibold">
              {activeCount} active
            </p>
            {savedTotal > 0 && (
              <p className="text-sm font-medium text-green-700">
                Saving {formatCost(savedTotal)}/mo
              </p>
            )}
          </div>
        </div>

        {/* Subscription cards */}
        <div className="space-y-3">
          {subs.map((sub) => (
            <div
              key={sub.id}
              className={`flex items-center justify-between rounded-2xl border p-4 transition ${
                sub.canceled
                  ? "border-green-200 bg-green-50"
                  : "border-neutral-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${
                    sub.canceled ? "bg-green-500" : "bg-neutral-900"
                  }`}
                >
                  {sub.icon}
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      sub.canceled ? "line-through text-neutral-400" : "text-neutral-900"
                    }`}
                  >
                    {sub.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {formatCost(sub.cost)}/mo &middot; Last used: {sub.lastUsed}
                  </p>
                </div>
              </div>
              <button
                onClick={() => toggleCancel(sub.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  sub.canceled
                    ? "border border-green-300 bg-white text-green-700 hover:bg-green-50"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {sub.canceled ? "Undo" : "Cancel"}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-neutral-400">
          This is a v0 preview with 6 mock subscriptions. localStorage only &mdash; no real bank
          connection.{" "}
          <Link href="/#waitlist" className="underline hover:text-neutral-600">
            Join the waitlist
          </Link>{" "}
          for the real thing.
        </p>
      </div>
    </div>
  );
}
