
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LoginButton } from './login-button'
import { Bookmark, Shield, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default async function Login() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="relative grid min-h-screen lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden flex-col justify-between px-12 py-14 lg:flex">
          <Link href="/" className="flex items-center gap-3 font-semibold text-lg">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
              <Bookmark className="h-5 w-5" />
            </span>
            <span className="text-gradient">Abstrabit Bookmark</span>
          </Link>
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold leading-tight">
              Sign in to your calm, curated library.
            </h1>
            <p className="text-muted-foreground">
              Everything you save should feel easy to find. Abstrabit keeps your best links tidy and ready for action.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Smart auto-titles and validation
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                Private by default with secure sync
              </div>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Seamless access on every device.
          </p>
        </div>

        <div className="flex items-center justify-center px-6 py-12">
          <div className="glass-panel w-full max-w-md rounded-3xl p-8">
            <div className="mb-6 space-y-2 text-center">
              <div className="flex items-center justify-center gap-2 text-sm font-semibold text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary shadow-sm">
                  <Bookmark className="h-4 w-4" />
                </span>
                Abstrabit Bookmark
              </div>
              <h2 className="text-3xl font-semibold tracking-tight">Welcome back</h2>
              <p className="text-sm text-muted-foreground">
                Sign in with Google to continue.
              </p>
            </div>
            <LoginButton />
            <div className="mt-6 text-center text-xs text-muted-foreground">
              By continuing, you agree to our Terms and Privacy Policy.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
