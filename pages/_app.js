import Layout from '../components/Layout'
import '../styles/globals.css'
import '../styles/nprogress.css'
import NProgress from 'nprogress'
import Router from 'next/router'
import Head from 'next/head'
import { useEffect } from 'react'

const title = "presentation-helper"

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").then(
          function (registration) {
          },
          function (err) {
          }
        );
      });
    }
  }, [])
  return <Layout>
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, minimum-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    </Head>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
