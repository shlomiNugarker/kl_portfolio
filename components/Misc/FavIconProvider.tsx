import type { ReactNode } from 'react'
import Head from 'next/head'

// The SN monogram SVG works as the favicon in both color modes, so no
// color-mode switch is needed here.
const FavIconProvider = ({ children }: { children: ReactNode }) => (
  <>
    <Head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />

      {/* Icons */}
      <link rel="icon" type="image/svg+xml" href="/logo.svg" />
      <link rel="alternate icon" type="image/png" href="/favicon-48.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon-180.png" />
      <link rel="manifest" href="/manifest.json" />

      {/* Theming */}
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#FAFAFA"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#171717"
      />
      <meta name="msapplication-TileColor" content="#171717" />
    </Head>
    {children}
  </>
)

export default FavIconProvider
