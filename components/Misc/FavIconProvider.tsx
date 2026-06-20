import type { ReactNode } from 'react'
import { useColorMode } from 'components/ui/color-mode'
import Head from 'next/head'

const FavIconProvider = ({ children }: { children: ReactNode }) => {
  const { colorMode } = useColorMode()
  return (
    <>
      <Head>
        <link
          rel="icon"
          href={
            colorMode === 'dark' ? '/favicon.ico' : '/favicon-lightmode.ico'
          }
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {children}
    </>
  )
}

export default FavIconProvider
