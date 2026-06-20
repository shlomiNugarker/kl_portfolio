import { Poppins } from 'next/font/google'

// Self-hosted Poppins via next/font — no render-blocking Google Fonts request
// and no layout shift. `poppins.style.fontFamily` is fed directly into the
// Chakra font tokens (config/theme.ts).
export const poppins = Poppins({
  weight: ['100', '300', '400', '500', '600'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})
