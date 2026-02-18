# Abstrabit Bookmark

A fast, focused bookmark manager built with Next.js, Supabase, and Tailwind CSS.

## Project Perspective

I wanted a clean, modern space to save links quickly and find them later without clutter. The UI is intentionally minimal and dark, with a strong focus on readability and speed. The goal: make saving links feel instant and revisiting them feel effortless.

## Features

- **Authentication**: Secure Google OAuth login via Supabase.
- **Bookmarks**: Add, delete, and view your personal bookmarks.
- **Optimistic UI**: Instant updates for a snappy user experience.
- **Real-time Sync**: Changes reflect immediately across all devices.
- **Smart Fetch**: Automatically fetches page titles from URLs.
- **Responsive Design**: Beautiful UI that works on mobile and desktop.

## Problems Faced During Development (and How I Solved Them)

1. **Supabase OAuth redirect mismatch**: Google sign-in kept failing because the callback URL didn't match. I fixed it by aligning the Supabase OAuth redirect URL with `/auth/callback` and the deployed domain, then testing locally and in production.
2. **RLS policy blocking reads/writes**: Bookmarks weren’t visible or insertable due to Row Level Security. I added explicit policies for `select`, `insert`, and `delete` scoped to `auth.uid()` and verified them with test users.
3. **Metadata fetch blocked by some sites**: Some pages reject server-side scraping or return empty metadata. I handled this by allowing manual titles and treating metadata fetch as an optional enhancement rather than a hard dependency.
4. **Realtime duplicates after optimistic updates**: The realtime stream could add the same bookmark twice after an optimistic insert. I solved it by deduplicating on the client using the bookmark `id`.
5. **UI readability on dark backgrounds**: Early versions had low-contrast text and buttons. I refined the color tokens, increased contrast, and standardized button styles for consistent readability.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run the development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser.

## Database Setup

Run the SQL commands in `init.sql` in your Supabase SQL Editor to set up the database schema and Row Level Security (RLS) policies.

## Deploy on Vercel

1. **Push to GitHub**: Commit your changes and push to a GitHub repository.
2. **Import Project**: Go to Vercel and import the project.
3. **Environment Variables**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in the Vercel project settings.
4. **Deploy**: Click deploy and wait for the build to finish.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Utilities**: Cheerio (Metadata fetching), Sonner (Toasts)
