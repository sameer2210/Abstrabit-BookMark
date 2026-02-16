
'use server'

import { createClient } from '@/utils/supabase/server'
import * as cheerio from 'cheerio'
import { revalidatePath } from 'next/cache'

export async function addBookmark(formData: FormData) {
  const supabase = createClient()
  const { data: { user } } = await (await supabase).auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const id = formData.get('id') as string // Client-generated ID for consistent optimistic updates

  if (!title || !url) return { error: 'Both title and URL are required' }

  const validUrl = url.includes('://') ? url : `https://${url}`

  const { error } = await (await supabase).from('bookmarks').insert({
    id, // Use client-generated ID
    title,
    url: validUrl,
    user_id: user.id
  })

  if (error) return { error: error.message }

  // We rely on Realtime for the client update to avoid race conditions with optimistic UI
  // But we revalidate to keep server state consistent for refreshes
  revalidatePath('/dashboard')
  return { success: true }
}

export async function deleteBookmark(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.from('bookmarks').delete().eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function fetchPageMetadata(url: string) {
  if (!url) return { error: 'URL is required' }

  try {
    const validUrl = url.includes('://') ? url : `https://${url}`
    const response = await fetch(validUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    })

    if (!response.ok) throw new Error('Failed to fetch page')

    const html = await response.text()
    const $ = cheerio.load(html)
    const title = $('title').text()

    return { title: title || '' }
  } catch (error) {
    console.error('Error fetching metadata:', error)
    return { error: 'Failed to fetch page title' }
  }
}
