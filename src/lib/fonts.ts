import { Inter, Poppins, Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'


export const tektonFont = localFont({
  src: '../app/fonts/TektonPro-Bold.otf',
  variable: '--font-tekton',
  display: 'swap',
})


export const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})


export const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})


export const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})