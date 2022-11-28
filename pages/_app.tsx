import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import BottomNav from "../components/BottomNav";
import TopAppBar from "../components/TopAppBar";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="shortcut icon" href="/GoFit_Logo.svg" />
      </Head>
      <TopAppBar />
      <Component {...pageProps} />
      <BottomNav />
    </SessionProvider>
  );
}

export default appWithTranslation(App);
