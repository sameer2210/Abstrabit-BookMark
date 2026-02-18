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

  const totalBookmarks = bookmarks?.length ?? 0
  const latestDate = bookmarks?.[0]?.created_at
    ? new Date(bookmarks[0].created_at).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'No activity yet'

  return (
    <div className="flex w-full flex-col gap-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Your Bookmarks</h1>
          <p className="text-muted-foreground">Manage and organize your favorite links.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="glass-panel rounded-2xl px-4 py-3 text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Total</p>
            <p className="text-2xl font-semibold">{totalBookmarks}</p>
          </div>
          <div className="glass-panel rounded-2xl px-4 py-3 text-left">
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Latest Save</p>
            <p className="text-sm font-semibold text-foreground">{latestDate}</p>
          </div>
        </div>
      </div>
      <BookmarkManager initialBookmarks={bookmarks || []} />
    </div>
  )
}
