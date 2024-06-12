// import App from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import NextNProgress from "nextjs-progressbar";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

// import nextI18nConfig from "../next-i18next.config";

import "../styles/Main.scss";
import "../styles/globals.scss";
// import "animate.css";

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Layout = Component.Layout || Noop;

  return (
    <>
      <Toaster
        // position="bottom-left"
        // reverseOrder={true}
        toastOptions={{
          style: {
            border: "1px solid rgb(0 64 128 / 60%)",
            padding: "12px",
            color: "#004080 "
          },
          iconTheme: {
            primary: "#3db7e7 ",
            secondary: "white"
          }
        }}
      />
      <NextNProgress
        color="#3db7e7"
        height={4}
        options={{ showSpinner: false }}
      />
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </Head>
      <SessionProvider session={session}>
        <AppProvider>
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AppProvider>
      </SessionProvider>
    </>
  );
}

// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps };
// };

export default appWithTranslation(MyApp);
