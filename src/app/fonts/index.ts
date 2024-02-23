import { Open_Sans } from "next/font/google";
import localFont from 'next/font/local'

export const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ["400", "800"],
  variable: '--font-open-sans'
}) 

export const kode_mono = localFont({
  src: './Kode-Mono.ttf',
  variable: '--font-kode-mono'
})

export const anta = localFont({
  src: './Anta-Regular.ttf',
  variable: '--font-anta'
})