import { useRouter } from 'next/router'
import { Box, Button, Menu, Portal } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next/pages'
import { LuGlobe } from 'react-icons/lu'

const LOCALE_LABELS: Record<string, string> = {
  en: 'English',
  he: 'עברית',
  ar: 'العربية',
}

// Compact language picker. Persists the choice in the NEXT_LOCALE cookie so the
// site remembers it on the next visit, and preserves the current route/query.
const LanguageSwitcher = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const { locale, locales, pathname, query, asPath } = router

  const change = (next: string) => {
    // Persist the choice so '/' redirects here on the next visit. Set via the
    // document API (not a direct `document.cookie =` assignment) to satisfy the
    // react-hooks immutability lint rule.
    if (typeof document !== 'undefined') {
      const maxAge = 60 * 60 * 24 * 365
      // eslint-disable-next-line react-hooks/immutability -- setting a cookie is a deliberate DOM side-effect in an event handler
      document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${maxAge}; samesite=lax`
    }
    router.push({ pathname, query }, asPath, { locale: next })
  }

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          aria-label={t('a11y.language')}
          boxShadow="none"
          paddingX={2}
        >
          <LuGlobe />
          <Box as="span" textTransform="uppercase" fontSize="sm" marginStart={1}>
            {locale}
          </Box>
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            {(locales ?? []).map((l) => (
              <Menu.Item
                key={l}
                value={l}
                onClick={() => change(l)}
                fontWeight={l === locale ? 'bold' : 'normal'}
              >
                {LOCALE_LABELS[l] ?? l}
              </Menu.Item>
            ))}
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  )
}

export default LanguageSwitcher
