import { BookmarkManager } from '@/components/bookmark-manager'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = createClient()

  const {
    data: { user },
  } = await (await supabase).auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: bookmarks } = await (await supabase)
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="flex-1 w-full flex flex-col gap-12 max-w-5xl mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Bookmarks</h1>
        <p className="text-muted-foreground">Manage and organize your favorite links.</p>
      </div>
      <BookmarkManager initialBookmarks={bookmarks || []} />
    </div>
  )
}
