/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'he', 'ar'],
    defaultLocale: 'en',
    // Default locale is served unprefixed (/), others at /he and /ar.
    // (localeDetection is on by default; Next only accepts `false` here.)
  },
  // Reload translations on every request in dev for fast iteration.
  reloadOnPrerender: process.env.NODE_ENV === 'development',
}
