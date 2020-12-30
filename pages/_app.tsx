import { AppProps } from "next/app";
import React from "react";
import { MonacoProvider } from "../components/MonacoContext";
import { GlobalStyles } from "../components/GlobalStyles";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.StrictMode>
      <MonacoProvider>
        <GlobalStyles />
        <Component {...pageProps} />
      </MonacoProvider>
    </React.StrictMode>
  );
};

export default MyApp;
