// Thin wrapper over gtag for conversion events. The GA script is injected by
// components/Misc/Analytics.tsx only when NEXT_PUBLIC_ANALYTICS_ID is set, so
// this no-ops safely in dev / when analytics is disabled.
type EventParams = Record<string, string | number | boolean | undefined>

declare global {
  interface Window {
    gtag?: (command: 'event', name: string, params?: EventParams) => void
  }
}

// The site's KPI events: every path that can turn a visitor into a lead.
//   contact_click  — WhatsApp / email CTAs        { method, location }
//   project_click  — live-site / code links       { project, link }
//   social_click   — GitHub / LinkedIn / email    { network, location }
//   cta_click      — internal "talk to me" CTAs   { location }
export const trackEvent = (name: string, params?: EventParams): void => {
  if (typeof window === 'undefined') return
  window.gtag?.('event', name, params)
}
