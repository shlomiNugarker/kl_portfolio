import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      // Poppins is self-hosted via next/font and wired up in _app.tsx, so the
      // render-blocking Google Fonts <link> tags are no longer needed.
      <Html lang="en">
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
