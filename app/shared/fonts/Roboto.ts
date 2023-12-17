import { Poppins } from 'next/font/google'

// it's better to keep reusable font in separate module.
// See https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#reusing-fonts
export const robotoFont = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'block',
})
