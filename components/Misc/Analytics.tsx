import Script from 'next/script'

const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID

// Google Analytics (gtag). Rendered once from _app so it isn't re-created on
// page re-renders, and only when an analytics id is configured. Loaded with
// `afterInteractive` so it never blocks the initial render.
const Analytics = () => {
  if (!ANALYTICS_ID) return null
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${ANALYTICS_ID}');
        `}
      </Script>
    </>
  )
}

export default Analytics
