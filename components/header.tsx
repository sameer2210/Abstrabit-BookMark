
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
    <header className="flex h-16 w-full items-center justify-between border-b px-4 md:px-6 bg-background sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2 font-bold text-xl text-primary">
        <Bookmark className="h-6 w-6 text-indigo-600" />
        <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Abstrabit Bookmark</span>
      </div>
      <Button
        onClick={handleLogout}
        variant="destructive"
        className="bg-red-500 hover:bg-red-600 text-white"
        size="sm"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Log out
      </Button>
    </header>
  )
}
