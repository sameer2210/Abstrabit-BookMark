
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Bookmark, CheckCircle2, Shield, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3 font-semibold text-lg">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
              <Bookmark className="h-5 w-5" />
            </span>
            <span className="text-gradient">Abstrabit Bookmark</span>
          </div>
          <nav className="flex items-center gap-3">
            {user ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                  Sign In
                </Link>
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90">Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
          <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--brand-2),transparent_70%)] opacity-30 blur-2xl" />
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 pb-20 pt-16 md:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="h-4 w-4 text-primary" />
                All your links, always organized
              </div>
              <h1 className="fade-up text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Your web, curated with
                <span className="text-gradient"> effortless focus</span>.
              </h1>
              <p
                className="fade-up max-w-xl text-lg text-muted-foreground"
                style={{ animationDelay: "120ms" }}
              >
                Abstrabit keeps your bookmarks clean, searchable, and synced. Save faster, revisit smarter, and keep every important link within reach.
              </p>
              <div className="fade-up flex flex-wrap items-center gap-3" style={{ animationDelay: "200ms" }}>
                {user ? (
                  <Link href="/dashboard">
                    <Button size="lg">Manage Bookmarks</Button>
                  </Link>
                ) : (
                  <Link href="/login">
                    <Button size="lg">Get Started for Free</Button>
                  </Link>
                )}
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1">
                    <Zap className="h-4 w-4 text-primary" /> Instant sync
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1">
                    <Shield className="h-4 w-4 text-primary" /> Private by default
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="floaty glass-panel rounded-3xl p-6">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Today</span>
                  <span className="rounded-full bg-secondary px-3 py-1">Synced</span>
                </div>
                <div className="mt-6 space-y-4">
                  {[
                    { title: "Design Systems Library", url: "https://designsystems.substack.com" },
                    { title: "AI Research Notebook", url: "https://distill.pub" },
                    { title: "Product Thinking Archive", url: "https://www.lennysnewsletter.com" },
                  ].map((item) => (
                    <div key={item.url} className="rounded-2xl border border-border/70 bg-background/80 p-4 shadow-sm">
                      <div className="text-sm font-semibold text-foreground">{item.title}</div>
                      <div className="text-xs text-muted-foreground">{item.url}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border/70 bg-background/90 px-4 py-3 text-xs text-muted-foreground shadow-sm sm:block">
                Auto-fetch titles in seconds
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
              <div className="space-y-4">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  Built for focus
                </p>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
                  A calm home for everything you save.
                </h2>
                <p className="text-muted-foreground">
                  From research to inspiration boards, Abstrabit keeps your links crisp and easy to revisit, with fast adding and real-time sync.
                </p>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  {
                    title: "Lightning Fast",
                    description:
                      "Optimistic updates make every save feel instant, even on slower connections.",
                    icon: Zap,
                  },
                  {
                    title: "Secure & Private",
                    description:
                      "Row-level security keeps your collection truly yours, and only yours.",
                    icon: Shield,
                  },
                  {
                    title: "Smart Features",
                    description:
                      "Auto-fetch titles and validate links to keep your library tidy.",
                    icon: CheckCircle2,
                  },
                  {
                    title: "Designed to Flow",
                    description:
                      "Clean layouts and quick actions help you stay in the zone.",
                    icon: Sparkles,
                  },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="glass-panel rounded-2xl p-6 transition-all hover:-translate-y-1"
                  >
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
            <div className="glass-panel flex flex-col items-start justify-between gap-6 rounded-3xl px-8 py-10 md:flex-row md:items-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold md:text-3xl">Ready to build your library?</h2>
                <p className="text-sm text-muted-foreground">
                  Start saving your best links in a space that feels as polished as your workflow.
                </p>
              </div>
              <Link href={user ? "/dashboard" : "/login"}>
                <Button size="lg" className="w-full md:w-auto">
                  {user ? "Open Dashboard" : "Create Your Account"}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-border/60 py-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, Supabase, and Tailwind.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
