import next from 'eslint-config-next'
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

// Flat ESLint config (ESLint 9 / Next 16). Replaces the legacy .eslintrc.
const config = [
  ...next,
  ...nextCoreWebVitals,
  {
    // scripts/ are build-time Node utilities (CommonJS), not part of the app
    // bundle, so they're outside the Next/TS lint scope.
    ignores: ['.next/**', 'node_modules/**', 'out/**', 'scripts/**'],
  },
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/no-unescaped-entities': 'off',
    },
  },
]

export default config
