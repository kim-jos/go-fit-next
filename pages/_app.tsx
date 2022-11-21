import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { AppProps } from "next/app";
import BottomNav from "../components/BottomNav";
import MainNav from "../components/MainNav";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <MainNav />
      <Component {...pageProps} />
      <BottomNav />
    </SessionProvider>
  );
}

export default appWithTranslation(App);
