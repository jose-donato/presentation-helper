import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/nprogress.css'
import NProgress from 'nprogress'
import Router from 'next/router'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import Head from 'next/head'


Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  return <Layout>
    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <DefaultSeo {...SEO} />
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
