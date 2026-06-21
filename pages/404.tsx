import type { JSX } from 'react'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import nextI18NextConfig from '../next-i18next.config'
import ErrorLayout from 'components/Misc/ErrorLayout'

const NotFoundPage = (): JSX.Element => (
  <ErrorLayout
    code="404"
    titleKey="error.404_title"
    messageKey="error.404_message"
    fallbackTitle="Page not found"
    fallbackMessage="Looks like you wandered off the map. The page you're looking for doesn't exist or has moved."
  />
)

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(
      locale ?? 'en',
      ['common'],
      nextI18NextConfig
    )),
  },
})

export default NotFoundPage
