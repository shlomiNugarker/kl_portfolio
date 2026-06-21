export type FeaturedWork = {
  title: string
  description: string
  src: string
  ctaUrl: string
  objectPosition?: string
}

// Featured projects shown in the "Some of my works" section. Add real projects
// here (title, description, link, and an image in /public/works).
export const FeaturedWorksList: FeaturedWork[] = [
  {
    title: 'Makeble',
    description:
      'An AI-powered website builder — describe what you want in plain English or Hebrew and it generates, previews and deploys a Next.js app live. Built with Next.js, with a Monaco editor and one-click deploy. "Describe it. Ship it."',
    src: '/works/makeble.webp',
    ctaUrl: 'https://makeble.vercel.app/',
    objectPosition: 'left top',
  },
  {
    title: 'Project Two',
    description:
      'A short description of the project — what it does, your role, and the stack you used.',
    src: '/works/placeholder.svg',
    ctaUrl: '#',
  },
  {
    title: 'Project Three',
    description:
      'A short description of the project — what it does, your role, and the stack you used.',
    src: '/works/placeholder.svg',
    ctaUrl: '#',
  },
]
