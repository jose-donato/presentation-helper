const title = 'talk-helper'
const description = 'Tool to help you and your attendees ace in your presentations.'

const SEO = {
  title,
  description,
  canonical: 'https://talk-helper.vercel.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://talk-helper.vercel.app',
    title,
    description,
    images: [
      {
        url: 'https://jose-donato.me/ski-avatar.png',
        alt: title,
        width: 1280,
        height: 720,
      },
    ],
  },
  twitter: {
    handle: '@whynot1__',
    site: '@whynot1__',
    cardType: 'summary_large_image',
  },
}

export default SEO