
import { Header } from '@/components/header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8 md:px-6">
        {children}
      </main>
    </div>
  )
}
