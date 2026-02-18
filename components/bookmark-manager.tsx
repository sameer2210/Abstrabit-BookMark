
'use client'

import { addBookmark, deleteBookmark, fetchPageMetadata } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/client'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Globe, Loader2, Plus, Trash2, Wand2 } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

export type Bookmark = {
  id: string
  title: string
  url: string
  user_id: string
  created_at: string
}

export function BookmarkManager({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() =>
    [...initialBookmarks].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  )
  const supabase = createClient()
  const [isAdding, setIsAdding] = useState(false)
  const [isFetchingTitle, setIsFetchingTitle] = useState(false)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const channel = supabase
      .channel('realtime bookmarks')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            const newBookmark = payload.new as Bookmark
            setBookmarks((prev) => {
              // Deduplicate
              if (prev.some((b) => b.id === newBookmark.id)) return prev
              return [newBookmark, ...prev]
            })
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const handleFetchTitle = async () => {
    if (!url) return
    setIsFetchingTitle(true)
    const result = await fetchPageMetadata(url)
    if (result && 'title' in result && result.title) {
      setTitle(result.title)
      toast.success('Title fetched!')
    } else {
      // toast.error('Could not fetch title') // Optional: don't error, just let user type
    }
    setIsFetchingTitle(false)
  }

  const handleCreate = async (formData: FormData) => {
    setIsAdding(true)
    const titleVal = formData.get('title') as string
    const urlVal = formData.get('url') as string

    if (!titleVal || !urlVal) {
        setIsAdding(false)
        return
    }

    const optimisticId = crypto.randomUUID()
    const validUrl = urlVal.includes('://') ? urlVal : `https://${urlVal}`

    const newBookmark: Bookmark = {
      id: optimisticId,
      title: titleVal,
      url: validUrl,
      user_id: 'optimistic',
      created_at: new Date().toISOString(),
    }

    // Optimistic Update
    setBookmarks((prev) => [newBookmark, ...prev])
    formRef.current?.reset()
    setTitle('')
    setUrl('')

    // Add ID to form data for server action
    formData.append('id', optimisticId)

    const result = await addBookmark(formData)

    if (result?.error) {
      toast.error(result.error)
      // Revert
      setBookmarks((prev) => prev.filter((b) => b.id !== optimisticId))
    } else {
      toast.success('Bookmark added!')
    }
    setIsAdding(false)
  }

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.preventDefault()

    // Optimistic Delete
    const originalBookmarks = [...bookmarks]
    setBookmarks((prev) => prev.filter((b) => b.id !== id))

    const result = await deleteBookmark(id)

    if (result?.error) {
      toast.error(result.error)
      setBookmarks(originalBookmarks)
    } else {
        toast.success('Bookmark deleted')
    }
  }

  return (
    <div className="space-y-10">
      {/* Search / Filter could go here later */}

      {/* Add Form */}
      <div className="glass-panel rounded-3xl p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-foreground/90">
            <Plus className="h-4 w-4" /> Add New Bookmark
          </h2>
          <div className="text-xs text-muted-foreground">
            Auto-fetch pulls the page title for you.
          </div>
        </div>
        <form
          ref={formRef}
          action={handleCreate}
          className="mt-6 grid gap-4 md:grid-cols-[1.2fr_2fr_auto] md:items-end"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="title"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Title
              </label>
              <button
                type="button"
                onClick={handleFetchTitle}
                disabled={isFetchingTitle || !url}
                className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground/80 transition hover:bg-secondary/80 disabled:opacity-60"
              >
                {isFetchingTitle ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Wand2 className="h-3 w-3" />
                )}
                Auto-fetch
              </button>
            </div>
            <Input
              id="title"
              name="title"
              placeholder="My Awesome Site"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="url"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              URL
            </label>
            <Input
              id="url"
              name="url"
              placeholder="https://example.com"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={() => {
                if (url && !title) handleFetchTitle()
              }}
            />
          </div>
          <Button type="submit" disabled={isAdding} className="w-full md:w-auto min-w-[120px]">
            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add'}
          </Button>
        </form>
      </div>

      {/* Grid List */}
      <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
        {bookmarks.length === 0 ? (
           <motion.div
             layout
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             exit={{ opacity: 0, scale: 0.9 }}
             className="col-span-full flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-2xl bg-background/60"
           >
             <div className="rounded-full bg-secondary p-4 mb-4">
               <Globe className="h-8 w-8 text-primary" />
             </div>
             <h3 className="text-lg font-semibold text-foreground">No bookmarks yet</h3>
             <p className="text-sm text-muted-foreground max-w-sm mt-2">
               Start collecting your favorite links by adding one above. They will sync instantly across all your devices.
             </p>
           </motion.div>
        ) : (
            bookmarks.map((bookmark) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={bookmark.id}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/70 bg-card/80 text-card-foreground shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold tracking-tight truncate pr-6 text-foreground" title={bookmark.title}>
                        {bookmark.title}
                      </h3>
                      <button
                        onClick={(e) => handleDelete(bookmark.id, e)}
                        className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-4 break-all">
                      {bookmark.url}
                    </p>
                  </div>
                  <div className="bg-muted/40 p-3 px-5 flex items-center justify-between border-t">
                    <span className="text-xs text-muted-foreground/80 font-mono">
                      {new Date(bookmark.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                    <Button asChild size="sm" variant="outline" className="h-8 px-3 text-xs">
                      <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                        Visit <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
            ))
        )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
