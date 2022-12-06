import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { User } from "@sendbird/chat";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";
import OneSignal from "react-onesignal";
import BottomNav from "../components/BottomNav";
import TopAppBar from "../components/TopAppBar";
import { oneSignalKey } from "../src/utils/keys";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [sbUser, setSbUser] = useState<User>();

  useEffect(() => {
    OneSignal.init({
      appId: oneSignalKey,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: true,
      },
    }).then(() => {
      OneSignal.showSlidedownPrompt();
    });
  }, []);
  return (
    <SessionProvider session={session}>
      {/* <Script
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&libraries=services,clusterer&autoload=false`}
        strategy="beforeInteractive"
      /> */}
      <Script
        src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
        strategy="afterInteractive"
      />
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
