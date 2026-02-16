
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { LoginButton } from './login-button'

export default async function Login() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect('/dashboard')
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 h-screen m-auto">
      <div className="flex flex-col gap-2 text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Abstrabit Bookmark</h1>
        <p className="text-foreground/60">
          Smart bookmark manager for the modern web.
        </p>
      </div>

      <LoginButton />
    </div>
  )
}
