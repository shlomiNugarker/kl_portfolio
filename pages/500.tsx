import type { JSX } from 'react'
import ErrorLayout from 'components/Misc/ErrorLayout'

// 500.tsx is rendered by Pages Router without data fetching, so translations
// may not be loaded; ErrorLayout falls back to the literal English copy below.
const ServerErrorPage = (): JSX.Element => (
  <ErrorLayout
    code="500"
    titleKey="error.500_title"
    messageKey="error.500_message"
    fallbackTitle="Something went wrong"
    fallbackMessage="An unexpected error occurred on our end. Try refreshing, or head back home."
  />
)

export default ServerErrorPage
