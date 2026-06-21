import Document, {
  Html,
  Head,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentInitialProps,
} from 'next/document'
import { isRtl, DEFAULT_LOCALE } from 'config/seo'

type DocProps = DocumentInitialProps & { locale: string }

class MyDocument extends Document<DocProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocProps> {
    const initialProps = await Document.getInitialProps(ctx)
    // Next populates ctx.locale from the i18n routing layer.
    const locale = ctx.locale || ctx.defaultLocale || DEFAULT_LOCALE
    return { ...initialProps, locale }
  }

  render() {
    const { locale } = this.props
    // Poppins is self-hosted via next/font and wired up in _app.tsx, so the
    // render-blocking Google Fonts <link> tags are no longer needed.
    return (
      <Html lang={locale} dir={isRtl(locale) ? 'rtl' : 'ltr'}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
