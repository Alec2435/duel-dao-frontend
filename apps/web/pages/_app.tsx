import React from "react";
import PropTypes from "prop-types";
import { CacheProvider } from "@emotion/core";
import createCache from "@emotion/cache";
import theme from "../src/theme";
import { ThemeProvider } from "@material-ui/styles";
import AOS from "aos";
import Head from "next/head";
import config from "../config";
import "aos/dist/aos.css";
import "../styles/globals.css";
import { Web3AccountProvider } from "../src/service/web3-provider";

export const cache = createCache();

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Duel DAO - DAO vs DAO gaming on-chain</title>

        {/* Meta tags */}
        <meta charSet="utf-8" />
        <meta
          name="Description"
          content="DuelDao is an on-chain implementation of chess that allows two DAOs to play chess against one another."
        />

        <meta name="color-scheme" content="dark light" />

        {/* Opengraph */}
        <meta
          property="og:title"
          content="Duel DAO - DAO vs DAO gaming on-chain"
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/banner.png" />
        <meta property="og:url" content="https://dueldao.xyz" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@dueldao" />
        <meta
          name="twitter:title"
          content="Duel DAO - DAO vs DAO gaming on-chain"
        />
        <meta
          name="twitter:description"
          content="Duel DAO is an on-chain implementation of chess that allows two DAOs to play chess against one another."
        />
        <meta
          name="twitter:image:alt"
          content='Illustration Yami Yugi from Yu-Gi-Oh! wielding a card, except that card is replaced with a chess piece. Text beside it that reads: "Duel DAO"'
        />
        <meta name="twitter:image" content="https://dueldao.xyz/twitter.png" />

        {/*  generics */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </Head>
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {/* <CssBaseline /> */}
          <Web3AccountProvider>
            <Component {...pageProps} />
          </Web3AccountProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
