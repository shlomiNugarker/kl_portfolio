import { memo } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { FAQ_KEYS } from 'config/faq'
import SectionHeading from 'components/Misc/SectionHeading'

const FaqSection = () => {
  const { t } = useTranslation('common')
  return (
    <section className="flex h-full mx-auto w-[99%] max-w-2xl flex-col gap-6 text-center xl:mx-0 xl:max-w-none xl:w-3/4 xl:gap-8 xl:text-start">
      <SectionHeading num="04" eyebrow="FAQ">
        {t('faq.heading')}
      </SectionHeading>

      <div className="flex flex-col gap-3 text-start">
        {FAQ_KEYS.map((key, i) => (
          <details
            key={key}
            className="group rounded-2xl border border-kl-border bg-kl-surface px-5 py-4 transition-colors hover:border-kl-border-strong open:border-kl-accent-hover"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 font-semibold [&::-webkit-details-marker]:hidden">
              <span
                aria-hidden
                className="font-mono text-sm text-kl-emphasis"
              >
                0{i + 1}
              </span>
              <span className="flex-1">{t(`faq.items.${key}.q`)}</span>
              <span
                aria-hidden
                className="text-xl leading-none text-kl-emphasis transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
              >
                +
              </span>
            </summary>
            {/* Indented past the number so the answer aligns with the question. */}
            <p className="pt-3 ps-8 text-sm leading-relaxed text-kl-description md:text-base">
              {t(`faq.items.${key}.a`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export default memo(FaqSection)
