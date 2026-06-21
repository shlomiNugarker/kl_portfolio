// Top navigation links. The About link points to the top of the page on
// desktop (`#`) but to the about section on mobile, so its href is resolved at
// render time via the `mobileHref` flag.
export type NavLink = {
  // i18n key under nav.* in common.json.
  key: 'about' | 'services' | 'works' | 'contact'
  href: string
  mobileHref?: string
}

export const NavLinks: NavLink[] = [
  { key: 'about', href: '#', mobileHref: '#aboutMe' },
  { key: 'services', href: '#services' },
  { key: 'works', href: '#works' },
  { key: 'contact', href: '#contact' },
]
