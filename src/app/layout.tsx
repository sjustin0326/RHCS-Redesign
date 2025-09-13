import type { Metadata } from 'next'
import { Inter, Poppins, Open_Sans } from 'next/font/google'
import './globals.css'

// Configure Google Fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RHCS - Royal Horticultural Capital Society',
  description: 'Preserving Riverview Lands through education, advocacy, and community engagement',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${openSans.variable}`}>
      <body className="font-sans bg-background text-primary antialiased">
        {children}
      </body>
    </html>
  )
}