# Abstrabit Bookmark

A smart, modern bookmark manager built with Next.js 14, Supabase, and Tailwind CSS.

## Features

- **Authentication**: Secure Google OAuth login via Supabase.
- **Bookmarks**: Add, delete, and view your personal bookmarks.
- **Optimistic UI**: Instant updates for a snappy user experience.
- **Real-time Sync**: Changes reflect immediately across all devices.
- **Smart Fetch**: Automatically fetches page titles from URLs.
- **Responsive Design**: Beautiful UI that works on mobile and desktop.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
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

- **Framework**: Next.js 15 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Utilities**: Cheerio (Metadata fetching), Sonner (Toasts)
