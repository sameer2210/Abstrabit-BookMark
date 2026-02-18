
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
    <header className="sticky top-0 z-30 w-full border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3 text-base font-semibold tracking-wide text-foreground">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-primary shadow-sm">
            <Bookmark className="h-5 w-5" />
          </span>
          <span className="text-gradient"> Bookmark</span>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 p-1">
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="h-9 px-4 text-sm text-foreground/90 hover:bg-white/10"
            size="sm"
          >
            <LogOut className="h-4 w-4" />
            Log out
          </Button>
        </div>
      </div>
    </header>
  )
}
