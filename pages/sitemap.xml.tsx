import type { GetServerSideProps } from 'next'
import { LOCALES, DEFAULT_LOCALE, localeUrl } from 'config/seo'

// Pages present on the site today (single-page portfolio). Add more entries
// here as standalone routes are introduced.
const PAGES = [
  { path: '', changefreq: 'weekly', priority: { default: 1.0, other: 0.9 } },
]

// Stable lastmod captured once when the server module loads (i.e. at deploy
// time), NOT per-request. Emitting "today" on every crawl tells Google the page
// changes daily when it doesn't, which devalues the signal. Bump by redeploying
// after a real content change.
const LASTMOD = new Date().toISOString().split('T')[0]

const buildSitemap = (lastmod: string): string => {
  const urls = PAGES.flatMap((page) =>
    LOCALES.map((locale) => {
      const loc = localeUrl(locale, page.path)
      const priority =
        locale === DEFAULT_LOCALE ? page.priority.default : page.priority.other
      const alternates = [
        ...LOCALES.map(
          (l) =>
            `    <xhtml:link rel="alternate" hreflang="${l}" href="${localeUrl(
              l,
              page.path
            )}" />`
        ),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${localeUrl(
          DEFAULT_LOCALE,
          page.path
        )}" />`,
      ].join('\n')

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
${alternates}
  </url>`
    })
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = buildSitemap(LASTMOD)

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader(
    'Cache-Control',
    'public, max-age=86400, s-maxage=86400, stale-while-revalidate'
  )
  res.write(sitemap)
  res.end()

  return { props: {} }
}

// Never rendered — getServerSideProps writes the response directly.
const Sitemap = () => null
export default Sitemap
