import Document, { Html, Head, Main, NextScript } from 'next/document'

const title = "presentation-helper";
const description = "Tool to help you and your attendees ace in presentations."
const url = "https://presentation-helper.vercel.app"
const author = "José Donato"
const color = "#3d7cf9"
const type = "Productivity Tool"
const keywords = "collab, presentation, talk, rooms, workshops"

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />

          <meta name="theme-color" content={color} data-meta="theme-color" />

          <meta name="msapplication-navbutton-color" content={color} data-meta="theme-color" />

          <meta name="apple-mobile-web-app-status-bar-style" content={color} data-meta="theme-color" />

          <meta name="audience" lang="en" content="all" />
          <meta name="expires" content="3 days" />
          <meta name="robots" content="follow" />
          <meta name="revisit-after" content="3 days" />
          <meta name="page-topic" content={type} />
          <meta name="copyright" content={author} />
          <meta name="author" content={author} />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />

          <meta property="og:image" content="/favicon.ico" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:site_name" content={title} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />

          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content="/favicon.ico" />


          <link rel="icon" href="/favicon.ico" />
          <link rel="fluid-icon" href="/favicon.ico" />
          <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
          <link rel="apple-touch-icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument