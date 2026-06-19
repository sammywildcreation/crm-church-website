import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CRM Church — Studio',
  description: 'Content management for Christ The Rebuilder\'s Ministry',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
