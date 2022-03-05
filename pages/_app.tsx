import AppProps from "next/app"
import Head from "next/head"
import { SessionProvider } from "next-auth/react"
import { NextWebVitalsMetric } from "next/dist/shared/lib/utils"
import "./styles.css"
import { AppContextProvider } from "utils/context"

export function reportWebVitals(metric: NextWebVitalsMetric) {
  if (process.env.NODE_ENV === "test") {
    require("utils/wdyr")
    // console.log(metric)
  }
}

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next Auth - Authentication</title>
        <meta name="description" content="Next Auth - Authentication" />
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Next Auth - Authentication" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={process.env.NEXTAUTH_URL} />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Next Auth - Authentication" />
        <meta name="twitter:creator" content="@FacundoCachan" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Next Auth - Authentication" />
        <meta property="og:description" content="Next Auth - Authentication" />
        <meta property="og:site_name" content="Next Auth - Authentication" />
        <meta property="og:url" content={process.env.NEXTAUTH_URL} />
        <meta
          name="google-site-verification"
          content="lTBqkO65ONuExPVzKHqH48lQLpxWQx11bOt2CNoMN58"
        />
      </Head>
      <AppContextProvider>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </AppContextProvider>
    </>
  )
}
