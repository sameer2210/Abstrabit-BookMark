
'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import { Bookmark, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (!error) {
       router.push('/login')
    }
  }

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border/60 bg-background/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 font-semibold text-lg">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-sm">
            <Bookmark className="h-5 w-5" />
          </span>
          <span className="text-gradient">Abstrabit Bookmark</span>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-destructive/40 text-destructive hover:bg-destructive/10"
          size="sm"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </Button>
      </div>
    </header>
  )
}
