
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { Bookmark, CheckCircle2, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await (await supabase).auth.getUser();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-16 w-full items-center justify-between border-b px-4 md:px-6 sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <Bookmark className="h-6 w-6 text-indigo-600" />
          <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Abstrabit Bookmark</span>
        </div>
        <nav className="flex items-center gap-4">
          {user ? (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="secondary">Sign In</Button>
            </Link>
          )}
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 flex flex-col items-center justify-center text-center px-4 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]">
          <div className="container max-w-4xl space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl text-foreground">
              Your Web, <span className="text-indigo-600">Organized.</span>
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              The smartest way to save, organize, and access your favorite links from anywhere.
              Simple, private, and fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              {user ? (
                <Link href="/dashboard">
                  <Button size="lg" className="h-12 px-8 text-lg">
                    Manage Bookmarks
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button size="lg" className="h-12 px-8 text-lg bg-indigo-600 hover:bg-indigo-700">
                    Get Started for Free
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
              {/* Feature 1 */}
              <div className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-card border shadow-sm">
                <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Optimistic UI updates mean your interactions feel instant, even on slow connections.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-card border shadow-sm">
                 <div className="p-3 rounded-lg bg-violet-100 text-violet-600 dark:bg-violet-900/30">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your data is protected with Row Level Security. Only you can access your bookmarks.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-start gap-4 p-6 rounded-2xl bg-card border shadow-sm">
                 <div className="p-3 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Smart Features</h3>
                <p className="text-muted-foreground">
                  Auto-fetching titles and real-time validation make saving links effortless.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with Next.js, Supabase, and Tailwind.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline underline-offset-4">Privacy</Link>
            <Link href="#" className="hover:underline underline-offset-4">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
