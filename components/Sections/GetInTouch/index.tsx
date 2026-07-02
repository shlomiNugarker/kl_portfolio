import { memo } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { RiCopyrightLine, RiGithubFill, RiMailLine } from 'react-icons/ri'
import { FaWhatsapp } from 'react-icons/fa'
import { whatsappUrl, PERSON } from 'config/seo'
import { trackEvent } from 'lib/analytics'
import SectionHeading from 'components/Misc/SectionHeading'

// Inline links inside the body copy: explicit accent color, weight and a
// persistent underline so they're obviously clickable against muted body text.
const InlineLink = ({
  href,
  onClick,
  children,
}: {
  href: string
  onClick?: () => void
  children: React.ReactNode
}) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    onClick={onClick}
    className="font-semibold text-kl-emphasis underline underline-offset-[3px] hover:no-underline"
  >
    {children}
  </a>
)

const GetInTouch = () => {
  const { t } = useTranslation('common')
  return (
    <footer className="flex h-full mx-auto w-[99%] max-w-2xl flex-col gap-6 text-center xl:mx-0 xl:max-w-none xl:w-3/4 xl:gap-8 xl:text-start">
      <SectionHeading num="05" eyebrow={t('nav.contact')}>
        {t('contact.heading')}{' '}
        <span className="text-2xl text-kl-emphasis">(⁀ᗢ⁀)</span>
      </SectionHeading>
      <p className="text-sm leading-relaxed text-kl-description md:text-base 2xl:text-lg">
        {t('contact.body')}{' '}
        <InlineLink
          href={PERSON.linkedin}
          onClick={() =>
            trackEvent('social_click', {
              network: 'linkedin',
              location: 'contact',
            })
          }
        >
          {t('contact.linkedin')}
        </InlineLink>{' '}
        {t('contact.or_email')}{' '}
        <InlineLink
          href={`mailto:${PERSON.email}`}
          onClick={() =>
            trackEvent('contact_click', {
              method: 'email',
              location: 'contact_inline',
            })
          }
        >
          {t('contact.email')}
        </InlineLink>
        .
      </p>

      {/* WhatsApp is the primary action (solid accent, matching the hero CTA);
          email stays as the quiet outline secondary. */}
      <div className="flex flex-wrap justify-center gap-3 xl:justify-start">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            trackEvent('contact_click', {
              method: 'whatsapp',
              location: 'contact',
            })
          }
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-kl-accent-strong px-6 text-base font-semibold text-kl-on-accent shadow-sm transition-[background-color,transform] duration-200 hover:bg-kl-accent-hover hover:-translate-y-0.5 motion-reduce:hover:translate-y-0"
        >
          <FaWhatsapp aria-hidden />
          {t('contact.cta_whatsapp')}
        </a>
        <a
          href={`mailto:${PERSON.email}`}
          onClick={() =>
            trackEvent('contact_click', {
              method: 'email',
              location: 'contact',
            })
          }
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-kl-muted px-6 text-base font-medium transition-colors hover:border-kl-accent-hover hover:bg-kl-accent-soft"
        >
          <RiMailLine aria-hidden />
          {t('contact.cta_email')}
        </a>
      </div>

      <div className="pt-10 pb-5 text-center font-mono lg:pt-20 lg:pb-[4.5rem] xl:pt-20">
        <a
          href={PERSON.github}
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            trackEvent('social_click', {
              network: 'github',
              location: 'footer',
            })
          }
          className="text-kl-description no-underline"
        >
          <span>
            <RiGithubFill aria-hidden className="inline h-6 w-6" /> <br />
            {t('sidebar.name')} <RiCopyrightLine aria-hidden className="inline" />{' '}
            {new Date().getFullYear()}
          </span>
        </a>
      </div>
    </footer>
  )
}

export default memo(GetInTouch)
