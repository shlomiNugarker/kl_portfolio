import { memo } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { Services as ServicesList } from 'config/services'
import SectionCta from 'components/Misc/SectionCta'
import SectionHeading from 'components/Misc/SectionHeading'

const ServicesSection = () => {
  const { t } = useTranslation('common')
  return (
    <div className="flex h-full mx-auto w-[99%] max-w-2xl flex-col gap-6 text-center xl:mx-0 xl:max-w-none xl:w-3/4 xl:gap-8 xl:text-start">
      <SectionHeading num="02" eyebrow={t('nav.services')}>
        {t('services.heading')}
      </SectionHeading>
      <p className="text-sm leading-relaxed text-kl-description md:text-base 2xl:text-lg">
        {t('services.description')}
      </p>

      <div className="grid grid-cols-1 gap-4 text-start md:grid-cols-2 md:gap-6">
        {ServicesList.map((service) => {
          const Icon = service.icon
          return (
            <div
              key={service.key}
              className="rounded-2xl border border-kl-border-strong bg-kl-surface p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-kl-accent-hover hover:shadow-[0_20px_45px_-18px_var(--kl-glow)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 xl:p-6"
            >
              {/* Icon sits in a soft accent chip so each card gets a clear
                  visual anchor instead of a bare glyph. */}
              <span className="mb-4 inline-flex rounded-xl bg-kl-accent-soft p-2.5 ring-1 ring-kl-border">
                <Icon aria-hidden className="size-7 text-kl-emphasis" />
              </span>
              <h3 className="mb-2 text-lg font-bold md:text-xl">
                {t(`services.items.${service.key}.title`)}
              </h3>
              <p className="text-sm leading-relaxed text-kl-description md:text-base">
                {t(`services.items.${service.key}.description`)}
              </p>
            </div>
          )
        })}
      </div>

      <SectionCta label={t('services.cta')} location="services" />
    </div>
  )
}

export default memo(ServicesSection)
