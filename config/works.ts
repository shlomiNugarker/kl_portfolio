export type FeaturedWork = {
  // i18n key under works.items.* in common.json (title + description).
  key: string
  src: string
  ctaUrl: string
  objectPosition?: string
  tags?: string[]
}

// Featured projects shown in the "Some of my works" section. The title and
// description copy lives in public/locales/*/common.json under
// `works.items.<key>`; image, link and tech tags stay here.
export const FeaturedWorksList: FeaturedWork[] = [
  {
    key: 'makeble',
    src: '/works/makeble.webp',
    ctaUrl: 'https://makeble.vercel.app/',
    objectPosition: 'left top',
    tags: ['Next.js', 'AI', 'Monaco Editor', 'Vercel'],
  },
  {
    key: 'wanderly',
    src: '/works/wanderly.webp',
    ctaUrl: 'https://wanderly-seven.vercel.app',
    objectPosition: 'left top',
    tags: ['Next.js 16', 'React 19', 'Mapbox', 'Claude AI', 'Socket.IO'],
  },
]
