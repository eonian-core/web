import { Roboto } from 'next/font/google'

// it's better to keep reusable font in separate module.
// See https://nextjs.org/docs/pages/building-your-application/optimizing/fonts#reusing-fonts
export const robotoFont = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '700'],
  display: 'block',
})
