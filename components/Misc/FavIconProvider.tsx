import type { ReactNode } from 'react'
import Head from 'next/head'

// The SN monogram SVG works as the favicon in both color modes, so no
// color-mode switch is needed here.
const FavIconProvider = ({ children }: { children: ReactNode }) => (
  <>
    <Head>
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <link rel="alternate icon" type="image/png" href="/favicon-48.png" />
      <link rel="apple-touch-icon" href="/favicon-48.png" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    {children}
  </>
)

export default FavIconProvider
