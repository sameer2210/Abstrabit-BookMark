import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import { Bookmark } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const supabase = createClient()
  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3 text-base font-semibold tracking-wide text-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-primary shadow-sm">
              <Bookmark className="h-5 w-5" />
            </span>
            <span className="text-gradient">Bookmark</span>
          </div>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 text-sm text-muted-foreground md:flex">
            {['Home', 'Bookmark', 'url', 'Request Callback'].map(item => (
              <a
                key={item}
                href="/login"
                className="rounded-full px-4 py-2 transition hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link href="/dashboard" className="text-sm font-medium text-foreground hover:text-primary">
                Dashboard
              </Link>
            ) : (
              <Link href="/login" className="text-sm font-medium text-foreground hover:text-primary">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 pb-10 pt-12">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-35" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.18),transparent_55%)]" />
          <div className="pointer-events-none absolute left-10 top-24 hidden h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.25),transparent_65%)] blur-3xl md:block" />
          <div className="pointer-events-none absolute right-10 top-24 hidden h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.2),transparent_65%)] blur-3xl md:block" />

          <div className="mx-auto w-full max-w-4xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-primary/80">
              Save. Organize. Revisit.
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Build The Bookmark Library That{' '}
              <span className="inline-flex items-center border border-primary/40 bg-primary/10 px-2 py-1 text-primary">
                Actually
              </span>{' '}
              Works For You.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Abstrabit helps you capture links in seconds, keep them clean, and surface what you
              need when you need it.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-7 w-7 rounded-full border border-white/20 bg-gradient-to-br from-white/20 to-white/5"
                  />
                ))}
              </div>
              <span>
                <span className="text-primary font-semibold">1 Million+</span> links saved and
                synced securely
              </span>
            </div>
            <div className="mt-8 flex justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button className="h-12 px-8 text-base">Go to Dashboard →</Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="h-12 px-8 text-base">Start Journey →</Button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
