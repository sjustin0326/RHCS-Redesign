import type { Metadata } from 'next'
import { tektonFont, inter, poppins, openSans } from '@/lib/fonts'
import Navigation from './components/Navigation'
import './globals.css'

export const metadata: Metadata = {
  title: 'RHCS - Riverview Horticultural Centre Society',
  description: 'Preserving Riverview Lands through education, advocacy, and community engagement',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${openSans.variable} ${tektonFont.variable}`}>
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
      </head>
      <Navigation/>
      <body className="font-sans bg-background text-primary antialiased">
        {children}
      </body>
    </html>
  )
}